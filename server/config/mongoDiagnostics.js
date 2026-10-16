const dns = require('node:dns').promises;
const net = require('node:net');
const safeOptionNames = [
  'authSource',
  'replicaSet',
  'tls',
  'ssl',
  'retryWrites',
  'w',
  'readPreference',
  'connectTimeoutMS',
  'serverSelectionTimeoutMS',
  'appName',
  'directConnection',
  'loadBalanced',
];

const getMongoUriTarget = (uri) => {
  const parsed = new URL(uri);

  if (!['mongodb:', 'mongodb+srv:'].includes(parsed.protocol) || !parsed.hostname) {
    throw new Error('MONGO_URI must use mongodb:// or mongodb+srv:// and include a hostname');
  }

  return {
    scheme: parsed.protocol.slice(0, -1),
    hostname: parsed.hostname,
    port: Number(parsed.port) || 27017,
    options: parsed.searchParams,
  };
};

const sanitizeDiagnosticText = (value) => String(value)
  .replace(/mongodb(?:\+srv)?:\/\/[^\s"'`]+/gi, '[MongoDB URI redacted]')
  .replace(/((?:password|passwd|pwd)=)[^&\s,]+/gi, '$1[REDACTED]');

const tcpProbe = ({ hostname, port }, timeoutMs = 5000) => new Promise((resolve) => {
  const socket = net.createConnection({ host: hostname, port });
  let settled = false;

  const finish = (result, code) => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    socket.destroy();
    resolve({ hostname, port, result, ...(code ? { code } : {}) });
  };

  const timer = setTimeout(() => finish('timeout'), timeoutMs);
  socket.once('connect', () => finish('reachable'));
  socket.once('error', (error) => finish('error', error.code || error.name));
});

const getSafeConnectionOptions = (scheme, uriOptions, txtRecords = []) => {
  const options = new Map();

  for (const record of txtRecords) {
    for (const [key, value] of new URLSearchParams(record.join(''))) {
      options.set(key, value);
    }
  }

  for (const [key, value] of uriOptions) {
    options.set(key, value);
  }

  const safeOptions = safeOptionNames
    .filter((key) => options.has(key))
    .map((key) => `${key}=${options.get(key)}`);

  if (!options.has('tls') && !options.has('ssl')) {
    safeOptions.push(`tls=${scheme === 'mongodb+srv' ? 'default-enabled' : 'driver-default'}`);
  }

  return safeOptions;
};

const probeMongoNetwork = async (uri) => {
  let target;
  try {
    target = getMongoUriTarget(uri);
  } catch (error) {
    console.error(`MongoDB diagnostics: invalid URI configuration; credentials redacted (${sanitizeDiagnosticText(error.message)})`);
    return;
  }

  console.log(`MongoDB diagnostics: scheme=${target.scheme} hostname=${target.hostname}; credentials redacted`);

  let records;
  let txtRecords = [];
  if (target.scheme === 'mongodb+srv') {
    try {
      records = await dns.resolveSrv(`_mongodb._tcp.${target.hostname}`);
      console.log(`MongoDB DNS SRV: ${records.length} record(s): ${records.map(({ name, port }) => `${name}:${port}`).join(', ')}`);
    } catch (error) {
      console.error(`MongoDB DNS SRV failed: code=${error.code || error.name}; hostname=${target.hostname}`);
      return;
    }

    try {
      txtRecords = await dns.resolveTxt(target.hostname);
      console.log(`MongoDB DNS TXT: ${txtRecords.length} record(s); values redacted`);
    } catch (error) {
      if (error.code === 'ENODATA') {
        console.log('MongoDB DNS TXT: no optional TXT record');
      } else {
        console.error(`MongoDB DNS TXT failed: code=${error.code || error.name}; hostname=${target.hostname}`);
      }
    }
  } else {
    records = [{ name: target.hostname, port: target.port }];
    console.log('MongoDB DNS SRV: skipped for standard mongodb:// URI');
  }

  console.log(`MongoDB connection options: ${getSafeConnectionOptions(target.scheme, target.options, txtRecords).join(', ')}`);

  const probes = await Promise.all(records.map(({ name, port }) => tcpProbe({ hostname: name, port })));
  for (const probe of probes) {
    console.log(`MongoDB TCP probe: ${probe.hostname}:${probe.port} ${probe.result}${probe.code ? ` (${probe.code})` : ''}`);
  }
};

const summarizeMongoError = (error) => {
  const servers = error.reason?.servers;
  const serverErrors = servers instanceof Map
    ? Array.from(servers, ([address, server]) => ({
      address,
      state: server.type,
      errorName: server.error?.name,
      code: server.error?.code,
      codeName: server.error?.codeName,
      message: server.error?.message
        ? sanitizeDiagnosticText(server.error.message)
        : undefined,
    }))
    : [];

  return {
    name: error.name,
    code: error.code,
    codeName: error.codeName,
    message: sanitizeDiagnosticText(error.message),
    topologyError: error.reason?.name,
    serverErrors,
  };
};

module.exports = {
  getMongoUriTarget,
  getSafeConnectionOptions,
  probeMongoNetwork,
  sanitizeDiagnosticText,
  summarizeMongoError,
};
