
import Languagecost from "../models/languagecost.model.js";

export const getAllLanguageCost = async (req, res) => {
  try {
    // get all language cost data
    let languageCostArray = await Languagecost.find();
    if (languageCostArray.length === 0) {
      res.status(200).json([]);
    } else {
      // language cost data found
      res.status(200).json(languageCostArray);
    }
  } catch (error) {
    console.log("Error in Language Cost controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addLanguageCost = async (req, res) => {
  try {
    // get object from body
    let languageCost = req.body;
    // get all language cost data
    let languageCostOld = await Languagecost.findOne({
      languageName: languageCost?.languageName,
    });
    if (!languageCostOld) {
      // create new language cost
      let newLanguageCost = new Languagecost(languageCost);
      await newLanguageCost.save();
      res.status(200).json({ message: "Language Cost Added" });
    } else {
      res.status(200).json({ message: "Language Cost Already Exist" });
    }
  } catch (error) {
    console.log("Error in Language Cost controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editLanguageCost = async (req, res) => {
  try {
    // get current object from body
    let languageCost = req.body;
    //  get id from  body :
    let { _id } = languageCost;
    // find languageCost using id and update
    let updatedLanguageCost = await Languagecost.findByIdAndUpdate(_id, languageCost, {
      new: true,
    });
    if (!updatedLanguageCost) {
      res.status(400).json({ message: "Language Cost Cannot Updated" });
    } else {
      res.status(200).json({ ...updatedLanguageCost, message: "Current Language Cost Updated" });
    }
  } catch (error) {
    console.log("Error in Language Cost controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteLanguageCost = async (req, res) => {
  try {
    // get current object from body
    let languageCost = req.body;
    //  get id from  body :
    let { _id } = languageCost;
    // find languageCost using id and update
    let deletedLanguageCost = await Languagecost.findByIdAndDelete(_id);
    if (!deletedLanguageCost) {
      res.status(400).json({ message: "Language Cost Cannot deleted" });
    } else {
      res.status(200).json({ ...deletedLanguageCost, message: "Current Language Cost Deleted" });
    }
  } catch (error) {
    console.log("Error in Language Cost controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
