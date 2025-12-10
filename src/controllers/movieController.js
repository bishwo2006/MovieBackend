// controllers/movieController.js
const Movie = require('../models/Movie');

// Get all movies with optional filters
exports.getMovies = async (req, res) => {
  try {
    const { isFeatured, isPremiered, genre, limit = 20, page = 1 } = req.query;
    
    const filter = {};
    if (isFeatured === 'true') filter.isFeatured = true;
    if (isPremiered === 'true') filter.isPremiered = true;
    if (genre) filter.genre = { $in: [genre] };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const movies = await Movie.find(filter)
      .sort({ releaseDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Return array directly
    res.json(movies); // <-- Changed from object to array
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getNewReleases = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const movies = await Movie.find({
      releaseDate: { $gte: thirtyDaysAgo },
      isNewRelease: true
    }).sort({ releaseDate: -1 }).limit(10);

    // Return array directly instead of object
    res.json(movies); // <-- Changed from object to array
  } catch (error) {
    console.error('Error fetching new releases:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get premier movies
exports.getPremierMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ 
      isPremiered: true 
    }).sort({ releaseDate: -1 }).limit(10);

    res.json(movies); // <-- Changed from object to array
  } catch (error) {
    console.error('Error fetching premier movies:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get featured movies
exports.getFeaturedMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ 
      isFeatured: true 
    }).sort({ rating: -1 }).limit(10);

    res.json(movies); // <-- Changed from object to array
  } catch (error) {
    console.error('Error fetching featured movies:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Search movies
exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { director: { $regex: query, $options: 'i' } },
        { cast: { $in: [new RegExp(query, 'i')] } },
        { genre: { $in: [new RegExp(query, 'i')] } }
      ]
    }).limit(20);

    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create movie (admin only)
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();

    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie
    });
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating movie',
      error: error.message
    });
  }
};

// Update movie (admin only)
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.json({
      success: true,
      message: 'Movie updated successfully',
      data: movie
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating movie',
      error: error.message
    });
  }
};

// Delete movie (admin only)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};