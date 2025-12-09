// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  ratingCount: {
    type: String,
    default: '0'
  },
  duration: {
    type: String,
    required: true
  },
  genre: [{
    type: String,
    required: true
  }],
  releaseDate: {
    type: Date,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  cast: [{
    type: String,
    required: true
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPremiered: {
    type: Boolean,
    default: false
  },
  isNewRelease:{
    type: Boolean,
    default: false
  },
  trailerUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
movieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;