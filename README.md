# 🗺️ TripCraft — AI-Powered Travel Planner

TripCraft is a full-stack travel planning application designed for the DevOps Practices and Principles (CSUL511) course project. It lets users plan trips, compare travel options, and redirect to external booking platforms for hotels, flights, buses, trains, and cabs.

This repository demonstrates full-stack development, automated testing, CI in GitHub Actions, Jenkins-driven pipeline execution, Docker-based containerization, and monitoring setup.

---

## 👨‍🎓 Student Details

| Field | Details |
|---|---|
| Name | Arman |
| Roll Number | 24ESKCS056 |
| Course | B.Tech – Computer Science & Engineering |
| Semester | V |
| Subject | DevOps Practices and Principles (CSUL511) |
| Institution | Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT), Jaipur |
| Session | 2026 |

---

## 🏗️ Architecture and Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| AI Integration | Groq API (OpenAI-compatible SDK) |
| CI | GitHub Actions |
| CD / Automation | Jenkinsfile pipeline |
| Containerization | Docker + Docker Compose |
| Monitoring | Prometheus + Grafana dashboard |

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/skit-devops-2026/DevOps-24ESKCS056.git
cd DevOps-24ESKCS056
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Update the `.env` values for your local environment, especially:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `GROQ_API_KEY`
- `GROQ_MODEL`

### 3. Frontend setup

```bash
cd ../client
npm install
```

### 4. Start the app locally

Backend:

```bash
cd server
npm start
```

Frontend:

```bash
cd client
npm run dev
```

The frontend runs on `http://localhost:5173` by default, and the backend runs on `http://localhost:5000`.

### Local Docker Compose

Create `server/.env` from the example and set a valid `GROQ_API_KEY` and a
strong `JWT_SECRET`. The Compose configuration overrides `MONGO_URI` to use
the local `mongo` service; it does not connect the local stack to Atlas.

```powershell
Copy-Item server/.env.example server/.env
docker compose config --quiet
docker compose up -d --build
docker compose ps
```

The frontend is available at `http://localhost:3000`, the backend at
`http://localhost:5000`, and MongoDB at `localhost:27017`. The frontend's
Nginx configuration proxies `/api` requests to the backend container.

Check the backend with:

```powershell
Invoke-WebRequest http://localhost:5000/api/health
Invoke-WebRequest http://localhost:5000/metrics
```

### Production API configuration

`VITE_API_URL` is a frontend **build-time** setting. Leave it unset for local
development and Docker Compose, where `/api` is proxied by Vite or Nginx. For
a separately hosted frontend, set it to the real backend origin plus `/api`
when building the frontend. Configure the backend's `FRONTEND_URL` to the
exact public frontend origin so credentialed CORS requests are accepted.
Neither setting is a secret.

There is no public frontend or backend URL assigned to this checkout yet;
do not use a placeholder as a live deployment address.

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

Run frontend production build:

```bash
cd client
npm run build
```

The repository includes real automated checks for the backend health API and frontend booking URL utilities.

---

## 🔁 CI / GitHub Actions

The workflow file in `.github/workflows/ci.yml` runs on pushes to `main`, `develop`, and `ci-pipeline`, and on pull requests to `main` and `develop`.

It performs the following steps:

1. Checks out the repo
2. Installs Node.js 20
3. Runs `npm ci` in the client and server
4. Executes the frontend and backend automated tests
5. Builds the frontend for production validation
6. Verifies runtime versions

This is the project’s CI definition used for automated validation.

---

## 🧪 Jenkins Pipeline

The repository includes a declarative Jenkins pipeline in `Jenkinsfile`.

The pipeline stages perform:

1. Checkout code from SCM
2. Install frontend dependencies
3. Run frontend tests
4. Build frontend assets
5. Install backend dependencies
6. Run backend tests

This pipeline is meant to be executed in a local Jenkins instance connected to the repository.

---

## 🐳 Docker and Compose

Docker configuration is present for both the frontend and backend application layers.

To build and run the stack locally:

```bash
docker compose up --build
```

This project includes:

- `client/Dockerfile`
- `server/Dockerfile`
- `docker-compose.yml`

The compose file runs:

- MongoDB database service
- Express backend
- React frontend

---

## 📈 Monitoring

The backend exposes Prometheus metrics at `http://localhost:5000/metrics`.

Relevant monitoring files:

- `monitoring/prometheus.yml`
- `monitoring/grafana-dashboard.json`

The metrics cover HTTP request counts and durations, plus default Node.js
process metrics such as memory usage, CPU time, and uptime. The supplied
Prometheus target is for local Docker Desktop monitoring via
`host.docker.internal:5000`; update it only when a real deployment endpoint
is available.

## Kubernetes (local kind)

The manifests under `k8s/` deploy the backend, frontend, and MongoDB with
health probes and persistent database storage. Before applying them, create
the `tripcraft-secrets` Kubernetes Secret with `JWT_SECRET` and
`GROQ_API_KEY` from a secure local secret source, and create
`ghcr-pull-secret` with a GitHub Container Registry credential that has
`read:packages` access. Do not commit either Secret or any secret values.

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
The Kubernetes ConfigMap's `FRONTEND_URL` matches that local port-forward;
change it to the actual frontend origin before using a separately exposed
frontend.

---

## 🔒 Security Notes

Sensitive variables such as database credentials, JWT secrets, and API keys are not committed in tracked source files. The project uses `.env` files locally and includes an `.env.example` template for safe setup.

---

## 📌 Git and Branching Notes

The project follows a multi-branch workflow with `main` and feature/development branches. Pull requests are used to merge validated work into the active development branch before final integration.

---

## 🧾 Repository Summary

This repository covers the required DevOps practices for the course assignment, including:

- Clean repository setup
- Version-controlled source code
- Git branching and PR workflow
- Automated tests
- GitHub Actions CI
- Jenkins pipeline definition
- Docker configuration
- Monitoring setup

The repository is intended for academic evaluation and live demonstration of DevOps workflow execution.
