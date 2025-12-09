const Hall = require("../models/Hall.js");

// Get all halls
exports.getHalls = async (req, res) => {
  try {
    const halls = await Hall.find();
    res.json(halls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching halls", error });
  }
};

// Get hall by ID
exports.getHallById = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ message: "Hall not found" });

    res.json(hall);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hall", error });
  }
};

// Get halls by movie ID (fake filter for now — modify later)
exports.getHallsByMovie = async (req, res) => {
  try {
    const halls = await Hall.find(); // later filter using movie-hall mapping
    res.json(halls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching halls for movie", error });
  }
};

// Get hall availability (for your Flutter page)
exports.getHallAvailability = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);

    if (!hall) return res.status(404).json({ message: "Hall not found" });

    const availableSeats = hall.totalSeats - hall.bookedSeats;

    res.json({
      hallId: hall._id,
      available: availableSeats > 0,
      availableSeats: Array.from({ length: availableSeats }, (_, i) => i + 1),
      showTimes: hall.showTimes,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching availability", error });
  }
};
