const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');

router.get('/', hallController.getAllHalls);
router.get('/:id', hallController.getHallById);
router.get('/:id/availability', hallController.getHallAvailability);

module.exports = router;