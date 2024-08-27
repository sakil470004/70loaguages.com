import App from "../models/app.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // get current logged in user id
    const loggedInUserId = req.user._id;

    // get all users except the logged in user// remove password from the response
    const filteredUsers = await App.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const setBossCommission = async (req, res) => {
  try {
    const { bossCommission, _id } = req.body;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // get all app data and update boss commission
    const appData = await App.find({})[0];
    if (!appData) {
      // create new app
      // create a new user
      const newApp = new User({});

      // check if the user is created successfully
      if (newApp) {
        await newApp.save();

        res.status(201).json(newApp);
      } else {
        res.status(400).json({ error: "Invalid Variable Data data" });
      }
    } else {
      // update existing app data
      appData.bossCommission = true;
      await appData.save();
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const setUserCommission = async (req, res) => {
  try {
    const {  userCommission, _id } = req.body;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // get all app data and update boss commission
    const appData = await App.find({})[0];
    if (!appData) {
      // create new app
      // create a new user
      const newApp = new User({});

      // check if the user is created successfully
      if (newApp) {
        await newApp.save();

        res.status(201).json(newApp);
      } else {
        res.status(400).json({ error: "Invalid Variable Data data" });
      }
    } else {
      // update existing app data
      appData.bossCommission = true;
      await appData.save();
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
