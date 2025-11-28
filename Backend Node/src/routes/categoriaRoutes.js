const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rotas básicas
router.get('/', categoriaController.exibirCategorias);
router.post('/', categoriaController.salvarCategoria);

// Rotas com parâmetros (devem vir depois)
router.get('/:id', categoriaController.exibirCategoriaId);

module.exports = router;