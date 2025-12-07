const Booking = require('../models/Booking');


// check if requested seats are free for given hall/date/time
exports.areSeatsAvailable = async (hallId, date, time, seats) => {
const existing = await Booking.find({ hallId, date, time });
const taken = new Set();
for (const b of existing) {
for (const s of b.seatsBooked) taken.add(s);
}
for (const s of seats) {
if (taken.has(s)) return false;
}
return true;
};