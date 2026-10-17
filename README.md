<div align="center">

<br><br>

<img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85" width="100%" alt="Tropical beach" />

<br><br>

# ✈️ TripCraft

### **AI-Powered Travel Planner**

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&pause=1200&center=true&vCenter=true&width=700&lines=Turn+travel+ideas+into+complete+journeys.;Generate+personalized+itineraries+with+AI.;Plan%2C+explore%2C+save%2C+and+travel." alt="TripCraft animation" />

<br><br>

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-111111?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white)

<br><br>

</div>

> **Live demo:** [Open TripCraft](https://tripcraft-frontend-c8qp.onrender.com/) ·
> [Plan a trip](https://tripcraft-frontend-c8qp.onrender.com/plan)

## 🌍 Overview

**TripCraft** is a full-stack, AI-powered travel planning platform that transforms a few travel preferences into a structured journey. Enter a **source, destination, budget, duration, number of travelers, and preferences**, and TripCraft generates a personalized travel experience with:

**🗺️ Itinerary · 📍 Places · 🏨 Hotels · 🚆 Transport**

Authenticated users can save and manage trips, while booking actions can continue through external travel platforms. TripCraft is also the application used for the **DevOps Practices and Principles (CSUL511)** course project, demonstrating source control, automated testing, CI, Jenkins, containerization, and monitoring.

> **From a travel idea to a complete plan — in one flow.**

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🤖 AI Trip Planning
Generate personalized travel plans through the Groq-powered AI service.

</td>
<td width="50%" valign="top">

### 🗺️ Smart Itineraries
Organize activities into a clear day-wise journey.

</td>
</tr>
<tr>
<td valign="top">

### 🏨 Hotels & 🚆 Transport
Explore accommodation and transportation suggestions with the generated plan.

</td>
<td valign="top">

### 📍 Places & Attractions
Discover places worth exploring at the destination.

</td>
</tr>
<tr>
<td valign="top">

### 🔐 Authentication
JWT-based authentication with bcrypt password hashing.

</td>
<td valign="top">

### 🧳 My Trips
Save, revisit, and delete generated journeys.

</td>
</tr>
<tr>
<td valign="top">

### 🔗 Booking Redirects
Continue from selected travel options to external booking platforms.

</td>
<td valign="top">

### 📱 Responsive Experience
A focused React interface built around the travel-planning workflow.

</td>
</tr>
</table>

---

## 👨‍🎓 Student Details

| Field | Details |
|---|---|
| Name | Arman Kaushik |
| Roll Number | 24ESKCS056 |
| Course | B.Tech – Computer Science & Engineering |
| Semester | V |
| Subject | DevOps Practices and Principles (CSUL511) |
| Institution | Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT), Jaipur |
| Session | 2026 |

---

## 🧭 Product Flow

<img width="1024" height="572" alt="TripCraft product flow" src="https://github.com/user-attachments/assets/84924c99-2f5f-4bf5-b935-37d8feab1024" />

---

## 🧪 Technical Proof

### 1. Application Evidence

<img width="1917" height="918" alt="TripCraft technical proof 1" src="https://github.com/user-attachments/assets/464da9db-7132-4ff5-9cd3-58699e434de1" />

<br><br>

### 2. Application Evidence

<img width="1917" height="1026" alt="TripCraft technical proof 2" src="https://github.com/user-attachments/assets/856f0818-0edd-4ee1-a3db-9a2150c5d917" />

<br><br>

### 3. Application Evidence

<img width="1917" height="1020" alt="TripCraft technical proof 3" src="https://github.com/user-attachments/assets/c7714ffa-54e7-444f-bd78-4fb8caf8e823" />

---

## 🧠 AI Architecture

Trip generation is isolated behind a dedicated backend service layer. The backend uses the Groq API through the existing OpenAI-compatible client interface, with model selection controlled through environment configuration.

<img width="1024" height="572" alt="TripCraft AI architecture" src="https://github.com/user-attachments/assets/15eef223-6c4d-4c11-80f6-ecb43923190b" />

AI configuration is environment-driven:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

Never commit real credentials. Keep secrets in `server/.env` locally or in the deployment provider's secret/environment-variable settings.

---

## 🏗️ System Architecture

<img width="1024" height="572" alt="TripCraft system architecture" src="https://github.com/user-attachments/assets/403e90ec-aeff-4c3e-8bdc-81747183532b" />

---

## 🛠️ Architecture and Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| AI Integration | Groq API |
| API | REST |
| Testing | Frontend and backend automated tests |
| CI | GitHub Actions |
| CD / Automation | Jenkins declarative pipeline |
| Containerization | Docker, Docker Compose |
| Monitoring | Prometheus, Grafana dashboard |
| Version Control | Git, GitHub |

### Additional Technology Badges

<div align="center">

<img src="https://skillicons.dev/icons?i=python,java,cpp,js,html,css,php,bootstrap,git,github,docker,jenkins,vscode,pytorch,tensorflow,sklearn&perline=16" alt="Technology stack icons" />

<br><br>

<img src="https://img.shields.io/badge/SQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="SQL" />
<img src="https://img.shields.io/badge/Power%20BI-F2C811?style=flat-square&logo=powerbi&logoColor=111827" alt="Power BI" />
<img src="https://img.shields.io/badge/Tableau-E97627?style=flat-square&logo=tableau&logoColor=white" alt="Tableau" />

</div>

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
│   ├── prometheus.yml
│   └── grafana-dashboard.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── Jenkinsfile
├── client/Dockerfile
├── server/Dockerfile
├── docker-compose.yml
└── README.md
</pre>

---

## 🔌 API Reference

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

## ⚙️ Local Setup

### Repository Locations

This project has been used in both the course-managed repository and a standalone application repository. Clone the repository you intend to work with:

**Course / DevOps repository:**

```bash
git clone https://github.com/skit-devops-2026/DevOps-24ESKCS056.git
cd DevOps-24ESKCS056
```

**Standalone application repository (alternate checkout):**

```bash
git clone https://github.com/B241561/TripCraft.git
cd TripCraft
```

Use one checkout for a given development session; the commands above represent two repository locations, not two commands that must be run in sequence.

### Prerequisites

- Node.js 20 or a compatible supported Node.js version
- npm
- MongoDB running locally, or a reachable MongoDB Atlas deployment
- A valid Groq API key for real AI trip generation
- Docker Desktop, only if using the Docker Compose workflow

### 1. Backend Setup

```bash
cd server
npm install
```

Create `server/.env` using `.env.example` as the template, then set the values for your environment:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tripcraft
JWT_SECRET=replace_with_a_long_random_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

The URI above is an example for a locally running MongoDB instance. If you use MongoDB Atlas, replace it with your own valid Atlas connection string. Do not commit `.env` or put actual credentials in this README.

Start the backend:

```bash
npm start
```

The backend normally listens on `http://localhost:5000`.

### 2. Frontend Setup

Open another terminal from the repository root:

```bash
cd client
npm install
npm run dev
```

Vite normally serves the frontend at:

```text
http://localhost:5173
```

If port `5173` is unavailable on your Windows setup, use an available development port, for example:

```bash
npm run dev -- --port 3000
```

Ensure the frontend's API configuration points to the backend at `http://localhost:5000` for local development. Use the project's actual API configuration variable if it is environment-driven.

### 3. Alternative Quick Start from the Standalone Repository

If you cloned the standalone application repository above, the same application setup applies:

```bash
cd server
npm install
npm start
```

In another terminal:

```bash
cd client
npm install
npm run dev
```

Then open the frontend development URL printed by Vite.

---

## ✅ Testing

Run frontend tests:

```bash
cd client
npm test
```

Run backend tests:

```bash
cd server
npm test
```

Run the frontend production build:

```bash
cd client
npm run build
```

The repository includes automated frontend and backend checks for core application behaviour, including backend health/metrics and frontend booking URL utilities. Use the actual command output to confirm results; a file existing by itself is not proof of a passing test run.

---

## 🔁 CI / GitHub Actions

The workflow file at `.github/workflows/ci.yml` runs on pushes to `main`, `develop`, and `ci-pipeline`, and on pull requests to `main` and `develop`.

It performs the following steps:

1. Checks out the repository.
2. Installs Node.js 20.
3. Runs `npm ci` in the client and server.
4. Executes the frontend and backend automated tests.
5. Builds the frontend for production validation.
6. Verifies runtime versions.

This workflow is the project's CI definition used for automated validation. Its actual run history should be checked in GitHub Actions when reporting CI status.

---

## 🧪 Jenkins Pipeline

The repository includes a declarative pipeline in `Jenkinsfile`.

The pipeline stages perform:

1. Checkout code from SCM.
2. Install frontend dependencies.
3. Run frontend tests.
4. Build frontend assets.
5. Install backend dependencies.
6. Run backend tests.

This pipeline is intended to run in a local Jenkins instance connected to the repository. The Jenkins build result should be verified from the actual Jenkins job/console output.

---

## 🐳 Docker and Compose

Docker configuration is present for the frontend and backend application layers.

To build and run the stack locally, make sure Docker Desktop is running and run from the repository root:

```bash
docker compose up --build
```

The Compose configuration includes:

- MongoDB database service
- Express backend
- React/Vite frontend served by the frontend container

Relevant files:

- `client/Dockerfile`
- `server/Dockerfile`
- `docker-compose.yml`

The frontend's Docker host port is determined by the `ports` mapping in `docker-compose.yml`. If the mapping is `3000:80`, open `http://localhost:3000`; if it uses another available host port, use that port instead. This is separate from Vite's default development port of `5173`.

Conceptual container flow:

<pre>
Frontend Container
       │
       ▼
Backend Container
       │
       ▼
    MongoDB
</pre>

Check the actual service status with:

```bash
docker compose ps
```

View backend logs with:

```bash
docker compose logs backend --tail 100
```

---

## 📈 Monitoring and Observability

The backend exposes Prometheus metrics at:

```text
http://localhost:5000/metrics
```

Relevant monitoring files:

- `monitoring/prometheus.yml`
- `monitoring/grafana-dashboard.json`

The metrics include HTTP request counts and durations, plus default Node.js process metrics such as memory usage, CPU time, and uptime.

Conceptual observability flow:

<pre>
TripCraft Backend
       ↓
    /metrics
       ↓
   Prometheus
       ↓
    Grafana
</pre>

For a deployed environment, configure Prometheus to scrape the actual reachable backend target rather than assuming that `localhost` inside a Prometheus container refers to another container or the host.

---

## 🔒 Security Notes

TripCraft keeps sensitive configuration outside tracked source code.

Use a local file:

```text
server/.env
```

Keep real API keys, MongoDB credentials, registry tokens, and JWT secrets out of Git. The `.env.example` file should contain placeholders only. In a cloud deployment, put production values into the hosting provider's secret/environment-variable settings.

Authentication uses **JWT**, and passwords are hashed with **bcryptjs**.

---

## 📌 Git and Branching Notes

The project follows a multi-branch workflow with `main` and feature/development branches. Pull requests are used to merge validated work into the active development branch before final integration.

The course repository is managed under the `skit-devops-2026` GitHub organization. Use meaningful commits and preserve CI/PR history so that the repository provides a clear record of changes.

---

## 🏖️ Travel Experience

<div align="center">

<img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85" width="90%" alt="Hotel" />

<br><br>

*From finding the destination to shaping the journey — TripCraft keeps the experience connected.*

</div>

---

## 🚀 Selected Projects and Repository Links

### TripCraft

The primary project documented in this repository: an AI-powered travel planner with itinerary generation, hotel and transport suggestions, authentication, saved trips, and external booking redirects.

### Repository Links

- **Course / DevOps repository:** [DevOps-24ESKCS056](https://github.com/skit-devops-2026/DevOps-24ESKCS056)
- **Standalone application repository:** [TripCraft](https://github.com/B241561/TripCraft)

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

TripCraft is designed to evolve from a trip planner into a more complete personal travel assistant.

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

## 🧾 DevOps Repository Summary

This repository demonstrates the practices used to version, build, test, package, deploy, and monitor the TripCraft application, including:

- Clean repository setup
- Version-controlled source code
- Git branching and pull-request workflow
- Automated tests
- GitHub Actions CI
- Jenkins pipeline definition
- Docker configuration and Docker Compose
- Monitoring setup with Prometheus and a Grafana dashboard
- Application health and metrics endpoints

The repository is intended for academic evaluation and live demonstration of the DevOps workflow. The actual status of builds, deployments, images, monitoring targets, and Kubernetes resources should be verified from their real execution evidence rather than inferred from configuration-file presence.

---

<div align="center">

### ✈️ **TripCraft**

**Discover. Plan. Explore. Experience.**

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=14&pause=1500&center=true&vCenter=true&width=500&lines=Your+journey%2C+crafted+digitally.;Built+for+better+travel+planning." alt="TripCraft footer" />

</div>

## Verified DevOps Workflow Notes

### Local Docker Compose

Create `server/.env` from `server/.env.example` and set a valid
`GROQ_API_KEY` and a strong `JWT_SECRET`. Compose overrides `MONGO_URI` to
use its local `mongo` service; it does not connect the local stack to Atlas.

```powershell
Copy-Item server/.env.example server/.env
docker compose config --quiet
docker compose up -d --build
docker compose ps
```

The Compose frontend is available at `http://localhost:3000`, the backend
at `http://localhost:5000`, and MongoDB at `localhost:27017`. Nginx proxies
frontend `/api` requests to the backend container. Check backend health and
metrics at `/api/health` and `/metrics`.

### Production API configuration

`VITE_API_URL` is a frontend build-time setting. Leave it unset for local
development and Compose, where `/api` is proxied by Vite or Nginx. For a
separately hosted frontend, set it to the real backend origin plus `/api`
when building. Set the backend's `FRONTEND_URL` to the exact frontend
origin; neither setting contains a secret.

The currently verified Render deployment is:

- Frontend: [https://tripcraft-frontend-c8qp.onrender.com/](https://tripcraft-frontend-c8qp.onrender.com/)
- Backend: [https://tripcraft-backend-qxji.onrender.com/](https://tripcraft-backend-qxji.onrender.com/)
- Health: [https://tripcraft-backend-qxji.onrender.com/api/health](https://tripcraft-backend-qxji.onrender.com/api/health)
- Prometheus metrics: [https://tripcraft-backend-qxji.onrender.com/metrics](https://tripcraft-backend-qxji.onrender.com/metrics)

These endpoints were checked during the submission audit. The Render
frontend serves client-side routes such as `/plan` through the SPA fallback.
The screenshot below is genuine evidence from the public frontend:

![TripCraft public Render deployment](docs/deployment.png)

### Kubernetes (local kind)

The `k8s/` manifests deploy the backend, frontend, and MongoDB with health
probes and persistent database storage. Before applying them, create the
`tripcraft-secrets` Secret with `JWT_SECRET` and `GROQ_API_KEY` from a
secure local source, and `ghcr-pull-secret` with a GitHub Container
Registry credential that has `read:packages` access. Do not commit either
Secret or its values.

```powershell
kind create cluster --name tripcraft
kubectl apply -f k8s/
kubectl rollout status deployment/tripcraft-mongo
kubectl rollout status deployment/tripcraft-backend
kubectl rollout status deployment/tripcraft-frontend
kubectl get pods
kubectl port-forward service/tripcraft-frontend 3003:80
```

Open `http://localhost:3003` while the port-forward command is running.
The ConfigMap's `FRONTEND_URL` is set for that local port-forward; change
it to the actual frontend origin before exposing the service elsewhere.

The pod evidence snapshot is saved in [docs/kubernetes-pods.png](docs/kubernetes-pods.png).
It records a point-in-time local `kind-tripcraft` cluster view; it is not
evidence of Render or Kubernetes hosting the public application. The
manifests use the published GHCR image tag `20261016-e45f1c4`.

### Published Container Images

The Kubernetes manifests reference these published GitHub Container Registry
images:

- Backend: `ghcr.io/skit-devops-2026/tripcraft-backend:20261016-e45f1c4`
- Frontend: `ghcr.io/skit-devops-2026/tripcraft-frontend:20261016-e45f1c4`

The packages are currently private. Authenticate to GHCR with a GitHub
account that has `read:packages` access before pulling:

```sh
docker login ghcr.io
docker pull ghcr.io/skit-devops-2026/tripcraft-backend:20261016-e45f1c4
docker pull ghcr.io/skit-devops-2026/tripcraft-frontend:20261016-e45f1c4
```

The Prometheus scrape configuration in `monitoring/prometheus.yml` targets
a local backend, and `monitoring/grafana-dashboard.json` defines the
application dashboard. These are repository artifacts for local monitoring,
not public Prometheus or Grafana services.

### Render deployment

The root `render.yaml` Blueprint defines a Free-tier Docker backend and a
static frontend. The deployed frontend and backend are available at the
verified URLs above. During Blueprint setup, provide `MONGO_URI` and
`GROQ_API_KEY` through Render's secure secret prompts; the Blueprint does
not store their values. Render generates `JWT_SECRET`. Keep the backend's
`FRONTEND_URL` set to the exact deployed frontend origin. The Free web
service can spin down while idle, so its first request after an idle period
may receive a temporary warming-up response before the backend is available.
