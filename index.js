import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import projectRoutes from "./routes/project.js";
import "dotenv/config.js";

const app = express();
dotenv.config();

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/", (req, res) => res.send("SERVER IS WORKING"));

const PORT = process.env.PORT || 8080;

const mongoConnectionUrl = process.env.MONGODB_URI;
if (!mongoConnectionUrl) throw new Error("MONGODB_URI is not defined");

mongoose
  .connect(mongoConnectionUrl)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)),
  )
  .catch((error) => console.log(error));

export default app;
