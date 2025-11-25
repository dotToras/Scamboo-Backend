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

// Rotas de áreas de interesse
router.get('/:id/areas-interesse', usuarioController.getAreasInteresse);
router.post('/:id/areas-interesse', usuarioController.addAreaInteresse);

module.exports = router;