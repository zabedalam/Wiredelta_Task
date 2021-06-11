const mongoose = require("mongoose");
const validator = require("validator");


const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 characters"]
  },
  boat_type: {
    type: String,
    required: [true, "Please enter your Boat type"],
    maxLength: [30, "Your name cannot exceed 30 characters"]
  },
  service: {
    type: String,
    required: [true, "Please enter your service"],
    maxLength: [50, "Your name cannot exceed 50 characters"]
  },
  review: {
    type: String,
    required: [true, "Please enter your review"],
    maxLength: [100, "Your name cannot exceed 100 characters"]
  },
  job_type: {
    type: String,
    required: [true, "Please enter your job type"],
    maxLength: [30, "Your name cannot exceed 30 characters"]
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  }
 
})


module.exports = mongoose.model("Job", jobSchema);
