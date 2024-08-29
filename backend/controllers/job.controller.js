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
      res.status(200).json({ message: "No Job Posted" });
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
export const deleteJob = async (req, res) => {
  try {
    //  get id from params
    let { id } = req.params;
    // find job by id and delete
    let job = await Job.findByIdAndDelete(id);
    if (!job) {
      res.status(400).json({ message: "Job not found" });
    } else {
      res.status(200).json({ message: "Job Deleted" });
    }
  } catch (error) {
    console.log("Error in job controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    //  get id from params
    let { id } = req.params;
    // get updated job object
    let job = req.body;
    // find job using id and update
    let updatedJob = await Job.findByIdAndUpdate(id, job, {
      new: true,
    });
    if (!updatedJob) {
      res.status(400).json({ message: "Job not found" });
    } else {
      res.status(200).json({ ...updatedJob, message: "Job Updated" });
    }
  } catch (error) {
    console.log("Error in job controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
