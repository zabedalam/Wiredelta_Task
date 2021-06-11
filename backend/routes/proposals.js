const express = require("express");
const router = express.Router();
const {
  getJobProposals,
  deleteJobProposals,
  saveJobProposals
} = require("../controllers/proposalsControllers");
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/auth");

router.route("/jobs").get(getJobProposals);
router.route("/jobs/:id").delete(isAuthenticatedUser,authorizeRoles('admin'), deleteJobProposals);
router.route("/jobs/:id").post(isAuthenticatedUser,authorizeRoles('admin'), saveJobProposals);

module.exports = router;
