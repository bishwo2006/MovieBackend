const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');
const Joi = require('joi');
const validator = require('../utils/validator');

const createSchema = Joi.object({
  movieId: Joi.string().required(),
  hallId: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  seatsBooked: Joi.array().items(Joi.number().min(1)).min(1).required(),
  paymentMethod: Joi.string().required()
});

router.post('/', auth, validator(createSchema), bookingController.create);
router.get('/', auth, bookingController.listForUser);
router.get('/:id', auth, bookingController.get);

module.exports = router;
