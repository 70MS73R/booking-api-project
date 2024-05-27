import express from "express";
import createUser from "../services/users/createUser.js";
import getUsers from "../services/users/getUser.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";
import getUsersByUsername from "../services/users/userByUsername.js";
import getUsersByEmail from "../services/users/userByEmail.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all users or by username or email
router.get("/", async (req, res) => {
  const { username, email } = req.query;

  if (username) {
    const users = await getUsersByUsername(username);
    res.status(200).json(users);
  } else if (email) {
    const users = await getUsersByEmail(email);
    res.status(200).json(users);
  } else {
    // If no query parameters provided, get all users
    const users = await getUsers();
    res.status(200).json(users);
  }
});

// POST a new user
router.post("/", authMiddleware, async (req, res) => {
  const { username, password, name, email, phoneNumber, profilePicture } =
    req.body;
  try {
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    // If user creation fails due to missing required fields or other issues
    if (error) {
      res.status(400).json({ error: "Required fields are missing" });
    }
  }
});

// GET a user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log("application crashed:", error);
  }
});

// PUT update a user by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { username, password, name, email, phoneNumber, profilePicture } =
    req.body;
  try {
    const updatedUser = await updateUserById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error) {
      res.status(404).json({ error: "updating user failed" });
    }
  }
});

// DELETE a user by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    // Check if user exists before attempting to delete
    const deletedUserId = await deleteUser(id);
    res.status(200).json({
      message: `User with id ${deletedUserId} was deleted!`,
    });
  } catch (error) {
    // If user does not exist, return 404 with error message
    if (error) {
      res.status(404).json({ error: "User not found" });
    }
  }
});

export default router;
