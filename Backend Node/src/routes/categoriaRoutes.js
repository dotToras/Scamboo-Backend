const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.index);
router.get('/:id', categoriaController.show);
router.post('/', categoriaController.store);

module.exports = router;