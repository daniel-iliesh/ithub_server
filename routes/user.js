import express from "express";
import { signIn, signUp, getUsers, updateUser, deleteUser, followUser, unfollowUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/:id", updateUser);
router.post("/:id/:followingId/follow", followUser);
router.post("/:id/:unfollowingId/unfollow", unfollowUser);
router.delete("/:id", deleteUser);

export default router;
