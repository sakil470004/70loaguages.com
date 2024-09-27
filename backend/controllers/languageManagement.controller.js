import LanguageManagement from "../models/languageManagement.model.js";

export const getAllLanguage = async (req, res) => {
    try {
        //  
        const language = await LanguageManagement.find();
        if (language) {
            res.status(200).json(language);
        } else {
            res.status(404).json([]);
        }

    } catch (error) {
        console.log("Error in languageManagement controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const addLanguage = async (req, res) => {
    try {
        const newLanguage = req.body;

        const language = await LanguageManagement.create(newLanguage);

        res.status(201).json(language);
    } catch (error) {
        console.log("Error in addLanguage", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const updateLanguage = async (req, res) => {
    try {
        const languageId = req.params.id;
        const updatedLanguage = req.body;

        const language = await LanguageManagement.findOneAndUpdate(
            { _id: languageId },
            updatedLanguage,
            { new: true }
        );

        if (language) {
            res.status(200).json(language);
        } else {
            res.status(404).json({ message: "Language not found or not authorized" });
        }

    } catch (error) {
        console.log("Error in updateLanguage", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const deleteLanguage = async (req, res) => {
    try {
        const languageId = req.params.id;

        const language = await LanguageManagement.findOneAndDelete({
            _id: languageId,
        });

        if (language) {
            res.status(200).json({ message: "Language deleted successfully" });
        } else {
            res.status(404).json({ message: "Language not found or not authorized" });
        }

    } catch (error) {
        console.log("Error in deleteLanguage", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// note that this is a dangerous route for testing purposes only
export const addMultipleAllLanguage = async (req, res) => {
    try {
        const newLanguage = req.body;
        const language = await LanguageManagement.insertMany(newLanguage);
        res.status(201).json(language);
    } catch (error) {
        console.log("Error in addMultipleAllLanguage", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
    