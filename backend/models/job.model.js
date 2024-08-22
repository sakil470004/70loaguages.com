import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    languagePair: {
      type: [String],
      required: true, // e.g., ["English", "Spanish"]
      validate: [arrayLimit, 'Language pair should be a non-empty array']
    },
    jobType: {
      type: String,
      enum: ['Translation', 'Interpretation', 'Transcription', 'Localization'],
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    budget: {
      type: Number,
      required: true,
      min: 0 // Ensure budget is not negative
    },
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    attachments: [{
      type: String // Store file URLs or paths
    }],
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Completed', 'Closed'],
      default: 'Open'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Helper function to validate array length
function arrayLimit(val) {
  return val.length > 0;
}

const Job = mongoose.model("Job", jobSchema);
export default Job;
