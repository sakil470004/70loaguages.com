//? this file is for control app core functions and it will be only given access to admin
import mongoose from "mongoose";
// filed and it's default value
// fullName
// username
// password
// gender
// referredBy (userId)
// commissions (array of userIds)
const appSchema = new mongoose.Schema(
  {
    // this is for percentage of commission for mer user merchant
    userCommission: {
      type: Number,
      required: true,
      default: 0,
    },
    // this is for percentage of commission for boss
    bossCommission: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const App = mongoose.model("App", appSchema);

export default App;
