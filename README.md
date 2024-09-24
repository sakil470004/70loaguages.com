# Project Name

## Tech Stack

### Frontend
- **Library**: React
- **Styling**: Tailwind CSS, Daisy UI
- **Icons**: React-icons
- **Real-time Communication**: Socket.io

### Backend
- **Library**: Node.js, Express.js
- **Real-time Communication**: Socket.io
- **Email**: Nodemailer

### Database
- **Database**: MongoDB

## Project Structure

### Frontend
- **dist**: Deployed folder
- **node_modules**: All frontend node modules
- **public**: Public assets
- **src**: All of the code
  - **pages**: All pages like home, dashboard, chat
  - **App.jsx**: Root of all routes
  - **context**: All app contexts
  - **APP_URL**: Change backend link when deploying

### Backend
- **controllers**: Functions triggered by specific routes
- **db**: Database connection
- **middleware**: Middleware functions
- **models**: All database models
- **node_modules**: All backend node modules
- **routes**: All backend routes
- **socket**: For live chat communication
- **utils**: Utility functions (e.g., generate token)
- **DevelopmentNode**: Personal deployment node
- **index.js**: Runs `server.js` (required for free deployment servers)
- **server.js**: Starting point of the backend app
- **.env**: Environment variables

## Build Instructions

### Frontend
1. Change the `APP_URL` file to the backend link if needed.
2. Navigate to the frontend directory:
3. install dependency
4. Now, run build command
   ```sh
   cd frontend
   npm install
   npm run build
   ```

### Backend
1. Navigate to the backend directory:
2. Install dependencies:
3. Start Server
   ```sh
   cd backend
   npm install
   npm start
   ```