import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  // likeProject,
} from "../controllers/project.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", auth, createProject);
router.patch("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

export default router;
