const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middlewares/auth');

router.get('/', movieController.list); 
router.post('/', auth, movieController.create);  
router.get('/:id', movieController.get);
router.put('/:id', auth, movieController.update);
router.delete('/:id', auth, movieController.remove); 

module.exports = router;
