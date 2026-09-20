# Board Game & Room Reservation System

## Overview

This project is a full-stack web application designed for reserving board games and private rooms. It allows users to browse an inventory of board games, book games along with designated rooms on chosen dates, and track their personal reservation history. It also features an administrative panel for managing game inventory, room allocations, and registered users.

This project was developed as an assignment for applying to the SAIG laboratory.

## Key Features

- User Authentication: Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- Board Game Catalog: Paginated catalog of available board games with pricing and availability tracking.
- Room & Game Reservation: Real-time reservation mechanism tying room bookings with board game selections.
- User Profile: Track personal booking history and reservation schedules.
- Admin Panel: Role-based administration to create, update, or remove board games and rooms, as well as view all registered user accounts.
- API Documentation: Interactive Swagger UI documentation for all backend endpoints.

## Tech Stack

- Frontend: React (Vite), React Router, Axios, React Toastify, React Icons
- Backend: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt
- API Docs: Swagger (swagger-ui-express, swagger-jsdoc)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables by creating a `.env` file in the `backend/` directory:
   ```env
   PORT=4000
   URI=<your_mongodb_connection_uri>
   SECRET=<your_jwt_secret>
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The Swagger API documentation will be available at `http://localhost:4000/api-doc`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
