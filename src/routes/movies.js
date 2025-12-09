// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Public routes
router.get('/', movieController.getMovies);
router.get('/search', movieController.searchMovies);
router.get('/new-releases', movieController.getNewReleases);
router.get('/premier', movieController.getPremierMovies);
router.get('/featured', movieController.getFeaturedMovies);
router.get('/:id', movieController.getMovieById);

// Admin routes (add authentication middleware)
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;