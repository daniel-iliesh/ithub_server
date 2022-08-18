import mongoose from "mongoose";
import Project from '../models/project.js';

export const getProjects = async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createProject = async (req, res) => {
  const project = req.body;

  const newProject = new Project({ ...project, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updateProject = async (req, res) => {
  const project = req.body;
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No project with that id");
  const updatedProject = await Project.findByIdAndUpdate(
    _id,
    { ...project, _id },
    { new: true }
  );
  res.json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No project with that id");
  await Project.findByIdAndDelete(id);

  res.json({ message: "Project deleted successufully" });
};
