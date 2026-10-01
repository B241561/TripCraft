<div align="center">

✈️ TripCraft

AI-Powered Travel Planner

Plan smarter. Discover better. Travel your way.








</div>

🌍 Overview

TripCraft is a full-stack travel planning platform that uses AI to turn
travel preferences into structured, personalized journeys.

Users can enter their source, destination, budget, trip duration, number of
travelers, and preferences. TripCraft then generates a complete travel
experience with an itinerary, hotel suggestions, transport options, and
places to explore.

The platform also supports authentication, saved trips, and redirect-based
booking access through external travel services.

✨ Key Features

Feature

Description

🤖 AI Trip Generation

Creates personalized travel plans using Groq

🗺️ Smart Itinerary

Organizes activities into a structured day-wise journey

🏨 Hotel Suggestions

Presents accommodation options for the generated trip

🚆 Transport Options

Provides relevant travel choices

📍 Places & Attractions

Highlights destinations and places to explore

🔐 Authentication

JWT authentication with bcrypt password hashing

🧳 My Trips

Save, view, and delete generated journeys

🔗 Booking Redirects

Continue to external travel and booking platforms

📱 Responsive UI

React-based interface for a smooth planning experience

🧠 How TripCraft Works

Travel Details
     │
     ▼
React Frontend
     │
     ▼
Express REST API
     │
     ▼
Trip Controller
     │
     ▼
AI Service → Groq
     │
     ▼
Structured Trip Plan
     │
     ├── Itinerary
     ├── Hotels
     ├── Transport
     └── Places
     │
     ▼
Save / Explore / Book

TripCraft keeps the AI layer separate from the main application logic, while
MongoDB provides persistent storage for users and saved trips.

🏗️ Architecture

┌──────────────────────┐
│     React + Vite     │
│       Frontend       │
└──────────┬───────────┘
           │ REST API
           ▼
┌──────────────────────┐
│   Node.js + Express  │
│       Backend        │
└───────┬───────┬──────┘
        │       │
        │       └──────────► Groq AI
        │
        ▼
┌──────────────────────┐
│  MongoDB + Mongoose  │
└──────────────────────┘

🛠️ Tech Stack

Layer

Technology

Frontend

React 18, Vite

Backend

Node.js, Express.js

Database

MongoDB, Mongoose

Authentication

JWT, bcryptjs

AI

Groq

API

REST

Testing

Frontend & Backend automated tests

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
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── utils/
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
├── Jenkinsfile
├── docker-compose.yml
└── README.md

⚙️ Getting Started

1. Clone

git clone https://github.com/B241561/TripCraft.git
cd TripCraft

2. Backend

cd server
npm install

Create server/.env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model

Start the backend:

npm start

3. Frontend

Open another terminal:

cd client
npm install
npm run dev

Frontend:

http://localhost:5173

Backend:

http://localhost:5000

Never commit real API keys, database credentials, or other secrets.

✅ Testing

Frontend

cd client
npm test
npm run build

Backend

cd server
npm test

The project includes automated checks for frontend utilities and backend API
behaviour.

🐳 Docker

TripCraft includes Docker configuration for the application stack.

docker compose up --build

The Compose setup brings together the frontend, backend, and MongoDB services.

⚙️ CI/CD & Monitoring

The repository includes an automated development workflow using:

GitHub Actions for continuous integration

Jenkins for pipeline execution

Docker Compose for containerized services

Prometheus for metrics collection

Grafana for visualization

Application metrics are exposed through:

http://localhost:5000/metrics

🔐 Security

TripCraft keeps sensitive configuration outside tracked source code.

Use:

server/.env

with:

server/.env.example

as the configuration reference.

Authentication uses JWT, while user passwords are handled using bcryptjs.

🔮 Roadmap

🗺️ Interactive maps

🌦️ Weather-aware trip planning

💰 Smarter budget optimization

🤝 Collaborative trip planning

📅 Editable itineraries and calendar integration

🧠 More personalized recommendations

💡 Vision

TripCraft is built around a simple idea:

Discover → Plan → Generate → Explore → Save → Travel

The goal is to make travel planning feel less like collecting information from
multiple sources and more like creating one complete journey.

<div align="center">

✈️ Discover. Plan. Explore. Experience.

TripCraft — Your journey, crafted digitally.

</div>
