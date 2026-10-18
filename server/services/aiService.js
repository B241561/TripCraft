const OpenAI = require('openai');

const groq = process.env.GROQ_API_KEY
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  : null;

const tripPlanSchema = {
  type: 'object',
  properties: {
    itinerary: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          day: { type: 'integer' },
          title: { type: 'string' },
          theme: { type: 'string' },
          activities: { type: 'array', items: { type: 'string' } },
        },
        required: ['day', 'title', 'theme', 'activities'],
        additionalProperties: false,
      },
    },
    hotels: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          area: { type: 'string' },
          pricePerNight: { type: 'number' },
          totalPrice: { type: 'number' },
          rating: { type: 'number' },
          amenities: { type: 'array', items: { type: 'string' } },
          platform: { type: 'string' },
          bookingUrl: { type: 'string' },
          highlight: { type: 'string' },
        },
        required: [
          'name',
          'area',
          'pricePerNight',
          'totalPrice',
          'rating',
          'amenities',
          'platform',
          'bookingUrl',
          'highlight',
        ],
        additionalProperties: false,
      },
    },
    transport: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          mode: { type: 'string' },
          provider: { type: 'string' },
          estimatedCostPerPerson: { type: 'number' },
          totalCost: { type: 'number' },
          duration: { type: 'string' },
          platform: { type: 'string' },
          bookingUrl: { type: 'string' },
          pros: { type: 'array', items: { type: 'string' } },
          departureInfo: { type: 'string' },
        },
        required: [
          'mode',
          'provider',
          'estimatedCostPerPerson',
          'totalCost',
          'duration',
          'platform',
          'bookingUrl',
          'pros',
          'departureInfo',
        ],
        additionalProperties: false,
      },
    },
    topPlaces: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          entryFee: { type: 'string' },
          bestTime: { type: 'string' },
          category: { type: 'string' },
          mustSee: { type: 'boolean' },
        },
        required: [
          'name',
          'description',
          'entryFee',
          'bestTime',
          'category',
          'mustSee',
        ],
        additionalProperties: false,
      },
    },
    totalEstimatedCost: { type: 'number' },
    costBreakdown: {
      type: 'object',
      properties: {
        transport: { type: 'number' },
        accommodation: { type: 'number' },
        food: { type: 'number' },
        activities: { type: 'number' },
        miscellaneous: { type: 'number' },
      },
      required: [
        'transport',
        'accommodation',
        'food',
        'activities',
        'miscellaneous',
      ],
      additionalProperties: false,
    },
    tips: { type: 'array', items: { type: 'string' } },
    bestTimeToVisit: { type: 'string' },
    localCuisine: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'itinerary',
    'hotels',
    'transport',
    'topPlaces',
    'totalEstimatedCost',
    'costBreakdown',
    'tips',
    'bestTimeToVisit',
    'localCuisine',
  ],
  additionalProperties: false,
};

const createPlanFormatError = (message) => {
  const error = new Error(message);
  error.code = 'TRIP_PLAN_FORMAT';
  return error;
};

const getSchemaErrors = (value, schema, path = '$') => {
  const matchesType = {
    object: value !== null && typeof value === 'object' && !Array.isArray(value),
    array: Array.isArray(value),
    string: typeof value === 'string',
    number: typeof value === 'number',
    integer: Number.isInteger(value),
    boolean: typeof value === 'boolean',
  };

  if (!matchesType[schema.type]) return [`${path} must be ${schema.type}`];

  if (schema.type === 'array') {
    return value.flatMap((item, index) =>
      getSchemaErrors(item, schema.items, `${path}[${index}]`),
    );
  }

  if (schema.type !== 'object') return [];

  const errors = [];
  for (const key of schema.required || []) {
    if (!Object.hasOwn(value, key)) errors.push(`${path}.${key} is required`);
  }
  for (const [key, child] of Object.entries(value)) {
    const childSchema = schema.properties[key];
    if (!childSchema) {
      if (schema.additionalProperties === false) {
        errors.push(`${path}.${key} is not allowed`);
      }
      continue;
    }
    errors.push(...getSchemaErrors(child, childSchema, `${path}.${key}`));
  }
  return errors;
};

const generateTripPlan = async ({
  source,
  destination,
  budget,
  numberOfDays,
  numberOfPeople,
  preferences
}) => {
  // AI generation requires a Groq API key.
  // Keeping this check here allows health/unit tests to run
  // without requiring a real Groq key.
  if (!groq) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const budgetPerPerson = Math.round(budget / numberOfPeople);
  const budgetCategory =
    budget < 10000
      ? 'budget'
      : budget < 30000
        ? 'mid-range'
        : 'luxury';

  const prompt = `You are an expert Indian travel planner. Generate a detailed, realistic trip plan in JSON format.

Trip Details:
- From: ${source}
- To: ${destination}
- Total Budget: ₹${budget} for ${numberOfPeople} people (₹${budgetPerPerson}/person)
- Duration: ${numberOfDays} days
- Budget Category: ${budgetCategory}
- Preferences: ${preferences.length > 0 ? preferences.join(', ') : 'general sightseeing'}

Return ONLY a valid JSON object (no markdown, no backticks) with this EXACT structure:
{
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & First Impressions",
      "theme": "Exploration",
      "activities": ["9:00 AM - Activity description with context", "1:00 PM - Lunch at specific place", "3:00 PM - Visit specific attraction", "7:00 PM - Dinner experience"]
    }
  ],
  "hotels": [
    {
      "name": "Specific Hotel Name",
      "area": "Area/Locality name",
      "pricePerNight": 2500,
      "totalPrice": 7500,
      "rating": 4.2,
      "amenities": ["Free WiFi", "Breakfast", "AC", "Pool"],
      "platform": "MakeMyTrip",
      "bookingUrl": "https://www.makemytrip.com/hotels/",
      "highlight": "Why this hotel is special"
    }
  ],
  "transport": [
    {
      "mode": "train",
      "provider": "Indian Railways - Specific Train Name",
      "estimatedCostPerPerson": 800,
      "totalCost": 3200,
      "duration": "8 hours 30 minutes",
      "platform": "RailYatri",
      "bookingUrl": "https://www.railyatri.in/",
      "pros": ["Comfortable", "Scenic route", "Economical"],
      "departureInfo": "Departs early morning, arrives by afternoon"
    },
    {
      "mode": "bus",
      "provider": "Specific Bus Operator",
      "estimatedCostPerPerson": 500,
      "totalCost": 2000,
      "duration": "10 hours",
      "platform": "RedBus",
      "bookingUrl": "https://www.redbus.in/",
      "pros": ["Budget friendly", "Multiple departure times", "AC available"],
      "departureInfo": "Night buses available for convenience"
    },
    {
      "mode": "flight",
      "provider": "IndiGo / Air India",
      "estimatedCostPerPerson": 4500,
      "totalCost": 18000,
      "duration": "1 hour 30 minutes",
      "platform": "MakeMyTrip",
      "bookingUrl": "https://www.makemytrip.com/flights/",
      "pros": ["Fastest", "Comfortable", "Time saving"],
      "departureInfo": "Multiple daily flights available"
    }
  ],
  "topPlaces": [
    {
      "name": "Specific Place Name",
      "description": "2 sentence description of what makes this place special and what to do there",
      "entryFee": "₹50",
      "bestTime": "Early morning",
      "category": "Heritage",
      "mustSee": true
    }
  ],
  "totalEstimatedCost": ${budget},
  "costBreakdown": {
    "transport": 0,
    "accommodation": 0,
    "food": 0,
    "activities": 0,
    "miscellaneous": 0
  },
  "tips": ["Practical tip 1", "Practical tip 2", "Practical tip 3", "Safety tip", "Money saving tip"],
  "bestTimeToVisit": "October to March",
  "localCuisine": ["Dish 1", "Dish 2", "Dish 3", "Dish 4"]
}

Rules:
- Generate exactly ${numberOfDays} days in itinerary
- Generate exactly 3 hotels (budget, mid-range, premium options)
- Generate exactly 3 transport options (train, bus, flight) - skip flight if less than 500km
- Generate exactly 10 top places
- Include every property shown in the JSON structure in every object; do not omit any property
- All prices in Indian Rupees (₹)
- costBreakdown must add up to totalEstimatedCost
- Use REAL hotel names, train names, and landmarks for ${destination}
- bookingUrl for hotels should always be: https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destination)}`;

  const requestPlan = (content) =>
    groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content }],
      temperature: 0.2,
      reasoning_effort: 'low',
      max_completion_tokens: 16384,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'trip_plan',
          strict: true,
          schema: tripPlanSchema,
        },
      },
    });

  const parsePlan = (response) => {
    const choice = response.choices?.[0];
    if (!choice) throw createPlanFormatError('Groq returned no completion choices');
    if (choice.finish_reason === 'length') {
      throw createPlanFormatError('Groq returned an incomplete trip plan due to the token limit');
    }
    if (choice.message?.refusal) {
      throw new Error('Groq declined to generate the requested trip plan');
    }
    if (typeof choice.message?.content !== 'string' || !choice.message.content.trim()) {
      throw createPlanFormatError('Groq returned an empty trip plan');
    }

    let plan;
    try {
      plan = JSON.parse(choice.message.content);
    } catch {
      throw createPlanFormatError('Groq returned invalid JSON for the trip plan');
    }

    const errors = getSchemaErrors(plan, tripPlanSchema);
    if (errors.length) {
      throw createPlanFormatError(`Groq returned an incomplete trip plan: ${errors[0]}`);
    }
    if (plan.itinerary.length !== numberOfDays) {
      throw createPlanFormatError(`Groq returned ${plan.itinerary.length} itinerary days instead of ${numberOfDays}`);
    }
    if (plan.itinerary.some((day, index) => day.day !== index + 1)) {
      throw createPlanFormatError('Groq returned itinerary days that are not numbered consecutively');
    }
    if (plan.hotels.length !== 3) {
      throw createPlanFormatError(`Groq returned ${plan.hotels.length} hotels instead of 3`);
    }
    if (plan.topPlaces.length !== 10) {
      throw createPlanFormatError(`Groq returned ${plan.topPlaces.length} top places instead of 10`);
    }
    if (plan.transport.length < 2 || plan.transport.length > 3) {
      throw createPlanFormatError(`Groq returned ${plan.transport.length} transport options; expected 2 or 3`);
    }

    const breakdownTotal = Object.values(plan.costBreakdown)
      .reduce((total, amount) => total + amount, 0);
    if (Math.abs(breakdownTotal - plan.totalEstimatedCost) > 0.01) {
      throw createPlanFormatError(
        `The cost breakdown totals ₹${breakdownTotal}, not ₹${plan.totalEstimatedCost}`,
      );
    }
    if (plan.totalEstimatedCost > budget) {
      throw createPlanFormatError(
        `The estimated total ₹${plan.totalEstimatedCost} exceeds the ₹${budget} budget`,
      );
    }
    return plan;
  };

  let requestPrompt = prompt;
  const maxAttempts = 3;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      return parsePlan(await requestPlan(requestPrompt));
    } catch (error) {
      console.error('Trip plan generation attempt failed', {
        attempt: attempt + 1,
        status: error.status,
        message: error.message,
        failedGeneration: typeof error.error?.failed_generation === 'string'
          ? error.error.failed_generation.slice(-400)
          : undefined,
      });
      const retryableProviderError =
        error.status === 400 &&
        /failed to generate json|generated json does not match the expected schema/i.test(error.message);
      if (attempt === maxAttempts - 1 || (error.code !== 'TRIP_PLAN_FORMAT' && !retryableProviderError)) {
        throw error;
      }

      requestPrompt = `${prompt}\n\nThe previous response failed validation: ${error.message}. Correct the issue and return the complete trip plan again. Include every required property, exactly ${numberOfDays} consecutive itinerary days, exactly 3 hotels, exactly 10 top places, and ensure the cost breakdown adds up to a total no greater than ₹${budget}.`;
    }
  }
};

module.exports = { generateTripPlan };