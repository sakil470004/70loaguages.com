import App from "../models/app.model.js";
import User from "../models/user.model.js";

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
      const newApp = new App({ bossCommission });

      // check if the user is created successfully
      if (newApp) {
        await newApp.save();

        res.status(201).json(newApp);
      } else {
        res.status(400).json({ error: "Invalid Variable Data data" });
      }
    } else {
      // update existing app data
      appData.bossCommission = bossCommission;
      await appData.save();
      res.status(200).json({ message: "Variable Update Successfully" });
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const setUserCommission = async (req, res) => {
  try {
    const { userCommission, _id } = req.body;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // get all app data and update boss commission
    const appData = await App.find({})[0];
    if (!appData) {
      // create new app
      // create a new user
      const newApp = new App({
        userCommission,
      });

      // check if the user is created successfully
      if (newApp) {
        await newApp.save();

        res.status(201).json(newApp);
      } else {
        res.status(400).json({ error: "Invalid Variable Data data" });
      }
    } else {
      // update existing app data
      appData.userCommission = userCommission;
      await appData.save();
      res.status(200).json({ message: "Variable Update Successfully" });
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
