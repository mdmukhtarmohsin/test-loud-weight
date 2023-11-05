const express = require("express");
const trackrouter = express.Router();
const trackController = require("../controllers/trackController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for creating a new track
trackrouter.post(
  "/create",
  upload.single("audioFile"),
  trackController.createTrack
);

// Route for getting a list of all tracks
trackrouter.get("/list", trackController.getTracks);

// Route for getting details of a specific track
trackrouter.get("/detail/:trackId", trackController.getTrackDetail);

// Route for streaming audio of a specific track
trackrouter.get("/stream/:trackId", trackController.streamTrack);

trackrouter.get("/duration/:trackId", trackController.getAudioDuration);

module.exports = trackrouter;
