const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');
const auth = require('../middlewares/auth');

router.get('/', hallController.list);
router.post('/', auth, hallController.create);
router.get('/:id', hallController.get);
router.put('/:id', auth, hallController.update);
router.delete('/:id', auth, hallController.remove);

module.exports = router;
