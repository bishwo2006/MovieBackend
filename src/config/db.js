const mongoose = require('mongoose');

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in env');

  // OLD: causes error in Mongoose 7+
  // await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // NEW: just pass uri
  await mongoose.connect(uri);

  console.log('MongoDB connected');
};
