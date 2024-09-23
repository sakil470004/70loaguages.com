import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import APP_URL from "../../APP_URL";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(`${APP_URL}`, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

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
// ?for vercel
// const socket = io("https://70loaguages-com-b4cb.vercel.app/", {
//   query: {
//     userId: authUser._id,
//   },
// });
