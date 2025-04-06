const express = require("express");
const router = express.Router();
const {
  createApplication,
  getMyApplications,
  getAllApplications,
  verifyApplication,
  approveApplication,
} = require("../controllers/applicationController");

const { protect, authorizeRoles } = require("../middleware/auth");

// User: Submit and view their own applications
router.post("/", protect, authorizeRoles("user"), createApplication);
router.get("/my", protect, authorizeRoles("user"), getMyApplications);

// Admin: View all applications
router.get("/", protect, authorizeRoles("admin"), getAllApplications);

// Verifier: Verify or reject application
router.patch(
  "/:id/verify",
  protect,
  authorizeRoles("verifier"),
  verifyApplication
);

// Admin: Approve or reject verified applications
router.patch(
  "/:id/approve",
  protect,
  authorizeRoles("admin"),
  approveApplication
);

module.exports = router;
