const mongoose = require("mongoose");

const HallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  priceRange: {
    min: { type: Number, default: 200 },
    max: { type: Number, default: 500 },
  },
  totalSeats: { type: Number, default: 100 },
  bookedSeats: { type: Number, default: 0 },
  amenities: { type: [String], default: [] },
  isIMAX: { type: Boolean, default: false },
  isDolbyAtmos: { type: Boolean, default: false },
  hasReclinerSeats: { type: Boolean, default: false },
  hasFoodService: { type: Boolean, default: false },
  distance: { type: Number, default: 0.0 },
  showTimes: { type: [String], default: [] },
});

const Hall = mongoose.model("Hall", HallSchema);
module.exports = Hall;