const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  hallName: {
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
    type: [Number],
    required: true,
    min: 1
  },
  seatNumbers: {
    type: [String],
    required: true
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
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'paid'
  },
  transactionId: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index to ensure seat uniqueness per show
bookingSchema.index({ 
  hallId: 1, 
  movieId: 1, 
  showDate: 1, 
  showTime: 1, 
  seats: 1 
}, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;