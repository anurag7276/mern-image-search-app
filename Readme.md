# Internship Task: MERN + OAuth Image Search App

### 🚀 [View Live Application](https://mern-image-search-app.vercel.app/) 🚀


This is a full-stack MERN (MongoDB, Express, React, Node.js) application built for the UD Studios internship assignment. The application allows authenticated users to search for images using the Unsplash API, view a multi-select grid, see their personal search history, and view the top 5 most popular searches across all users.




---

## 📸 Visual Proof

As required by the assignment, here are screenshots and GIFs demonstrating the application's core features[cite: 43, 44].

### 1. OAuth Login
[cite_start]*This shows the login page and the OAuth authentication flow[cite: 45].*

<img width="1907" height="547" alt="Screenshot 2025-11-01 184324" src="https://github.com/user-attachments/assets/d7a64632-bddc-426b-87ef-e5fc3ccb3ca4" />


### 2. Search Results & Multi-Select &Search History Section
[cite_start]*This shows the 4-column image grid, the checkbox overlays, and the dynamic "Selected: X images" counter[cite: 47].*



<img width="1920" height="1080" alt="Screenshot (817)" src="https://github.com/user-attachments/assets/07ff1f11-4e5a-4a5e-bd08-9cc5b8c0fd34" />




<img width="1920" height="1080" alt="Screenshot (818)" src="https://github.com/user-attachments/assets/4bbdbd3c-ff1e-41dd-b2a8-1391cea769e2" />

---



## 🚀 Features Implemented

* **OAuth Authentication:** Secure login with Google, Facebook, and GitHub using Passport.js.
* **Image Search:** Authenticated users can search for images, which are fetched from the Unsplash API.
* **User Search History:** The backend records every search, and users can see a list of their own recent searches.
* **Top Searches Banner:** A banner at the top of the app displays the top 5 most frequent search terms across all users.
* **Multi-Select Grid:** Search results are displayed in a 4-column grid with checkbox overlays.
* **Dynamic Counter:** A counter displays how many images are currently selected on the page.

---

## 📁 Folder Structure

The project uses a monorepo structure with two main directories: `/client` for the React frontend and `/server` for the Express backend.

/ud-studios-internship
|
|-- /client   (React + Vite Frontend)
|   |-- /src
|   |   |-- /components (Navbar, ImageGrid, SearchComponent, etc.)
|   |   |-- /pages (HomePage, LoginPage)
|   |   |-- App.jsx (Main app layout and auth checking)
|   |   |-- main.jsx (React entry point)
|   |-- .gitignore
|   |-- package.json
|
|-- /server   (Node.js + Express Backend)
|   |-- /config (db.js, passport.js)
|   |-- /middleware (authMiddleware.js)
|   |-- /models (User.js, Search.js)
|   |-- /routes (auth.js, api.js)
|   |-- .gitignore
|   |-- .env (Environment variables)
|   |-- index.js (Main server entry point)
|   |-- package.json
|
|-- README.md (This file)




---

## 🛠️ Setup and Installation

To run this project locally, follow these steps:

### 1. Prerequisites

* Node.js (v16 or later)
* MongoDB (A local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
* API keys from:
    * Google Cloud Console
    * Meta for Developers (Facebook)
    * GitHub Developer Settings
    * Unsplash Developers

### 2. Backend Setup (`/server`)

```bash
# 1. Navigate to the server directory
git clone  urlhere

cd server

# 2. Install dependencies
npm install

# 3. Create a .env file in the /server directory
#    Copy the contents of .env.example (or below) and fill in your keys
touch .env

# 4. Run the server
npm run dev
```


### 3. Frontend Setup (/client)

```bash
# 1. Open a new terminal and navigate to the client directory
cd client

# 2. Install dependencies
npm install

# 3. Run the client
npm run dev
```


### Environment Variables (/server/.env)
Your .env file in the /server directory must contain the following keys:

```bash
# Server Port
PORT=5001

# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster...

# Session Secret Key
COOKIE_KEY=anyRandomStringForSessions

# Client URL (for OAuth redirects)
CLIENT_URL=http://localhost:5173

# Unsplash API
UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_ACCESS_KEY

# Google OAuth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# Facebook OAuth
FACEBOOK_CLIENT_ID=YOUR_FACEBOOK_APP_ID
FACEBOOK_CLIENT_SECRET=YOUR_FACEBOOK_APP_SECRET

# GitHub OAuth
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET

```


## 🔌 API Endpoints (cURL Examples)

[cite_start]Here are examples for the API endpoints as required[cite: 42].
**Note:** You must be authenticated (logged in) to use the `/api` routes. These cURL examples assume you have a valid session cookie.

### Authentication

* **Login (Google):** `GET /auth/google`
* **Login (Facebook):** `GET /auth/facebook`
* **Login (GitHub):** `GET /auth/github`
* **Check Login Status:** `GET /auth/login/success`
* **Logout:** `GET /auth/logout`

### Application API

* [cite_start]**Search for Images (`POST /api/search`)** [cite: 19]
    ```bash
    curl -X POST http://localhost:5001/api/search \
         -H "Content-Type: application/json" \
         --cookie "connect.sid=YOUR_SESSION_COOKIE" \
         -d '{"term": "dogs"}'
    ```

* [cite_start]**Get User's Search History (`GET /api/history`)** [cite: 30]
    ```bash
    curl http://localhost:5001/api/history \
         --cookie "connect.sid=YOUR_SESSION_COOKIE"
    ```

* [cite_start]**Get Top 5 Searches (`GET /api/top-searches`)** [cite: 15]
    ```bash
    curl http://localhost:5001/api/top-searches \
         --cookie "connect.sid=YOUR_SESSION_COOKIE"
    ```
