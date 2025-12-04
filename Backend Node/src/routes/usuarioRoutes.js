const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rotas básicas CRUD
router.get('/', usuarioController.index);
router.get('/:id', usuarioController.show);
router.post('/', usuarioController.store);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.destroy);

// Rotas de habilidades
router.get('/:id/habilidades', usuarioController.getHabilidades);
router.post('/:id/habilidades', usuarioController.addHabilidade);

module.exports = router;