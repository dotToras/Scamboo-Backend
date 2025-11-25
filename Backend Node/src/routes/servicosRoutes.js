const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

// Rotas especiais (devem vir antes das rotas com :id)
router.get('/disponiveis', servicoController.disponiveis);
router.get('/usuario/:usuarioId', servicoController.byUsuario);
router.get('/categoria/:categoriaId', servicoController.byCategoria);

// Rotas básicas CRUD
router.get('/', servicoController.index);
router.get('/:id', servicoController.show);
router.post('/', servicoController.store);
//router.put('/:id', servicoController.update);
router.delete('/:id', servicoController.destroy);

// Rota para concluir serviço
router.patch('/:id/concluir', servicoController.concluir);
// Rota para propostas do serviço
router.get('/:id/propostas', servicoController.getPropostas);

module.exports = router;