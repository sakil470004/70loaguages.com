//! In frontend/vite.config.js file
//? For local
// target: 'http://localhost:5000',
//? For production
// target: 'https://seven0loaguages-com.onrender.com',

//! In frontend/src/SocketContext.jsx file
//? For local
// const socket = io("http://localhost:5000", {
//   query: {
//     userId: authUser._id,
//   },
// });
//? For production
// const socket = io("https://seven0loaguages-com.onrender.com", {
//   query: {
//     userId: authUser._id,
//   },
// });

const liveLink= "https://seven0loaguages-com.onrender.com"
// (optional) it not needed if you are using the default port
//! In backend/socket/socket.js file
//? For local
// origin: ["http://localhost:3000"],
//? For production
// origin: ["https://seven0loaguages-com.onrender.com"],