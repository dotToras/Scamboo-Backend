const express = require('express');
const router = express.Router();
const habilidadeController = require('../controllers/habilidadeController');

router.get('/', habilidadeController.exibirHabilidades);
router.get('/:id', habilidadeController.exibirHabilidadeId);
router.post('/', habilidadeController.salvarHabilidade);

module.exports = router;