import mongoose from "mongoose";

const languageManagementSchema = new mongoose.Schema(
  {
    languageCode:{
      type: String,
      required: true,
      trim: true,
    },
    englishName:{
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    nativeName:{
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    writingSystem:{
      type: String,
      required: true,
      trim: true,
    },
    countryCodes:{
      type: [String],
      required: true,
      validate: [arrayLimit, "countryCodes must not be empty"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Helper function to validate array length
function arrayLimit(val) {
  return val.length > 0;
}

const LanguageManagement = mongoose.model("LanguageManagement", languageManagementSchema);
export default LanguageManagement;
