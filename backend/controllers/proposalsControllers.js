const fs = require("fs-extra");
const path = require("path");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const acceptedJobs = require("../models/job");
const jobJsonPath = path.join(__dirname, "../data/data.json");

const getJobs = async () => {
  const buffer = await fs.readFile(jobJsonPath);
  console.log(buffer);
  return JSON.parse(buffer.toString());
};

// Job proposals   =>   /api/proposals
exports.getJobProposals = catchAsyncErrors(async (req, res, next) => {
  res.send(await getJobs());

  res.status(200).json({
    success: true,
    message: "Here is all job proposals"
  });
});

//Delete jobproposals =>   /api/proposals/:id
exports.deleteJobProposals = catchAsyncErrors(async (req, res, next) => {
  const job = await getJobs();
  const jobToBeSaved = job.filter(x => x.id !== req.params.id);
  if (jobToBeSaved.length === job.length) {
    res.status(404).send("Cannot find job");
  } else {
    await fs.writeFile(jobJsonPath, JSON.stringify(jobToBeSaved));
    res.send("Deleted");
  }
});

//Save job proposals =>   /api/proposals/:id
exports.saveJobProposals = catchAsyncErrors(async (req, res, next) => {
  const savedJobs = await acceptedJobs.create(req.body);
  res.status(201).json({
    success: true,
    savedJobs
  });
});
