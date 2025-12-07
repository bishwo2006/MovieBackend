const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const Hall = require('../models/Hall');
const User = require('../models/User');
const bookingService = require('../services/bookingService');

exports.create = async (req, res, next) => {
  try {
    const { movieId, hallId, date, time, seatsBooked, paymentMethod } = req.body;

    const hall = await Hall.findById(hallId);
    if (!hall) return res.status(404).json({ message: 'Hall not found' });

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const invalidSeat = seatsBooked.find(s => s < 1 || s > hall.totalSeats);
    if (invalidSeat) return res.status(400).json({ message: `Seat ${invalidSeat} invalid` });

    const available = await bookingService.areSeatsAvailable(hallId, date, time, seatsBooked);
    if (!available) return res.status(409).json({ message: 'One or more seats already booked' });

    const totalAmount = seatsBooked.length * (movie.ticketPrice || 0);

    const booking = await Booking.create({
      userId: req.user._id,
      movieId,
      hallId,
      date,
      time,
      seatsBooked,
      totalAmount,
      paymentMethod
    });

    await User.findByIdAndUpdate(req.user._id, { $push: { bookedTickets: booking._id } });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    next(err);
  }
};

exports.listForUser = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('movieId hallId');
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (!booking.userId.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    res.json(booking);
  } catch (err) {
    next(err);
  }
};
