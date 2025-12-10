const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const Hall = require('../models/Hall');

// Helper function to convert seat number to row/seat format
const formatSeatNumber = (seatNumber) => {
  const rows = 'ABCDEFGHIJ';
  const row = rows[Math.floor((seatNumber - 1) / 10)];
  const seat = ((seatNumber - 1) % 10) + 1;
  return `${row}${seat}`;
};

// Create booking
exports.createBooking = async (req, res) => {
  try {
    console.log('Creating booking with data:', req.body);
    
    const { 
      movieId, 
      hallId, 
      userId, 
      userName, 
      userEmail,
      showDate, 
      showTime, 
      seats, 
      totalPrice, 
      paymentMethod, 
      transactionId 
    } = req.body;

    // Validate required fields
    if (!movieId || !hallId || !userId || !showDate || !showTime || !seats || !seats.length) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Verify movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    // Verify hall exists
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({
        success: false,
        message: 'Hall not found'
      });
    }

    // Check if seats are already booked for this specific show
    const existingBookings = await Booking.find({
      hallId,
      movieId,
      showDate,
      showTime,
      status: { $ne: 'cancelled' }
    });

    // Extract all already booked seats
    let alreadyBookedSeats = [];
    existingBookings.forEach(booking => {
      alreadyBookedSeats = alreadyBookedSeats.concat(booking.seats);
    });

    // Check if any requested seat is already booked
    const conflictingSeats = seats.filter(seat => alreadyBookedSeats.includes(seat));
    
    if (conflictingSeats.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Seat(s) ${conflictingSeats.join(', ')} are already booked`,
        conflictingSeats
      });
    }

    // Format seat numbers (e.g., "A1", "B5")
    const seatNumbers = seats.map(formatSeatNumber);

    // Create booking
    const booking = new Booking({
      movieId,
      hallId,
      userId,
      userName: userName || 'Anonymous',
      userEmail: userEmail || 'no-email@example.com',
      movieTitle: movie.title,
      hallName: hall.name,
      showDate,
      showTime,
      seats,
      seatNumbers,
      totalPrice,
      paymentMethod: paymentMethod || 'cash',
      transactionId,
      status: 'confirmed',
      paymentStatus: 'paid'
    });

    await booking.save();

    // Populate references
    const populatedBooking = await Booking.findById(booking._id)
      .populate('movieId', 'title posterUrl duration')
      .populate('hallId', 'name location');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: populatedBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    
    // Handle duplicate seat booking error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'One or more seats have already been booked',
        error: error.message
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get booked seats for a specific show
exports.getBookedSeats = async (req, res) => {
  try {
    const { movieId, hallId, showDate, showTime } = req.query;

    if (!movieId || !hallId || !showDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: movieId, hallId, showDate'
      });
    }

    // Find all confirmed bookings for this specific show
    const bookings = await Booking.find({
      movieId,
      hallId,
      showDate,
      showTime: showTime || { $exists: true }, // If showTime is provided, filter by it
      status: 'confirmed'
    });

    // Extract all booked seats and seat numbers
    let bookedSeats = [];
    let bookedSeatNumbers = [];
    
    bookings.forEach(booking => {
      bookedSeats = bookedSeats.concat(booking.seats);
      bookedSeatNumbers = bookedSeatNumbers.concat(booking.seatNumbers);
    });

    // Remove duplicates
    bookedSeats = [...new Set(bookedSeats)];
    bookedSeatNumbers = [...new Set(bookedSeatNumbers)];

    res.status(200).json({
      success: true,
      data: {
        bookedSeats,
        bookedSeatNumbers,
        totalBookings: bookings.length,
        totalBookedSeats: bookedSeats.length
      }
    });
  } catch (error) {
    console.error('Error fetching booked seats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booked seats',
      error: error.message
    });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate('movieId', 'title posterUrl duration genre')
      .populate('hallId', 'name location')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user bookings',
      error: error.message
    });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking can be cancelled (e.g., not too close to show time)
    const showDateTime = new Date(`${booking.showDate} ${booking.showTime}`);
    const now = new Date();
    const hoursUntilShow = (showDateTime - now) / (1000 * 60 * 60);

    if (hoursUntilShow < 2) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel booking within 2 hours of show time'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(400).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
};