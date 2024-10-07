import App from "../models/app.model.js";
import User from "../models/user.model.js";


const demoAppObject= { userCommission: 0, bossCommission: 0, tier1: { commission: 0, numberOfUser: 0 }, tier2: { commission: 0, numberOfUser: 0 }, tier3: { commission: 0, numberOfUser: 0 } ,saleRepCommission: { initialCommission: 0,midTimeCommission:0,finalCommission:0}};
export const setBossCommission = async (req, res) => {
  try {
    const { bossCommission } = req.body;

    // get all app data and update boss commission
    let appData = await App.find();
    // convert appData to array
    appData = await appData[0];
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
    const { userCommission } = req.body;

    // get all app data and update user commission
    let appData = await App.find();
    // convert appData to array
    appData = await appData[0];
    // console.log(appData);
    if (!appData) {
      // create new app
      // create a new user
      const newApp = new App({
        userCommission,
        message: "Variable Update Successfully",
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

export const getVariables = async (req, res) => {
  try {
    let appData = await App.find();
    // convert appData to array
    appData = await appData[0];
    // console.log(appData);
    if (!appData) {
      res.status(200).json(demoAppObject);
    } else {
      // update existing app data
      res.status(200).json(appData);
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const setTier1 = async (req, res) => {
  try {
    let appData = await App.find();
    // convert appData to array
    appData = await appData[0];
    // console.log(appData);
    if (!appData) {
      res.status(200).json(demoAppObject);
    } else {
      // update existing app data
      appData.tier1 = req.body;
      await appData.save();
      res.status(200).json({ message: "Variable Update Successfully" });
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const setTier2 = async (req, res) => {
  try {
    let appData = await App.find();
    // convert appData to array
    appData = await appData[0];
    // console.log(appData);
    if (!appData) {
      res.status(200).json(demoAppObject);
    } else {
      // update existing app data
      appData.tier2 = req.body;
      await appData.save();
      res.status(200).json({ message: "Variable Update Successfully" });
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const setTier3 = async (req, res) => {
  try {
    let appData = await App.find();
    // convert appData to array
    appData = await appData[0];
    // console.log(appData);
    if (!appData) {
      res.status(200).json(demoAppObject);
    } else {
      // update existing app data
      appData.tier3 = req.body;
      await appData.save();
      res.status(200).json({ message: "Variable Update Successfully" });
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateSellsRefCommission = async (req, res) => {
  try {
    let appData = await App.find();
    // convert appData to array
    appData = await appData[0];
    // console.log(appData);
    if (!appData) {
      res.status(200).json(demoAppObject);
    } else {
      // update existing app data
      appData.saleRepCommission = req.body;
      await appData.save();
      res.status(200).json({ message: "Variable Update Successfully" });
    }
  } catch (error) {
    console.log("Error in app controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
