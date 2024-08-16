import User from "../models/user.model.js";

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
