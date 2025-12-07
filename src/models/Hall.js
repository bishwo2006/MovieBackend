const mongoose = require('mongoose');


const dateSlotSchema = new mongoose.Schema({
date: String, // ISO date string YYYY-MM-DD
times: [String]
}, { _id: false });


const hallSchema = new mongoose.Schema({
name: { type: String, required: true },
totalSeats: { type: Number, required: true },
availableDates: [dateSlotSchema]
}, { timestamps: true });


module.exports = mongoose.model('Hall', hallSchema);