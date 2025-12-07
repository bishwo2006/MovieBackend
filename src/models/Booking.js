const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
date: { type: String, required: true }, // YYYY-MM-DD
time: { type: String, required: true },
seatsBooked: [{ type: Number }],
totalAmount: Number,
paymentMethod: String
}, { timestamps: true });

