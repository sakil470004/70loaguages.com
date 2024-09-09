//! AWS public link 
// server : http://3.25.92.116/ 
// static site : http://70language.s3-website-ap-southeast-2.amazonaws.com/
//! vercel link 
// backend : https://70loaguages-server.vercel.app/
// frontend : https://70loaguages-frontend.vercel.app/


//! In frontend/vite.config.js file
//? For local
// target: 'http://localhost:5000',
//? For production
// target: 'https://seven0loaguages-com.onrender.com',
//? for vercel //backend
// target: 'https://70loaguages-server.vercel.app/',

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
// ?for vercel //backend link
// const socket = io("https://70loaguages-server.vercel.app/", {
//   query: {
//     userId: authUser._id,
//   },
// });


const liveLink= "https://70loaguages-frontend.vercel.app/"
const localLink= "http://localhost:5000"
const vercelLink= "https://70loaguages-com-b4cb.vercel.app/"

// (optional) it not needed if you are using the default port
//! In backend/socket/socket.js file
//? For local
// origin: ["http://localhost:3000"],
//? For production
// origin: ["https://seven0loaguages-com.onrender.com"],
//? for vercel //frontend link
// origin: ["https://70loaguages-frontend.vercel.app/"],

//! delete package.json line 
//   "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"