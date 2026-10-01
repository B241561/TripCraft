<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=180&text=TripCraft&fontSize=58&fontAlignY=38&desc=AI-Powered%20Travel%20Planner&descAlignY=61&animation=fadeIn&color=gradient" width="100%"/>

Plan Smarter. Discover Better. Travel Your Way.

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=17&pause=1100&center=true&vCenter=true&width=680&lines=Turn+travel+ideas+into+structured+journeys.;Generate+personalized+itineraries+with+AI.;Explore+places%2C+hotels%2C+and+transport+in+one+flow." alt="TripCraft"/>

<br/>

<a href="#-overview">Overview</a> •
<a href="#-features">Features</a> •
<a href="#-architecture">Architecture</a> •
<a href="#-setup">Setup</a> •
<a href="#-engineering">Engineering</a>

<br/><br/>






<br/>






</div>

🌍 Overview

TripCraft is a full-stack travel planning platform that converts a few
travel preferences into a structured journey.

A traveler can enter a source, destination, budget, duration, number of
people, and preferences. The application sends these inputs through its
backend and AI service, then presents the generated experience as an
itinerary, places, hotels, and transport options.

It also provides authentication, saved trips, and external booking redirects,
turning trip planning into one connected workflow instead of a collection of
separate searches.

One trip. One workspace. From idea to itinerary.

✨ Features

<table>
<tr>
<td width="50%">

🤖 AI Trip Generation

Generate personalized travel plans through the Groq-powered AI service.

</td>
<td width="50%">

🗺️ Structured Itineraries

Organize generated activities into a clear, day-wise travel plan.

</td>
</tr>

<tr>
<td>

📍 Places & Attractions

Discover relevant places to visit as part of the generated journey.

</td>
<td>

🏨 Hotels & 🚆 Transport

Keep accommodation and transport suggestions alongside the itinerary.

</td>
</tr>

<tr>
<td>

🔐 Authentication

JWT-based authentication with bcrypt password hashing.

</td>
<td>

🧳 My Trips

Save, revisit, and delete generated journeys.

</td>
</tr>

<tr>
<td>

🔗 Booking Redirects

Continue from selected options to external travel platforms.

</td>
<td>

📱 Focused UX

A responsive React interface built around a simple planning flow.

</td>
</tr>
</table>

🧭 Product Flow

          TRIP INPUT
              │
     ┌────────┼────────┐
     │        │        │
 Destination Budget  Preferences
     │        │        │
     └────────┼────────┘
              ▼
        ┌─────────────┐
        │  Trip API   │
        └──────┬──────┘
               ▼
        ┌─────────────┐
        │  AI Service │
        │    Groq     │
        └──────┬──────┘
               ▼
      ┌───────────────────┐
      │    TRIP RESULT    │
      ├───────────────────┤
      │ Itinerary         │
      │ Hotels            │
      │ Transport         │
      │ Places            │
      └─────────┬─────────┘
                ▼
       Save • Explore • Book

🧠 AI Architecture

Trip generation is isolated behind a dedicated service layer:

React UI
   ↓
Express REST API
   ↓
Trip Controller
   ↓
AI Service
   ↓
Groq API
   ↓
Structured Trip Result
   ↓
Trip Result UI

The provider and model are environment-driven, so AI configuration can evolve
without changing the rest of the application.

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model

Never commit real credentials.

🏗️ Architecture

                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React + Vite      │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │   Node + Express     │
                         │       Backend        │
                         └───────┬──────┬───────┘
                                 │      │
                      ┌──────────┘      └──────────┐
                      ▼                            ▼
              ┌───────────────┐            ┌──────────────┐
              │ MongoDB       │            │   Groq AI    │
              │ + Mongoose    │            │ AI Service   │
              └───────────────┘            └──────────────┘

🛠️ Technology Stack

Layer

Technology

Frontend

React 18 + Vite

Backend

Node.js + Express.js

Database

MongoDB + Mongoose

Authentication

JWT + bcryptjs

AI

Groq

Communication

REST API

Testing

Frontend + Backend automated tests

DevOps

Docker, Docker Compose, Jenkins, GitHub Actions

Monitoring

Prometheus, Grafana

Version Control

Git, GitHub

📁 Project Structure

TripCraft/
├── client/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── Results/
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── PlanTrip.jsx
│       │   ├── TripResult.jsx
│       │   ├── MyTrips.jsx
│       │   └── Auth/
│       ├── services/
│       │   └── api.js
│       ├── utils/
│       │   └── bookingRedirects.js
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   └── server.js
│
├── monitoring/
├── .github/
├── Jenkinsfile
├── docker-compose.yml
└── README.md

🔌 API

Method

Endpoint

Auth

Purpose

POST

/api/auth/register

—

Create a user

POST

/api/auth/login

—

Authenticate a user

GET

/api/auth/me

✓

Get current user

POST

/api/trip/generate

Optional

Generate an AI trip

GET

/api/trip/my-trips

✓

Retrieve saved trips

GET

/api/trip/:id

—

Retrieve a trip

DELETE

/api/trip/:id

✓

Delete a saved trip

🔐 Security

Sensitive configuration stays outside tracked source code.

Create:

server/.env

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model

Authentication uses JWT, while passwords are protected using bcryptjs.
The repository uses server/.env.example as the safe configuration template.

⚙️ Setup

1. Clone

git clone https://github.com/B241561/TripCraft.git
cd TripCraft

2. Backend

cd server
npm install

Create server/.env and configure the required values.

Start the API:

npm start

3. Frontend

Open another terminal:

cd client
npm install
npm run dev

Open:

http://localhost:5173

Backend:

http://localhost:5000

✅ Testing

Frontend:

cd client
npm test
npm run build

Backend:

cd server
npm test

The project includes automated frontend and backend validation, with dedicated
checks for frontend booking utilities and backend API behaviour.

🐳 Docker

TripCraft includes Dockerfiles and a Compose configuration for the application
stack.

docker compose up --build

Conceptually:

┌──────────────┐
│   Frontend   │
│   Container  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Backend    │
│   Container  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   MongoDB    │
└──────────────┘

⚙️ CI / CD & Observability

GitHub Actions

Checkout
   ↓
Install Dependencies
   ↓
Run Tests
   ↓
Build
   ↓
Validate

Jenkins

The repository includes a declarative Jenkinsfile for automated pipeline
execution across the project's build and test stages.

Monitoring

TripCraft Backend
       ↓
   /metrics
       ↓
  Prometheus
       ↓
    Grafana

Metrics endpoint:

http://localhost:5000/metrics

🧩 Engineering

TripCraft is built around clear separation of responsibilities:

Frontend — presentation, navigation, forms, and result visualization.

Backend — REST APIs, business logic, authentication, and persistence.

AI Service — isolated trip-generation and model integration layer.

Database — user and saved-trip persistence.

Infrastructure — containerization, CI/CD, and observability.

This structure keeps the system easier to test, evolve, and maintain.

🔗 Booking Experience

TripCraft keeps booking separate from the core planning workflow:

Generated Option
      ↓
User Selection
      ↓
Booking Redirect Utility
      ↓
External Travel Platform

The application focuses on planning and discovery rather than processing payments
directly.

🔮 Roadmap

[✓] AI Trip Generation
[✓] Authentication
[✓] Saved Trips
[✓] Itinerary / Hotels / Transport / Places
[✓] Booking Redirects

[ ] Interactive Maps
[ ] Weather-Aware Planning
[ ] Smart Budget Optimization
[ ] Collaborative Trip Planning
[ ] Editable Itineraries
[ ] Calendar Integration
[ ] Deeper Personalization

💡 Vision

TripCraft is designed to grow from a trip generator into a more complete
personal travel assistant.

Discover
   ↓
Plan
   ↓
Generate
   ↓
Refine
   ↓
Explore
   ↓
Travel

Your journey starts with an idea. TripCraft helps turn it into a plan.

<div align="center">

✈️ TripCraft

Discover. Plan. Explore. Experience.

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=15&pause=1500&center=true&vCenter=true&width=500&lines=Your+journey%2C+crafted+digitally.;Built+for+better+travel+planning." />

<br/><br/>

<img src="https://capsule-render.vercel.app/api?type=waving&height=100&section=footer&color=gradient" width="100%"/>

</div>
