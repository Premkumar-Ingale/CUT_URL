<div align="center">
  <h1>✂️ CutURL — Free URL Shortener & Tracker</h1>
  <p><strong>Shorten. Track. Share.</strong></p>
  <a href="https://cut-url.vercel.app" target="_blank">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-cut--url.vercel.app-brightgreen?style=for-the-badge&logo=vercel" />
  </a>
  &nbsp;
  <img alt="Frontend" src="https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-blue?style=for-the-badge&logo=react" />
  &nbsp;
  <img alt="Backend" src="https://img.shields.io/badge/Backend-Express%205%20%2B%20MongoDB-green?style=for-the-badge&logo=node.js" />
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Flow Diagram](#-flow-diagram)
- [Tech Stack](#-tech-stack)
- [API Reference](#-api-reference)
- [Database Models](#-database-models)
- [Environment Variables](#-environment-variables)
- [Getting Started (Local Setup)](#-getting-started-local-setup)
- [Deployment](#-deployment)
- [Features](#-features)

---

## 🌐 Overview

**CutURL** is a full-stack URL shortener and click-tracker web application. Users can:

- Paste any long URL and instantly get a short link (no login required)
- Register & log in to save and manage their shortened links
- Track how many times each of their links has been clicked
- View a personal dashboard with all created URLs and their stats

The project follows a clean **monorepo structure** with a dedicated `FRONTEND` (React SPA) and `BACKEND` (Express REST API), deployed independently to **Vercel** and **Render** respectively.

---

## 🔗 Live Demo

| Service  | URL |
|----------|-----|
| Frontend | [https://cut-url.vercel.app](https://cut-url.vercel.app) |
| Backend API | [https://cut-url-jvvs.onrender.com](https://cut-url-jvvs.onrender.com) |

---

## 📸 Screenshots

### 🏠 Home Page
> Paste any URL and shorten it instantly — no login required.

![Home Page](https://cut-url.vercel.app)

*(The hero section features the URL input form, testimonials, and a footer linking to GitHub.)*

### 🔐 Login / Signup Page
> Tabbed authentication screen supporting both Login and Register flows.

---

## 📁 Project Structure

```
URL_CUTTER/
├── BACKEND/                    # Express.js REST API
│   ├── app.js                  # Entry point — Express app setup, CORS, routes
│   ├── .env                    # Environment variables (not committed)
│   ├── .env.example            # Example environment variable template
│   ├── render.yaml             # Render.com deployment configuration
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── mongo.config.js       # MongoDB connection setup
│       ├── controller/
│       │   ├── auth.controller.js    # Register, Login, Me handlers
│       │   └── short_url.controller.js # Create short URL, redirect, dashboard
│       ├── dao/
│       │   ├── auth.dao.js           # Database access for users
│       │   └── short_url.dao.js      # Database access for short URLs
│       ├── middleware/
│       │   └── auth.middleware.js    # JWT authentication middleware
│       ├── models/
│       │   ├── user.model.js         # Mongoose User schema
│       │   └── shorturl.model.js     # Mongoose ShortUrl schema
│       ├── routes/
│       │   ├── auth.route.js         # /api/auth routes
│       │   └── short_url.route.js    # /api/create routes
│       ├── services/
│       │   └── short_url.service.js  # Business logic for URL shortening
│       └── utils/
│           ├── attachUser.js         # Attaches JWT user to req.user
│           └── errorHandler.js       # Global error handler middleware
│
└── FRONTEND/                   # React 19 SPA (Vite)
    ├── index.html              # HTML entry point
    ├── vite.config.js          # Vite build configuration
    ├── vercel.json             # Vercel SPA routing config
    ├── package.json
    └── src/
        ├── main.jsx            # React root — mounts app with Redux & Router
        ├── RootLayout.jsx      # Shared layout wrapper (Navbar + Outlet)
        ├── index.css           # Global styles
        ├── api/
        │   └── axiosInstance.js      # Axios instance with base URL & credentials
        ├── assets/             # Images, GIFs, audio, icons
        ├── components/
        │   ├── NavBar.jsx            # Top navigation bar (dark mode, auth state)
        │   ├── Header.jsx            # Page header component
        │   ├── UrlForm.jsx           # URL input form (shortens URL on submit)
        │   ├── UrlResult.jsx         # Displays the generated short URL
        │   ├── UserUrl.jsx           # Single URL card in dashboard list
        │   ├── LoginForm.jsx         # Login form component
        │   └── RegisterForm.jsx      # Registration form component
        ├── pages/
        │   ├── HomePage.jsx          # Landing page with URL shortener
        │   ├── AuthPage.jsx          # Login / Signup tabbed page
        │   ├── DashboardPage.jsx     # Protected: user's URL list + stats
        │   └── AboutPage.jsx         # About page with retro design + music
        ├── routing/
        │   ├── root.route.js         # Root TanStack Router setup
        │   ├── home.route.js         # / route
        │   ├── auth.route.js         # /auth route
        │   ├── dashboard.route.js    # /dashboard route (protected)
        │   └── about.route.js        # /about route
        ├── store/
        │   └── slice/
        │       ├── authSlice.js      # Redux: user auth state
        │       └── darkModeSlice.js  # Redux: dark/light mode toggle
        └── utils/
            └── helpers.js            # Utility/helper functions
```

---

## 🔄 Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER (Browser)                              │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
              ┌────────────────▼───────────────────┐
              │         FRONTEND (Vercel)           │
              │         React 19 + Vite SPA         │
              │                                     │
              │  ┌─────────────────────────────┐    │
              │  │    TanStack Router           │    │
              │  │  /        → HomePage        │    │
              │  │  /auth    → AuthPage        │    │
              │  │  /dashboard → DashboardPage │    │
              │  │  /about   → AboutPage       │    │
              │  └─────────────────────────────┘    │
              │                                     │
              │  ┌─────────────────────────────┐    │
              │  │   Redux Toolkit Store        │    │
              │  │  ┌──────────────────────┐   │    │
              │  │  │ authSlice (user info) │   │    │
              │  │  │ darkModeSlice (theme) │   │    │
              │  │  └──────────────────────┘   │    │
              │  └─────────────────────────────┘    │
              │                                     │
              │  Axios (with credentials: true)      │
              └──────────────────┬──────────────────┘
                                 │ HTTPS API calls
                                 │
              ┌──────────────────▼──────────────────┐
              │         BACKEND (Render)             │
              │         Express.js 5 REST API        │
              │                                     │
              │  ┌─────────────────────────────┐    │
              │  │  CORS middleware              │    │
              │  │  cookieParser                │    │
              │  │  attachUser (JWT decode)     │    │
              │  └──────────────┬──────────────┘    │
              │                 │                    │
              │  ┌──────────────▼──────────────┐    │
              │  │         ROUTES               │    │
              │  │  POST /api/auth/register     │    │
              │  │  POST /api/auth/login        │    │
              │  │  GET  /api/auth/me           │    │
              │  │  POST /api/create            │    │
              │  │  GET  /api/create/my-urls    │    │
              │  │  GET  /:shortId  (redirect)  │    │
              │  └──────────────┬──────────────┘    │
              │                 │                    │
              │  ┌──────────────▼──────────────┐    │
              │  │   Controllers → Services     │    │
              │  │   → DAOs (Data Access)       │    │
              │  └──────────────┬──────────────┘    │
              └─────────────────┼───────────────────┘
                                │
              ┌─────────────────▼───────────────────┐
              │         MongoDB Atlas                │
              │   ┌──────────────────────────────┐   │
              │   │  users collection            │   │
              │   │  - name, email, password     │   │
              │   │  - avatar (Gravatar URL)     │   │
              │   └──────────────────────────────┘   │
              │   ┌──────────────────────────────┐   │
              │   │  shorturls collection        │   │
              │   │  - full_url, short_url       │   │
              │   │  - clicks (counter)          │   │
              │   │  - user (ref → User)         │   │
              │   └──────────────────────────────┘   │
              └─────────────────────────────────────┘

─────────────────── SHORT URL REDIRECT FLOW ───────────────────

User visits  https://backend-url.onrender.com/abc123
      │
      ▼
  GET /:id  →  Controller looks up `abc123` in DB
      │
      ├─ Found → increment `clicks` counter → 301 redirect to full_url
      │
      └─ Not found → 404 error response
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js v5** | Web framework / REST API |
| **MongoDB** | NoSQL database |
| **Mongoose v9** | ODM for MongoDB schema & queries |
| **nanoid** | Generates unique short URL codes |
| **jsonwebtoken (JWT)** | Authentication tokens (stored in HTTP-only cookies) |
| **cookie-parser** | Parses cookies from incoming requests |
| **cors** | Cross-Origin Resource Sharing configuration |
| **dotenv** | Loads environment variables from `.env` |
| **nodemon** | Dev server with auto-reload |

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI component library |
| **Vite 8** | Lightning-fast build tool & dev server |
| **TailwindCSS v4** | Utility-first CSS framework |
| **TanStack Router** | Type-safe file-based routing for React |
| **TanStack Query** | Async data fetching, caching & sync |
| **Redux Toolkit** | Global state (auth user, dark mode) |
| **React-Redux** | React bindings for Redux |
| **Axios** | HTTP client for API calls |

### Infrastructure

| Service | Role |
|---|---|
| **Vercel** | Frontend hosting (SPA with rewrite rules) |
| **Render** | Backend hosting (Node.js web service) |
| **MongoDB Atlas** | Cloud-hosted MongoDB database |

---

## 📡 API Reference

### **Auth Routes** — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive JWT cookie |
| `GET` | `/api/auth/me` | ✅ | Get currently logged-in user |

#### `POST /api/auth/register`
```json
// Request Body
{ "name": "John Doe", "email": "john@example.com", "password": "secret123" }

// Response
{ "message": "User registered successfully", "user": { "_id": "...", "name": "John Doe", ... } }
```

#### `POST /api/auth/login`
```json
// Request Body
{ "email": "john@example.com", "password": "secret123" }

// Response — sets HttpOnly JWT cookie
{ "message": "Login successful", "user": { "_id": "...", "name": "John Doe", ... } }
```

---

### **URL Routes** — `/api/create`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/api/create` | ❌ (optional) | Create a short URL |
| `GET` | `/api/create/my-urls` | ✅ | Get all URLs for logged-in user |
| `GET` | `/api/create/no` | ❌ | Fun "no" joke endpoint |

#### `POST /api/create`
```json
// Request Body
{ "full_url": "https://www.example.com/very/long/url?with=params" }

// Response
{ "short_url": "https://backend.onrender.com/abc12", "clicks": 0 }
```

#### `GET /api/create/my-urls`
```json
// Response (array of URL objects)
[
  { "_id": "...", "full_url": "https://...", "short_url": "abc12", "clicks": 42 }
]
```

---

### **Redirect Route**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/:shortId` | Looks up `shortId`, increments click counter, redirects to full URL |

---

## 🗄️ Database Models

### User Model (`users` collection)

| Field | Type | Required | Description |
|-------|------|:---:|-------------|
| `name` | String | ✅ | Display name |
| `email` | String | ✅ | Unique email address |
| `password` | String | ✅ | Plaintext (hashed in future) |
| `avatar` | String | ❌ | Auto-generated Gravatar URL |

### ShortUrl Model (`shorturls` collection)

| Field | Type | Required | Description |
|-------|------|:---:|-------------|
| `full_url` | String | ✅ | The original long URL |
| `short_url` | String | ✅ | The unique short code (indexed) |
| `clicks` | Number | ✅ | Click counter (default: 0) |
| `user` | ObjectId | ❌ | Ref to `User` (nullable for anonymous) |
| `createdAt` | Date | — | Auto-generated timestamp |
| `updatedAt` | Date | — | Auto-generated timestamp |

---

## 🔑 Environment Variables

### Backend (`BACKEND/.env`)

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/url-shortener
APP_URL=https://your-render-service-name.onrender.com/
JWT_SECRET=replace_with_a_strong_random_secret
FRONTEND_URL=https://your-vercel-app-name.vercel.app
```

### Frontend (`FRONTEND/.env`)

```env
VITE_API_BASE_URL=https://your-render-service-name.onrender.com
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

- **Node.js** v18+
- **MongoDB Atlas** account (or local MongoDB)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/keshavgarg24/CutURL.git
cd CutURL
```

### 2. Setup the Backend

```bash
cd BACKEND
cp .env.example .env
# Fill in your MONGO_URI, JWT_SECRET, APP_URL, FRONTEND_URL

npm install
npm run dev   # Starts on http://localhost:3000
```

### 3. Setup the Frontend

```bash
cd FRONTEND
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:3000

npm install
npm run dev   # Starts on http://localhost:5173
```

### 4. Open the App

Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment

### Frontend → Vercel

1. Push `FRONTEND/` to GitHub
2. Import the project in [vercel.com](https://vercel.com)
3. Set **Root Directory** to `FRONTEND`
4. Set environment variable: `VITE_API_BASE_URL=<your-render-backend-url>`
5. Deploy — Vercel uses `vercel.json` to handle SPA routing

### Backend → Render

1. Push `BACKEND/` to GitHub
2. Create a **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** to `BACKEND`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node app.js`
6. Add all environment variables from `.env.example`
7. Deploy

> **Note:** Render free tier spins down after inactivity — the first request may take 30–60 seconds.

---

## ✨ Features

- 🔗 **Instant URL Shortening** — No login required to generate short links
- 📊 **Click Tracking** — Every redirect increments a click counter
- 🔐 **Auth System** — JWT-based login/register with HTTP-only cookies
- 📋 **Personal Dashboard** — View and manage all your shortened URLs
- 🌙 **Dark Mode** — Toggle between light and dark themes (persisted via Redux)
- 🎨 **Retro Design** — Sci-fi dark aesthetic with neon accents
- 🎵 **About Page** — Retro page with pixel art, GIFs, and background music
- 😄 **"No" Endpoint** — `/api/create/no` returns a random humorous refusal
- 👤 **Gravatar Avatars** — Auto-generates profile pictures from email hash
- 📱 **Fully Responsive** — Mobile-first design with Tailwind CSS

---

## 📄 License

This project is open source. Feel free to fork and build upon it.

---

<div align="center">
  <p>Made with ❤️ by <strong>Premkumar Ingale</strong></p>
  <p>
    <a href="https://cut-url.vercel.app">🌐 Live App</a> •
    <a href="https://github.com/keshavgarg24/CutURL">⭐ Star on GitHub</a>
  </p>
</div>
