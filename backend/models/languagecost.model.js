import mongoose from "mongoose";
// filed and it's default value
// fullName
// username
// password
// gender
// referredBy (userId)
// commissions (array of userIds)
const languagecostSchema = new mongoose.Schema(
  {
    languageName: {
      type: String,
      required: true,
      unique: true,
    },
    languageCost: {
      type: Number,
      required: true,
      min: 0,
    },
    // createdAt, updatedAt => Member since <createdAt>
  },
  { timestamps: true }
);

const Languagecost = mongoose.model("Languagecost", languagecostSchema);

export default Languagecost;
