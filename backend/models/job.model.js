import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    // source language name
    // note : need to remove default value after db update
    sourceLanguageName: {
      type: String,
      required: true,
      default: "english",
    },

    languageName: {
      type: String,
      required: true,
    },
    languageCost: {
      type: Number,
      required: true,
      min: 0,
    },
    languageWord: {
      type: Number,
      required: true,
      min: 0,
    },
    // const Complexity level "basic", "intermediate", "advanced"
    complexityLevel: {
      type: String,
      required: true,
      enum: ["basic", "intermediate", "advanced"],
    },
    // required certification boolean
    requiredCertification: {
      type: Boolean,
      required: true,
      default: false,
    },
    category:{
      type: String,
      required: true,
      default: "General",
    },

    deadline: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 0, // Ensure budget is not negative
    },
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // job taker id
    takerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // default [] no attachment yet
    attachments: [
      {
        type: String, // Store file URLs or paths
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed", "Closed"],
      default: "Open",
    },
    // payment status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    // payment id
    paymentId: {
      type: String,
      default: null,
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

const Job = mongoose.model("Job", jobSchema);
export default Job;
