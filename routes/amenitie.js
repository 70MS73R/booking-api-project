import express from "express";
import createAmenity from "../services/amentities/createAmenitie.js";
import getAmenities from "../services/amentities/getAmenitie.js";
import getAmenityById from "../services/amentities/getAmenitieById.js";
import updateAmenityById from "../services/amentities/updateAmenitieById.js";
import deleteAmenityById from "../services/amentities/deleteAmenitie.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve amenities" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, propertyId } = req.body;
    const newAmenity = await createAmenity(name, propertyId);
    res.status(201).json(newAmenity);
  } catch (error) {
    if (error.message.includes("required")) {
      res.status(400).json({ error: "Required fields are missing" });
    } else {
      res.status(400).json({ error: "Failed to create amenity" });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);
    if (!amenity) {
      res.status(404).json({ error: "Amenity not found" });
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve amenity" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, propertyId } = req.body;
    const updatedAmenity = await updateAmenityById(id, name, propertyId);
    res.status(200).json(updatedAmenity);
  } catch (error) {
    if (error) {
      res.status(404).json({ error: "Amenity not found" });
    }
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAmenityId = await deleteAmenityById(id);
    res
      .status(200)
      .json({ message: `Amenity with id ${deletedAmenityId} was deleted!` });
  } catch (error) {
    if (error) {
      res.status(404).json({ error: "Amenity not found" });
    }
  }
});

export default router;
