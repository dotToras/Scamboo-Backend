const express = require('express');
const propostaController = require('../controllers/propostaController');

const router = express.Router();

router.get('/', propostaController.index);
router.get('/usuario/:usuarioId', propostaController.byUsuario);
router.get('/servico/:servicoId', propostaController.byServico);
router.get('/:id', propostaController.show);
router.post('/', propostaController.store);
router.patch('/:id/aceitar', propostaController.aceitar);
router.patch('/:id/recusar', propostaController.recusar);
router.delete('/:id', propostaController.destroy);
router.get('/:propostaId/notificacoes', propostaController.notificacoes);

module.exports = router;