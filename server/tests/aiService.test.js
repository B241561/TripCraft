const test = require('node:test');
const assert = require('node:assert/strict');

const openAiModulePath = require.resolve('openai');
const aiServicePath = require.resolve('../services/aiService');
const OpenAI = require(openAiModulePath);

const tripPlan = {
  itinerary: [{ day: 1, title: 'Arrival', theme: 'Heritage', activities: ['Visit Amber Fort'] }],
  hotels: [],
  transport: [],
  topPlaces: [],
  totalEstimatedCost: 15000,
  costBreakdown: {
    transport: 0,
    accommodation: 0,
    food: 0,
    activities: 0,
    miscellaneous: 0,
  },
  tips: [],
  bestTimeToVisit: 'October to March',
  localCuisine: [],
};

const loadAiService = (completion) => {
  let requestOptions;

  class MockOpenAI {
    constructor() {
      this.chat = {
        completions: {
          create: async (options) => {
            requestOptions = options;
            return completion;
          },
        },
      };
    }
  }

  const originalApiKey = process.env.GROQ_API_KEY;
  const originalModel = process.env.GROQ_MODEL;
  process.env.GROQ_API_KEY = 'test-key';
  process.env.GROQ_MODEL = 'openai/gpt-oss-120b';
  require.cache[openAiModulePath].exports = MockOpenAI;
  delete require.cache[aiServicePath];

  try {
    const service = require('../services/aiService');
    return { ...service, getRequestOptions: () => requestOptions };
  } finally {
    require.cache[openAiModulePath].exports = OpenAI;
    delete require.cache[aiServicePath];
    if (originalApiKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = originalApiKey;
    if (originalModel === undefined) delete process.env.GROQ_MODEL;
    else process.env.GROQ_MODEL = originalModel;
  }
};

test('trip generation requests strict JSON and parses the returned plan', async () => {
  const service = loadAiService({
    choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(tripPlan) } }],
  });

  const plan = await service.generateTripPlan({
    source: 'Delhi',
    destination: 'Jaipur',
    budget: 15000,
    numberOfDays: 5,
    numberOfPeople: 2,
    preferences: [],
  });
  const request = service.getRequestOptions();

  assert.deepEqual(plan, tripPlan);
  assert.equal(request.model, 'openai/gpt-oss-120b');
  assert.deepEqual(request.response_format, {
    type: 'json_schema',
    json_schema: {
      name: 'trip_plan',
      strict: true,
      schema: request.response_format.json_schema.schema,
    },
  });
  assert.equal(request.response_format.json_schema.schema.additionalProperties, false);
});

test('trip generation reports malformed provider JSON without a success-shaped result', async () => {
  const service = loadAiService({
    choices: [{ finish_reason: 'stop', message: { content: '{"itinerary":' } }],
  });

  await assert.rejects(
    service.generateTripPlan({
      source: 'Delhi',
      destination: 'Jaipur',
      budget: 15000,
      numberOfDays: 5,
      numberOfPeople: 2,
      preferences: [],
    }),
    { message: 'Groq returned invalid JSON for the trip plan' },
  );
});

test('trip generation reports provider truncation explicitly', async () => {
  const service = loadAiService({
    choices: [{ finish_reason: 'length', message: { content: JSON.stringify(tripPlan) } }],
  });

  await assert.rejects(
    service.generateTripPlan({
      source: 'Delhi',
      destination: 'Jaipur',
      budget: 15000,
      numberOfDays: 5,
      numberOfPeople: 2,
      preferences: [],
    }),
    { message: 'Groq returned an incomplete trip plan due to the token limit' },
  );
});
