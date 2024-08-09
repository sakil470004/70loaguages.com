import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessages = async (req, res) => {
  try {
    // get all value for sending a message
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      //  user came here first time with this receiver
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // ? SOCKET IO Functionality will go here

    //? save the conversation and newMessage
    // await conversation.save();
    // await newMessage.save();
    // for optimization we can use Promise.all
    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json({ newMessage });
  } catch (error) {
    console.log("Error in sendMessages", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    // get all fields for getting messages
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGE ITSELF

    // if conversation is not found, return empty array
    if (!conversation) return res.status(200).json([]);

    // get messages from conversation
    const messages = conversation.messages;
    // send messages to client
    res.status(200).json(messages);
  } catch {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
