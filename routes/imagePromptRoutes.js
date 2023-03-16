const imagineController = require('../controllers/imagineController');
const express = require('express');
const router = express.Router();

router.post('/', imagineController.predict);
router.get('/', imagineController.getAll);

module.exports = router;