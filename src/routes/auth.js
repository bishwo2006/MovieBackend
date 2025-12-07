const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validator = require('../utils/validator');
const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post('/signup', validator(signupSchema), authController.signup);
router.post('/login', validator(loginSchema), authController.login);

module.exports = router;
