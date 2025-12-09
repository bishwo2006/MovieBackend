// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const bookingController = require('../controllers/bookingController');

// Protected routes (add authentication middleware)
router.post('/',auth, bookingController.createBooking);
router.get('/user/:userId',auth, bookingController.getUserBookings);
router.get('/:id',auth , bookingController.getBookingById);
router.put('/:id/cancel', auth, bookingController.cancelBooking);

module.exports = router;