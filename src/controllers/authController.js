const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = async (req, res, next) => {
try {
const { email, password } = req.body;
const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ message: 'Email already in use' });
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || 10, 10);
const hashed = await bcrypt.hash(password, saltRounds);
const user = await User.create({ email, password: hashed });
res.status(201).json({ id: user._id, email: user.email });
} catch (err) { next(err); }
};


exports.login = async (req, res, next) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
res.json({ token });
} catch (err) { next(err); }
};