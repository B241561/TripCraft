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

const loadAiService = (completions) => {
  const requests = [];
  let completionIndex = 0;

  class MockOpenAI {
    constructor() {
      this.chat = {
        completions: {
          create: async (options) => {
            requests.push(options);
            const completion = completions[Math.min(completionIndex, completions.length - 1)];
            completionIndex += 1;
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
    return { ...service, getRequests: () => requests };
  } finally {
    require.cache[openAiModulePath].exports = OpenAI;
    delete require.cache[aiServicePath];
    if (originalApiKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = originalApiKey;
    if (originalModel === undefined) delete process.env.GROQ_MODEL;
    else process.env.GROQ_MODEL = originalModel;
  }
};

test('trip generation requests JSON mode and parses the returned plan', async () => {
  const service = loadAiService([
    { choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(tripPlan) } }] },
  ]);

  const plan = await service.generateTripPlan({
    source: 'Delhi',
    destination: 'Jaipur',
    budget: 15000,
    numberOfDays: 5,
    numberOfPeople: 2,
    preferences: [],
  });
  const request = service.getRequests()[0];

  assert.deepEqual(plan, tripPlan);
  assert.equal(request.model, 'openai/gpt-oss-120b');
  assert.deepEqual(request.response_format, { type: 'json_object' });
});

test('trip generation retries an incomplete JSON object and returns the validated retry', async () => {
  const incompletePlan = {
    ...tripPlan,
    topPlaces: [{
      name: 'Amber Fort',
      description: 'Historic hilltop fort.',
      entryFee: '₹100',
      bestTime: 'Morning',
      category: 'Heritage',
    }],
  };
  const service = loadAiService([
    { choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(incompletePlan) } }] },
    { choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(tripPlan) } }] },
  ]);

  const plan = await service.generateTripPlan({
    source: 'Delhi',
    destination: 'Jaipur',
    budget: 15000,
    numberOfDays: 5,
    numberOfPeople: 2,
    preferences: [],
  });
  const requests = service.getRequests();

  assert.deepEqual(plan, tripPlan);
  assert.equal(requests.length, 2);
  assert.match(requests[1].messages[0].content, /topPlaces\[0\]\.mustSee is required/);
});

test('trip generation reports provider truncation explicitly', async () => {
  const service = loadAiService([
    { choices: [{ finish_reason: 'length', message: { content: JSON.stringify(tripPlan) } }] },
  ]);

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
