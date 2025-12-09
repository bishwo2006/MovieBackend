// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  hallId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  showDate: {
    type: String,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  seats: {
    type: Array,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending'],
    default: 'confirmed'
  },
  paymentMethod: {
    type: String,
    enum: ['esewa', 'khalti', 'paypal', 'cash'],
    required: true
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;