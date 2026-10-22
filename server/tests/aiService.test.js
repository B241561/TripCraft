const test = require('node:test');
const assert = require('node:assert/strict');

const openAiModulePath = require.resolve('openai');
const aiServicePath = require.resolve('../services/aiService');
const OpenAI = require(openAiModulePath);

const tripPlan = {
  itinerary: Array.from({ length: 5 }, (_, index) => ({
    day: index + 1,
    title: `Day ${index + 1}`,
    theme: 'Heritage',
    activities: ['Visit Amber Fort'],
  })),
  hotels: Array.from({ length: 3 }, (_, index) => ({
    name: `Hotel ${index + 1}`,
    area: 'Jaipur',
    pricePerNight: 2000,
    totalPrice: 6000,
    rating: 4,
    amenities: ['WiFi'],
    platform: 'MakeMyTrip',
    bookingUrl: 'https://example.com/hotels',
    highlight: 'Convenient location',
  })),
  transport: ['train', 'bus'].map((mode) => ({
    mode,
    provider: 'Operator',
    estimatedCostPerPerson: 1000,
    totalCost: 2000,
    duration: '5 hours',
    platform: 'Booking platform',
    bookingUrl: 'https://example.com/transport',
    pros: ['Convenient'],
    departureInfo: 'Morning departures',
  })),
  topPlaces: Array.from({ length: 10 }, (_, index) => ({
    name: `Place ${index + 1}`,
    description: 'A heritage attraction.',
    entryFee: '₹100',
    bestTime: 'Morning',
    category: 'Heritage',
    mustSee: true,
  })),
  totalEstimatedCost: 15000,
  costBreakdown: {
    transport: 3000,
    accommodation: 6000,
    food: 3000,
    activities: 2000,
    miscellaneous: 1000,
  },
  tips: ['Book in advance'],
  bestTimeToVisit: 'October to March',
  localCuisine: ['Dal baati churma'],
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
            if (completion instanceof Error) throw completion;
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

test('trip generation requests strict JSON schema and parses the returned plan', async () => {
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
  assert.equal(request.response_format.type, 'json_schema');
  assert.equal(request.response_format.json_schema.name, 'trip_plan');
  assert.equal(request.response_format.json_schema.strict, true);
  assert.equal(request.response_format.json_schema.schema.additionalProperties, false);
  assert.equal(request.reasoning_effort, 'low');
  assert.equal(request.max_completion_tokens, 16384);
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

test('trip generation retries a cost breakdown that exceeds the requested budget', async () => {
  const overBudgetBreakdown = {
    ...tripPlan,
    costBreakdown: {
      transport: 3200,
      accommodation: 6000,
      food: 4000,
      activities: 2000,
      miscellaneous: 800,
    },
  };
  const service = loadAiService([
    { choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(overBudgetBreakdown) } }] },
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

  assert.deepEqual(plan.costBreakdown, tripPlan.costBreakdown);
  assert.equal(requests.length, 2);
  assert.match(requests[1].messages[0].content, /cost breakdown totals ₹16000/);
});

test('trip generation retries Groq schema-validation errors', async () => {
  const providerError = new Error(
    "400 Generated JSON does not match the expected schema: missing properties: 'mustSee'",
  );
  providerError.status = 400;
  const service = loadAiService([
    providerError,
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
  assert.match(requests[1].messages[0].content, /missing properties: 'mustSee'/);
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
