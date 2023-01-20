import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import projectRoutes from "./routes/project.js";

const app = express();
dotenv.config();

// const configCors = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: true,
//   optionsSuccessStatus: 200,
// };
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://ithub-mocha.vercel.app"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Routes
app.use("/post", postRoutes);
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/", (req, res) => res.send("SERVER IS WORKING"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

export default app;
