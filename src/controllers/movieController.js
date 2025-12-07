const Movie = require('../models/Movie');


exports.create = async (req, res, next) => {
try {
const movie = await Movie.create(req.body);
res.status(201).json(movie);
} catch (err) { next(err); }
};


exports.list = async (req, res, next) => {
try {
const movies = await Movie.find();
res.json(movies);
} catch (err) { next(err); }
};


exports.get = async (req, res, next) => {
try {
const movie = await Movie.findById(req.params.id);
if (!movie) return res.status(404).json({ message: 'Not found' });
res.json(movie);
} catch (err) { next(err); }
};


exports.update = async (req, res, next) => {
try {
const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!movie) return res.status(404).json({ message: 'Not found' });
res.json(movie);
} catch (err) { next(err); }
};


exports.remove = async (req, res, next) => {
try {
await Movie.findByIdAndDelete(req.params.id);
res.status(204).end();
} catch (err) { next(err); }
};