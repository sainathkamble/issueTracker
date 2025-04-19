# Issue Tracker

A modern web application for tracking issues, managing projects, and coordinating teams.

## Features

- Dashboard with project and issue overview
- Issue tracking with filtering and search
- Project management with progress tracking
- Team management with member assignments
- Modern, responsive UI built with Material-UI

## Tech Stack

- Frontend:
  - React with TypeScript
  - Material-UI for components
  - React Router for navigation
  - Axios for API calls

- Backend:
  - Node.js with Express
  - MongoDB for database
  - JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sainathkamble/issueTracker.git
   cd issue-tracker
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 