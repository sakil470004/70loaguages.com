import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const res = await fetch("https://70loaguages-server.vercel.app/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      //   local storage
      localStorage.removeItem("chat-user");
      // update context
      setAuthUser(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
    return { loading, logout };
};

export default useLogout;
