import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());


const server = http.createServer(app);
// create new server based on port of the frontend server
// for the cors policy, we need to specify the origin of the frontend server
// and the methods that are allowed
const io = new Server(server, {
  cors: {
    // get allowed origin from all urls 
    // get from all the origins
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// get the socket id of the receiver based on the receiverId
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// stored the userId and socketId in a map
const userSocketMap = {}; // {userId: socketId}

// io.on() is used to listen to the events. can be used both on client and server side
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  //   socket.handshake.query is used to get the query parameters from the client side
  const userId = socket.handshake.query.userId;
  // if the userId is not undefined, then store the userId and socketId in the map // add new user to the map
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side// when the user disconnects, delete the userId from the map
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };

// (optional) it not needed if you are using the default port
//! In backend/socket/socket.js file
//? For local
// origin: ["http://localhost:3000"],
//? For production
// origin: ["https://seven0loaguages-com.onrender.com"],
//? for vercel
// origin: ["https://70loaguages-com-b4cb.vercel.app/"],
