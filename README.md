# TODO Application

A full-stack TODO application built with Node.js/Express backend and React/Vite frontend, featuring user authentication, task management, and analytics.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This application allows users to manage their tasks efficiently. Users can register, log in, create, update, delete, and organize tasks. The app includes role-based access (admin and regular users), task prioritization, status tracking, and analytics for productivity insights.

## Features

- **User Authentication**: Secure login and registration with JWT tokens.
- **Task Management**: CRUD operations on tasks with categories, priorities, and due dates.
- **Role-Based Access**: Admin users can manage all tasks; regular users manage their own.
- **Analytics Dashboard**: Visualize task completion trends, priority distributions, and status breakdowns.
- **Responsive UI**: Modern, mobile-friendly interface built with React.
- **Real-time Updates**: Seamless synchronization between frontend and backend.

## Technologies Used

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing
- **Express Validator**: Input validation

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **CSS**: Styling
- **Axios**: HTTP client for API calls
- **React Router**: Client-side routing

## Architecture

The application follows a client-server architecture with separation of concerns:

- **Frontend**: Handles user interactions, renders UI, and communicates with the backend via RESTful APIs.
- **Backend**: Manages business logic, data persistence, authentication, and serves APIs.
- **Database**: MongoDB stores user data, tasks, and analytics.

### High-Level Diagram

```
[Frontend (React)] <--- HTTP/REST ---> [Backend (Express)] <--- Mongoose ---> [MongoDB]
```

### Data Flow
1. User interacts with the frontend.
2. Frontend sends requests to backend APIs.
3. Backend validates requests, processes logic, and interacts with the database.
4. Backend responds with data or confirmation.
5. Frontend updates the UI accordingly.

## Folder Structure

```
TODO/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Main Express app setup
│   │   ├── bootstrap.js           # Server bootstrap
│   │   ├── index.js               # Entry point
│   │   ├── config/
│   │   │   └── config.js          # Configuration settings
│   │   ├── controllers/
│   │   │   ├── auth.controllers.js # Authentication logic
│   │   │   └── task.controller.js  # Task management logic
│   │   ├── db/
│   │   │   └── index.js           # Database connection
│   │   ├── middlewares/
│   │   │   ├── roleAuth.middlewares.js # Role-based authorization
│   │   │   └── verifyJwt.middlewares.js # JWT verification
│   │   ├── models/
│   │   │   ├── task.models.js     # Task schema
│   │   │   └── user.models.js     # User schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js     # Auth endpoints
│   │   │   └── task.routes.js     # Task endpoints
│   │   └── utils/
│   │       ├── ApiError.utils.js  # Error handling utilities
│   │       ├── ApiRes.utils.js    # Response utilities
│   │       └── asyncHandler.utils.js # Async error handling
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── App.css                # Global styles
│   │   ├── App.jsx                # Main App component
│   │   ├── index.css              # Index styles
│   │   ├── main.jsx               # Entry point
│   │   ├── assets/
│   │   │   └── logo.png           # App logo
│   │   ├── components/
│   │   │   ├── Protected.jsx      # Protected route wrapper
│   │   │   ├── analytics/
│   │   │   │   ├── AnalyticsHeader.jsx
│   │   │   │   ├── PrioritySection.jsx
│   │   │   │   ├── StatsGrid.jsx
│   │   │   │   └── TrendChart.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── RecentTasks.jsx
│   │   │   │   ├── RightPanel.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── StatCard.jsx
│   │   │   ├── home/
│   │   │   │   ├── CTA.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   └── Preview.jsx
│   │   │   ├── importantTask/
│   │   │   │   └── ImportantTaskCard.jsx
│   │   │   │   └── TopBar.jsx
│   │   │   └── taskboard/
│   │   │       ├── AddTaskModal.jsx
│   │   │       ├── BoardFilters.jsx
│   │   │       ├── BoardHeader.jsx
│   │   │       ├── BoardPagination.jsx
│   │   │       ├── PriorityPill.jsx
│   │   │       ├── TaskCard.jsx
│   │   │       └── TaskColumn.jsx
│   │   ├── pages/
│   │   │   ├── Analytics.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ImportantTasks.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── TaskBoard.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       └── AdminProtected.jsx
│   │   ├── router/
│   │   │   └── AppRouter.jsx       # Routing configuration
│   │   ├── service/
│   │   │   ├── auth.service.js     # Auth API calls
│   │   │   └── task.service.js     # Task API calls
│   │   ├── store/
│   │   │   ├── authSlice.js        # Auth state management
│   │   │   ├── store.js            # Redux store
│   │   │   ├── taskSlice.js        # Task state management
│   │   │   └── userSlice.js        # User state management
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── vercel.json
│   └── .gitignore
└── README.md
```

## Architecture Details

### Backend Architecture
- **MVC Pattern**: Models for data, Controllers for logic, Routes for endpoints.
- **Middleware**: Authentication, authorization, error handling.
- **Database**: MongoDB with Mongoose for schema definition and validation.

### Frontend Architecture
- **Component-Based**: Reusable React components.
- **State Management**: Redux for global state.
- **Routing**: React Router for navigation.
- **Services**: Axios for API interactions.

## API Documentation

The backend exposes RESTful APIs for authentication and task management.

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    },
    "token": "string"
  }
}
```

#### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "role": "string"
    },
    "token": "string"
  }
}
```

### Task Endpoints

#### GET /api/tasks
Retrieve all tasks for the authenticated user (or all if admin).

**Headers:**
- Authorization: Bearer <token>

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "priority": "low|medium|high",
      "status": "pending|in-progress|completed",
      "dueDate": "date",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### POST /api/tasks
Create a new task.

**Headers:**
- Authorization: Bearer <token>

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "priority": "low|medium|high",
  "status": "pending|in-progress|completed",
  "dueDate": "date"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "id": "string",
      "title": "string",
      "description": "string",
      "priority": "string",
      "status": "string",
      "dueDate": "date",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

#### PUT /api/tasks/:id
Update an existing task.

**Headers:**
- Authorization: Bearer <token>

**Request Body:** (partial update allowed)
```json
{
  "title": "string",
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "id": "string",
      "title": "string",
      "status": "completed"
    }
  }
}
```

#### DELETE /api/tasks/:id
Delete a task.

**Headers:**
- Authorization: Bearer <token>

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the `backend` directory:
   
```bash
   cd backend
   
```
2. Install dependencies:
   
```bash
   npm install
   
```
3. Set up environment variables in a `.env` file:
   
```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/todoapp
   JWT_SECRET=your_jwt_secret
   
```
4. Start the server:
   
```bash
   npm run dev
   
```

### Frontend Setup
1. Navigate to the `frontend` directory:
   
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

The frontend will run on `http://localhost:5173` and proxy API calls to the backend on `http://localhost:3000`.

## Usage

1. Register a new account or log in.
2. Create tasks with titles, descriptions, priorities, and due dates.
3. Update task statuses as you progress.
4. View analytics for productivity insights.
5. Admins can manage all users' tasks.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -am 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the ISC License.
