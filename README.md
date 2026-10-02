<div align="center">

<img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85" width="100%" alt="Tropical beach">

<br><br>

# ✈️ TripCraft

### **AI-Powered Travel Planner**

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&pause=1200&center=true&vCenter=true&width=700&lines=Turn+travel+ideas+into+complete+journeys.;Generate+personalized+itineraries+with+AI.;Plan%2C+explore%2C+save%2C+and+travel." alt="TripCraft animation">

<br><br>

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-111111?style=flat-square)

</div>
---

## 🌍 Overview

**TripCraft** is a full-stack travel planning platform that transforms a few
travel preferences into a structured journey.

Enter a **source, destination, budget, duration, number of travelers, and
preferences** and TripCraft generates a personalized travel experience with:

**🗺️ Itinerary · 📍 Places · 🏨 Hotels · 🚆 Transport**

Authenticated users can also save and manage trips, while booking actions can
continue through external travel platforms.

> **From a travel idea to a complete plan — in one flow.**

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI Trip Planning
Generate personalized travel plans through the Groq-powered AI service.

</td>
<td width="50%">

### 🗺️ Smart Itineraries
Organize activities into a clear day-wise journey.

</td>
</tr>

<tr>
<td>

### 🏨 Hotels & 🚆 Transport
Explore accommodation and transportation suggestions with the generated plan.

</td>
<td>

### 📍 Places & Attractions
Discover places worth exploring at the destination.

</td>
</tr>

<tr>
<td>

### 🔐 Authentication
JWT-based authentication with bcrypt password hashing.

</td>
<td>

### 🧳 My Trips
Save, revisit, and delete generated journeys.

</td>
</tr>

<tr>
<td>

### 🔗 Booking Redirects
Continue from selected travel options to external booking platforms.

</td>
<td>

### 📱 Responsive Experience
A focused React interface built around the travel-planning workflow.

</td>
</tr>
</table>

---

## 🧭 Product Flow

<pre>
                     TRIP INPUT
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   Destination        Budget         Preferences
        │                │                │
        └────────────────┼────────────────┘
                         ▼
                  ┌─────────────┐
                  │   Trip API  │
                  └──────┬──────┘
                         ▼
                  ┌─────────────┐
                  │  AI Service │
                  │     Groq    │
                  └──────┬──────┘
                         ▼
             ┌─────────────────────────┐
             │       TRIP RESULT       │
             │ Itinerary • Places     │
             │ Hotels • Transport     │
             └────────────┬────────────┘
                          ▼
                 SAVE • EXPLORE • BOOK
</pre>

---

## Technical Proof

<img width="1917" height="918" alt="image" src="https://github.com/user-attachments/assets/464da9db-7132-4ff5-9cd3-58699e434de1" />


<img width="1907" height="897" alt="image" src="https://github.com/user-attachments/assets/425ffab2-1992-46f8-9d01-5b5850109319" />



## 🧠 AI Architecture

Trip generation is isolated behind a dedicated backend service layer.

<pre>
React Frontend
      │
      ▼
Express REST API
      │
      ▼
Trip Controller
      │
      ▼
AI Service
      │
      ▼
Groq
      │
      ▼
Structured Trip Response
      │
      ▼
Trip Result UI
</pre>

AI configuration is environment-driven:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model
```

Never commit real credentials.

---

## 🏗️ System Architecture

<pre>
                         ┌──────────────────┐
                         │       USER       │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   React + Vite   │
                         │    Frontend      │
                         └────────┬─────────┘
                                  │ REST
                                  ▼
                         ┌──────────────────┐
                         │ Node + Express   │
                         │     Backend      │
                         └──────┬──────┬────┘
                                │      │
                     ┌──────────┘      └──────────┐
                     ▼                            ▼
              ┌──────────────┐             ┌──────────────┐
              │   MongoDB    │             │   Groq AI    │
              │ + Mongoose   │             │ AI Service   │
              └──────────────┘             └──────────────┘
</pre>

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| AI | Groq |
| API | REST |
| Testing | Frontend + Backend automated tests |
| DevOps | Docker, Docker Compose, Jenkins, GitHub Actions |
| Monitoring | Prometheus, Grafana |
| Version Control | Git, GitHub |

---

## 📁 Project Structure

<pre>
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
</pre>

---

## 🔌 API

| Method | Endpoint | Auth | Purpose |
|---|---|:---:|---|
| `POST` | `/api/auth/register` | — | Create an account |
| `POST` | `/api/auth/login` | — | Authenticate a user |
| `GET` | `/api/auth/me` | ✓ | Get the current user |
| `POST` | `/api/trip/generate` | Optional | Generate an AI trip |
| `GET` | `/api/trip/my-trips` | ✓ | Retrieve saved trips |
| `GET` | `/api/trip/:id` | — | Retrieve a trip |
| `DELETE` | `/api/trip/:id` | ✓ | Delete a saved trip |

---

## ⚙️ Quick Start

```bash
git clone https://github.com/B241561/TripCraft.git
cd TripCraft
```

### Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model
```

Then:

```bash
npm start
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## ✅ Testing

```bash
# Frontend
cd client
npm test
npm run build

# Backend
cd ../server
npm test
```

The project includes automated frontend and backend checks for core application
behaviour.

---

## 🐳 Docker

TripCraft includes Docker configuration for the application stack.

```bash
docker compose up --build
```

<pre>
Frontend Container
       │
       ▼
Backend Container
       │
       ▼
    MongoDB
</pre>

---

## ⚙️ CI/CD & Monitoring

### GitHub Actions

```text
Checkout → Install → Test → Build → Validate
```

### Jenkins

A declarative `Jenkinsfile` defines the automated build and test pipeline.

### Observability

```text
TripCraft Backend
       ↓
   /metrics
       ↓
  Prometheus
       ↓
   Grafana
```

Metrics endpoint:

```text
http://localhost:5000/metrics
```

---

## 🔐 Security

TripCraft keeps sensitive configuration outside tracked source code.

Use:

```text
server/.env
```

and keep real API keys, database credentials, and JWT secrets out of Git.

Authentication uses **JWT**, while passwords are protected with **bcryptjs**.

---

## 🏖️ Travel Experience

<div align="center">

<img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85" width="90%" alt="Hotel">

<br><br>

*From finding the destination to shaping the journey — TripCraft keeps the
experience connected.*

</div>

---

## 🔮 Roadmap

- 🗺️ Interactive maps
- 🌦️ Weather-aware planning
- 💰 Smarter budget optimization
- 🤝 Collaborative trip planning
- 📅 Editable itineraries and calendar integration
- 🧠 Deeper personalized recommendations

---

## 💡 Vision

TripCraft is designed to evolve from a trip planner into a more complete
personal travel assistant.

<pre>
Discover
   ↓
Plan
   ↓
Generate
   ↓
Explore
   ↓
Save
   ↓
Travel
</pre>

> **Your journey starts with an idea. TripCraft helps turn it into a plan.**

---

<div align="center">

### ✈️ **TripCraft**

**Discover. Plan. Explore. Experience.**

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=14&pause=1500&center=true&vCenter=true&width=500&lines=Your+journey%2C+crafted+digitally.;Built+for+better+travel+planning." alt="TripCraft footer">

</div>
