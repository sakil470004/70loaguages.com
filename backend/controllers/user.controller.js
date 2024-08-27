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
export const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
console.log(userId)
    const user = await User.findOne({_id : userId});

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
