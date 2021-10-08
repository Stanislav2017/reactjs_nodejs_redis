require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT;
const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const CORS_OPTIONS = { credentials: true, origin: process.env.CLIENT_URL };
const authRoutes = require("./routes/auth.routes");

app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));

app.use("/api/auth", authRoutes);

const start = () => {
  try {
    app.listen(PORT, async () => {
      await mongoose.connect(process.env.DB_URL, DB_OPTIONS);
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
