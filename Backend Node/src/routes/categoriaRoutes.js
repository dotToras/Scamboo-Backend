const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.exibirCategorias);
router.get('/:id', categoriaController.exibirCategoriaId);
router.post('/', categoriaController.salvarCategoria);

module.exports = router;