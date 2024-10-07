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
    //  tier1 is object is has commission and number of user
    tier1: {
      commission: {
        type: Number,
        required: true,
        default: 0,
      },
      numberOfUser: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    //  tier2 is object is has commission and number of user
    tier2: {
      commission: {
        type: Number,
        required: true,
        default: 0,
      },
      numberOfUser: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    //  tier3 is object is has commission and number of user
    tier3: {
      commission: {
        type: Number,
        required: true,
        default: 0,
      },
      numberOfUser: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    // sale Rep Commission 
    saleRepCommission: {
      initialCommission: {
        type: Number,
        required: true,
        default: 0,
      },
      midTimeCommission: {
        type: Number,
        required: true,
        default: 0,
      }
      ,
      finalCommission: {
        type: Number,
        required: true,
        default: 0,
      }
      
    },
    // 
  },
  { timestamps: true }
);

const App = mongoose.model("App", appSchema);

export default App;
