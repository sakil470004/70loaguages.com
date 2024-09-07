import {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import APP_URL from "../../APP_URL";
import {  useAuthContext } from "../context/AuthContext";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const {authUser}=useAuthContext()

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${APP_URL}/api/users/${authUser._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        // set conversation
        setConversations(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [authUser._id]);

  return { loading, conversations };
};

export default useGetConversation;
