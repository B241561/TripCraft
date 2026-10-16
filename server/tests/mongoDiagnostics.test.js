const test = require('node:test');
const assert = require('node:assert/strict');
const {
  getMongoUriTarget,
  sanitizeDiagnosticText,
} = require('../config/mongoDiagnostics');

test('MongoDB URI diagnostics expose scheme and hostname but not credentials', () => {
  const target = getMongoUriTarget('mongodb+srv://tripcraft-user:topsecret@cluster.example.mongodb.net/trips');

  assert.deepEqual(target, {
    scheme: 'mongodb+srv',
    hostname: 'cluster.example.mongodb.net',
    port: 27017,
    options: new URLSearchParams(),
  });
  assert.equal(JSON.stringify(target).includes('topsecret'), false);
});

test('MongoDB diagnostic text redacts URI credentials and password parameters', () => {
  const uriMessage = sanitizeDiagnosticText(
    'failed mongodb+srv://tripcraft-user:topsecret@cluster.example.mongodb.net/trips?password=topsecret',
  );

  assert.equal(uriMessage.includes('topsecret'), false);
  assert.match(uriMessage, /\[MongoDB URI redacted\]/);
  assert.equal(sanitizeDiagnosticText('password=topsecret'), 'password=[REDACTED]');
});
