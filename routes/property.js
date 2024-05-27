import express from "express";
import createProperty from "../services/properties/createProperties.js";
import getProperties from "../services/properties/getProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deleteProperty.js";
import getPropertiesByQuery from "../services/properties/getPropertiesByQuery.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Check if the query object is empty
    if (Object.keys(req.query).length === 0) {
      // Retrieve all properties if no query parameters are present
      const properties = await getProperties();
      if (properties.length === 0) {
        res.status(404).json({ error: "No properties found" });
      } else {
        res.status(200).json(properties);
      }
    } else {
      // Extract query parameters
      const { location, pricePerNight } = req.query;

      // Retrieve properties based on query parameters
      const properties = await getPropertiesByQuery({
        location,
        pricePerNight: parseFloat(pricePerNight), // Ensure pricePerNight is a number
      });

      if (properties.length === 0) {
        res.status(404).json({ error: "No properties found" });
      } else {
        res.status(200).json(properties);
      }
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Failed to retrieve properties" });
  }
});

// POST a new property
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      amenities,
    } = req.body;
    const newProperty = await createProperty(
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      amenities
    );
    res.status(201).json(newProperty);
  } catch (error) {
    if (error.message.includes("required")) {
      res.status(400).json({ error: "Required fields are missing" });
    } else {
      res.status(400).json({ error: "Failed to create property" });
    }
  }
});

// GET a property by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string" || id.trim() === "") {
      // Check if the ID is valid
      res.status(400).json({ error: "Id should be a non-empty string" });
      return;
    }

    const property = await getPropertyById(id);
    if (!property) {
      // If property is not found, return a 404 status code
      res.status(404).json({ error: "Property not found" });
    } else {
      // If property is found, return a 200 status code
      res.status(200).json(property);
    }
  } catch (error) {
    // Handle any other errors with a 500 status code
    res.status(500).json({ error: "Failed to retrieve property" });
  }
});

// PUT update a property by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      amenities,
    } = req.body;
    const updatedProperty = await updatePropertyById(
      id,
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      amenities
    );
    if (!updatedProperty) {
      res.status(404).json({ error: "Property not found" });
    } else {
      res.status(200).json(updatedProperty);
    }
  } catch (error) {
    res.status(404).json({ error: "Failed to update property" });
  }
});

// DELETE a property by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPropertyId = await deletePropertyById(id);
    res
      .status(200)
      .json({ message: `Property with id ${deletedPropertyId} was deleted!` });
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ error: "Property not found" });
    } else {
      res.status(500).json({ error: "Failed to delete property" });
    }
  }
});

export default router;
