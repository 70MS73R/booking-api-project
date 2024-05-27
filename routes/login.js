import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../services/prismaClient.js";

const router = Router();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;

  try {
    // Query user data from the database using PrismaClient
    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, secretKey);
    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
