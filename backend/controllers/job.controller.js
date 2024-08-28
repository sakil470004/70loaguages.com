import Job from "../models/job.model.js";
import User from "../models/user.model.js";

export const getAllJob = async (req, res) => {
  try {
    // get all job data
    let jobArray = await Job.find();
    if (jobArray.length === 0) {
      res.status(200).json({ message: "No Job Found" });
    } else {
      // job data found
      res.status(200).json(jobArray);
    }
  } catch (error) {
    console.log("Error in job controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentJob = async (req, res) => {
  try {
    // get id from params
    let { id } = req.params;
    // get current job data
    let currentJob = await Job.findOne({ _id: id });
    if (!currentJob) {
      res.status(200).json({ message: "No Job Found" });
    } else {
      // job data found
      res.status(200).json(currentJob);
    }
  } catch (error) {
    console.log("Error in job controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// get current User job => user id will send in the params
export const getCurrentUserJob = async (req, res) => {
  try {
    // get all job data
    let { userId } = req.params;
    let jobArray = await Job.find({ posterId: userId });
    if (jobArray.length === 0) {
      res.status(200).json({ message: "No Job Found" });
    } else {
      // job data found
      res.status(200).json(jobArray);
    }
  } catch (error) {
    console.log("Error in job controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addJob = async (req, res) => {
  try {
    // get object from body
    let job = req.body;
    // create new job
    let newJob = new Job(job);
    // save job
    if (!newJob) {
      res.status(400).json({ message: "Job not created" });
    }
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.log("Error in job controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
