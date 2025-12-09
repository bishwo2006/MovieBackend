const express = require('express');
const router = express.Router();
const { 
  getHalls, 
  getHallById, 
  getHallsByMovie, 
  getHallAvailability 
} = require("../controllers/hallController.js");

router.get("/", getHalls);
router.get("/:id", getHallById);
router.get("/movie/:movieId", getHallsByMovie);
router.get("/:id/availability", getHallAvailability);

module.exports = router;