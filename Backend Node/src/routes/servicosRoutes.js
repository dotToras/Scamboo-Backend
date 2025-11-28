const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

// Rotas especiais (devem vir antes das rotas com :id)
router.get('/disponiveis', servicoController.disponiveis);
router.get('/usuario/:usuarioId', servicoController.byUsuario);
router.get('/categoria/:categoriaId', servicoController.byCategoria);

// Rotas básicas CRUD
router.get('/', servicoController.todosServicos);
router.get('/:id', servicoController.show);
router.post('/', servicoController.guardarServico);
//router.put('/:id', servicoController.update);
router.delete('/:id', servicoController.deletarServico);

// Rota para concluir serviço
router.patch('/:id/concluir', servicoController.concluir);


module.exports = router;