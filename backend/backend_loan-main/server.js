const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const cors = require("cors");
const path = require("path");


dotenv.config();


connectDB();


const app = express();


app.use(express.json()); 
app.use(cors()); 


app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
