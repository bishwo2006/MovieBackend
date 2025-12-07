const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  review: String,
  rating: Number
}, { _id: false });

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  posterUrl: String,
  genre: String,
  cast: [String],
  language: String,
  length: Number,
  rating: Number,
  reviews: [reviewSchema],
  ticketPrice: { type: Number, default: 0 },

  // ⭐ New fields you requested
  newRelease: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  premier: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
