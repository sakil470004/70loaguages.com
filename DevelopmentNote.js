// vercel link 

//! In frontend/vite.config.js file
//? For local
// target: 'http://localhost:5000',
//? For production
// target: 'https://seven0loaguages-com.onrender.com',
//? for vercel
// target: 'https://70loaguages-com-b4cb.vercel.app/',

//! In frontend/src/context/SocketContext.jsx file
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
// ?for vercel
// const socket = io("https://70loaguages-com-b4cb.vercel.app/", {
//   query: {
//     userId: authUser._id,
//   },
// });


const liveLink= "https://seven0loaguages-com.onrender.com"
const localLink= "http://localhost:5000"
const vercelLink= "https://70loaguages-com-b4cb.vercel.app/"

// (optional) it not needed if you are using the default port
//! In backend/socket/socket.js file
//? For local
// origin: ["http://localhost:3000"],
//? For production
// origin: ["https://seven0loaguages-com.onrender.com"],
//? for vercel
// origin: ["https://70loaguages-com-b4cb.vercel.app/"],