import express from "express";
import createHost from "../services/hosts/createHost.js";
import getHosts from "../services/hosts/getHost.js";
import getHostById from "../services/hosts/getHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHost.js";
import getHostByName from "../services/hosts/getHostByName.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    let hosts;
    if (name) {
      // Decode the name parameter to handle URL encoding (e.g., spaces encoded as '+')
      const decodedName = decodeURIComponent(name.replace(/\+/g, " "));
      hosts = await getHostByName(decodedName);
    } else {
      hosts = await getHosts();
    }

    if (!hosts || hosts.length === 0) {
      res.status(404).json({ error: "No hosts found" });
    } else {
      res.status(200).json(hosts);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve hosts" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    if (!username || !password || !name || !email) {
      res.status(400).json({ error: "Required fields are missing" });
      return;
    }

    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create host" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);
    if (!host) {
      res.status(404).json({ error: "Host not found" });
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve host" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const updatedHost = await updateHostById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    if (!updatedHost) {
      res.status(404).json({ error: "Host not found" });
    } else {
      res.status(200).json(updatedHost);
    }
  } catch (error) {
    res.status(404).json({ error: "Failed to update host" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHostId = await deleteHostById(id);
    res
      .status(200)
      .json({ message: `Host with id ${deletedHostId} was deleted!` });
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ error: "Host not found" });
    } else {
      res.status(500).json({ error: "Failed to delete host" });
    }
  }
});

export default router;
