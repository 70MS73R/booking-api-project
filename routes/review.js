import express from "express";
import createReview from "../services/reviews/createReview.js";
import getReviews from "../services/reviews/getReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReview.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ error: "Failed to retrieve reviews" });
  }
});

// POST a new review
router.post("/", authMiddleware, async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;
  try {
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    if (error) {
      res.status(400).json({ error: "Required fields are missing" });
    }
  }
});

// GET a review by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await getReviewById(id);
    if (!review) {
      res.status(404).json({ error: "Review not found" });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    res.status(404).json({ error: "Failed to retrieve review" });
  }
});

// PUT update a review by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { userId, propertyId, rating, comment } = req.body;
  try {
    const updatedReview = await updateReviewById(
      id,
      userId,
      propertyId,
      rating,
      comment
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    if (error) {
      res.status(404).json({ error: "Review not found" });
    }
  }
});

// DELETE a review by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReviewId = await deleteReviewById(id);
    res
      .status(200)
      .json({ message: `Review with id ${deletedReviewId} was deleted!` });
  } catch (error) {
    if (error) {
      res.status(404).json({ error: "Review not found" });
    }
  }
});

export default router;
