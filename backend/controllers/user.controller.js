import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import { transporter } from "../server.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // get current logged in user id
    const loggedInUserId = req.user._id;

    // get all users except the logged in user// remove password from the response
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.admin = true;
    await user.save();

    res.status(200).json({ message: "User is now an admin" });
  } catch (error) {
    console.log("Error in makeAdmin controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const referUser = async (req, res) => {
  try {
    const { newUserId, commissionsUserId } = req.body;
    const commissionsUser = await User.findOne({ _id: commissionsUserId });
    if (!commissionsUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const isAlreadyReferred = commissionsUser.commissions.includes(newUserId);
    if (isAlreadyReferred) {
      return res.status(400).json({ message: "User already referred" });
    }
    // get newUser by newUserId
    const newUser = await User.findOne({ _id: newUserId });
    if (!newUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // check if user is already referred
    if (newUser.referredBy) {
      return res.status(400).json({ message: "User already referred" });
    }
    // update commissions array . push newUserId to commissions array
    commissionsUser.commissions.push(newUserId);
    await commissionsUser.save();

    // add referredBy filed using commissionsUserId
    newUser.referredBy = commissionsUserId;
    await newUser.save();

    res.status(200).json({ message: "User referred successfully" });
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    // console.log(adminId)
    const user = await User.findById({_id:adminId});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ admin: user.admin });
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const myReferredUsers = async (req, res) => {
  try {
    const { currentId } = req.params;
    const user = await User.findOne({ _id: currentId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // get all users that have been referred by the current user
    const referredUsers = await User.find({ referredBy: currentId });
    res.status(200).json(referredUsers);
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // get current user by id
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const sendReferByEmail = async (req, res) => {
  try {
    const data = req.body;

    const mailOptions = await {
      from: {
        name: "Referral App",
        address: data?.referrerEmail,
      },
      to: data?.refereeEmail,
      subject: "You have been referred!",
      text: `Hi New User,\n\n${data?.referrerName} has referred you to our app 70Language. Click on the link below to sign up.\n\n${data?.link}\n\nThanks`,
    };
   const result= await transporter.sendMail(mailOptions);
    res.json({ message: "Referral Send SuccessFully", data: result }); // Send the created user object as a response
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
