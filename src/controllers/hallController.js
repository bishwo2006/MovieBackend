const Hall = require('../models/Hall');


exports.create = async (req, res, next) => {
try {
const hall = await Hall.create(req.body);
res.status(201).json(hall);
} catch (err) { next(err); }
};


exports.list = async (req, res, next) => {
try {
const halls = await Hall.find();
res.json(halls);
} catch (err) { next(err); }
};


exports.get = async (req, res, next) => {
try {
const hall = await Hall.findById(req.params.id);
if (!hall) return res.status(404).json({ message: 'Not found' });
res.json(hall);
} catch (err) { next(err); }
};


exports.update = async (req, res, next) => {
try {
const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!hall) return res.status(404).json({ message: 'Not found' });
res.json(hall);
} catch (err) { next(err); }
};


exports.remove = async (req, res, next) => {
try {
await Hall.findByIdAndDelete(req.params.id);
res.status(204).end();
} catch (err) { next(err); }
};