const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/booked-seats', bookingController.getBookedSeats);
router.get('/user/:userId', bookingController.getUserBookings);
router.put('/cancel/:bookingId', bookingController.cancelBooking);

module.exports = router;