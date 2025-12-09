// models/User.js - FIXED VERSION
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profileImage: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  membershipLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  rewardsPoints: {
    type: Number,
    default: 0
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  favoriteGenres: [{
    type: String
  }],
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    pushNotifications: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'English'
    }
  },
  bookedTickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving - SIMPLIFIED VERSION
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      throw error;
    }
  }
});

// Alternative approach without next parameter
// userSchema.pre('save', function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
  
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);
    
//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) return next(err);
//       this.password = hash;
//       next();
//     });
//   });
// });

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;