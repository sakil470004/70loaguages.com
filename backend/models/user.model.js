import mongoose from "mongoose";
// filed and it's default value
// fullName
// username
// password
// gender
// referredBy (userId)
// commissions (array of userIds)
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },

    profilePic: {
      type: String,
      default: "",
    },
    //  language type array and default value is empty array
    languages: [
      {
        type: String,
        default: [],
      },
    ],
    // language proficiency type array and default value is empty array
    languageProficiency: [
      {
        type: String,
        default: [],
      },
    ],
    // translation year of experience type number and default value is 0
    translationYearOfExperience: {
      type: Number,
      default: 0,
    },
    // certification type array of object and default value is empty array
    certification: [
      {
        name: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
      },
    ],

    // for commission based system
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      default: null,
    },
    commissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    admin: {
      type: Boolean,
      default: false,
    },
    // createdAt, updatedAt => Member since <createdAt>
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
