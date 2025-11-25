const express = require('express');
const router = express.Router();
const habilidadeController = require('../controllers/habilidadeController');

router.get('/', habilidadeController.index);
router.get('/:id', habilidadeController.show);
router.post('/', habilidadeController.store);

module.exports = router;