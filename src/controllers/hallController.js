const Hall = require('../models/Hall');
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

// Get hall availability for a specific movie and show
exports.getHallAvailability = async (req, res) => {
  try {
    const { hallId, movieId, date, time } = req.query;

    if (!hallId || !movieId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: hallId, movieId, date'
      });
    }

    // Get hall details
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({
        success: false,
        message: 'Hall not found'
      });
    }

    // Get movie details
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    const totalSeats = hall.totalSeats || 100;
    const allSeats = Array.from({ length: totalSeats }, (_, i) => i + 1);

    // Build query for booked seats
    const bookingQuery = {
      hallId,
      movieId,
      showDate: date,
      status: 'confirmed'
    };

    // If time is specified, filter by show time
    if (time) {
      bookingQuery.showTime = time;
    }

    // Get all confirmed bookings for this specific movie and show
    const bookings = await Booking.find(bookingQuery);

    // Extract all booked seats
    let bookedSeats = [];
    let bookedSeatNumbers = [];
    
    bookings.forEach(booking => {
      bookedSeats = bookedSeats.concat(booking.seats);
      bookedSeatNumbers = bookedSeatNumbers.concat(booking.seatNumbers);
    });

    // Remove duplicates
    bookedSeats = [...new Set(bookedSeats)];
    bookedSeatNumbers = [...new Set(bookedSeatNumbers)];

    // Calculate available seats
    const availableSeats = allSeats.filter(seat => !bookedSeats.includes(seat));

    // Format seat numbers
    const availableSeatNumbers = availableSeats.map(seat => {
      const rows = 'ABCDEFGHIJ';
      const row = rows[Math.floor((seat - 1) / 10)];
      const seatNum = ((seat - 1) % 10) + 1;
      return `${row}${seatNum}`;
    });

    res.status(200).json({
      success: true,
      data: {
        hallId,
        hallName: hall.name,
        movieId,
        movieTitle: movie.title,
        date,
        time: time || 'All shows',
        totalSeats,
        availableSeats,
        availableSeatNumbers,
        bookedSeats,
        bookedSeatNumbers,
        bookedCount: bookedSeats.length,
        availableCount: availableSeats.length,
        hallDetails: {
          name: hall.name,
          location: hall.location,
          priceRange: hall.priceRange,
          amenities: hall.amenities,
          isIMAX: hall.isIMAX,
          isDolbyAtmos: hall.isDolbyAtmos
        }
      }
    });
  } catch (error) {
    console.error('Error fetching hall availability:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hall availability',
      error: error.message
    });
  }
};

// Get all halls
exports.getAllHalls = async (req, res) => {
  try {
    const halls = await Hall.find();
    
    res.status(200).json({
      success: true,
      count: halls.length,
      data: halls
    });
  } catch (error) {
    console.error('Error fetching halls:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching halls',
      error: error.message
    });
  }
};

// Get hall by ID
exports.getHallById = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    
    if (!hall) {
      return res.status(404).json({
        success: false,
        message: 'Hall not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: hall
    });
  } catch (error) {
    console.error('Error fetching hall:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hall',
      error: error.message
    });
  }
};