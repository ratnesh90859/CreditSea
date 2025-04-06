const Application = require("../models/Application");

exports.createApplication = async (req, res) => {
  try {
    const { amount, tenure } = req.body;

    const application = await Application.create({
      user: req.user.id,
      amount,
      tenure,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create application" });
  }
};


exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your applications" });
  }
};


exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};


exports.verifyApplication = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status for verifier" });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update application status" });
  }
};


exports.approveApplication = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status for admin" });
    }

    const application = await Application.findById(req.params.id);

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.status !== "verified") {
      return res
        .status(400)
        .json({
          message:
            "Only verified applications can be approved or rejected by admin",
        });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Admin failed to update application" });
  }
};
