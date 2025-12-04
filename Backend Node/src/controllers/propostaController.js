const Proposta = require('../models/Proposta');

class PropostaController {

  // GET /api/propostas
  async index(req, res) {
    try {
      const propostas = await Proposta.findAll();
      res.json(propostas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar propostas' });
    }
  }

  // GET /api/propostas/:id
  async show(req, res) {
    try {
      const { id } = req.params;
      const proposta = await Proposta.findById(id);
      
      if (!proposta) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }
      
      res.json(proposta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar proposta' });
    }
  }

  // GET /api/propostas/usuario/:usuarioId
  async byUsuario(req, res) {
    try {
      const { usuarioId } = req.params;
      const propostas = await Proposta.findByUsuario(usuarioId);
      res.json(propostas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar propostas do usuário' });
    }
  }

  // GET /api/propostas/servico/:servicoId
  async byServico(req, res) {
    try {
      const { servicoId } = req.params;
      const propostas = await Proposta.findByServico(servicoId);
      res.json(propostas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar propostas do serviço' });
    }
  }

  // GET /api/propostas/:propostaId/notificacoes
  async notificacoes(req, res) {
    try {
      const { propostaId } = req.params;
      const notificacoes = await Proposta.findNotificacoes(propostaId);
      res.json(notificacoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar notificações' });
    }
  }

  // POST /api/propostas
  async store(req, res) {
    try {
      const { descricao, usuarioId, servicoId } = req.body;
      
      // Validações
      if (!descricao || !usuarioId || !servicoId) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
      }
      
      const proposta = await Proposta.create({
        descricao,
        usuarioId,
        servicoId
      });
      
      res.status(201).json(proposta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar proposta' });
    }
  }

  // PATCH /api/propostas/:id/aceitar
  async aceitar(req, res) {
    try {
      const { id } = req.params;
      const proposta = await Proposta.aceitar(id);
      
      if (!proposta) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }
      
      res.json({ message: 'Proposta aceita com sucesso', proposta });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao aceitar proposta' });
    }
  }

  // PATCH /api/propostas/:id/recusar
  async recusar(req, res) {
    try {
      const { id } = req.params;
      const proposta = await Proposta.recusar(id);
      
      if (!proposta) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }
      
      res.json({ message: 'Proposta recusada com sucesso', proposta });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao recusar proposta' });
    }
  }

  // DELETE /api/propostas/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const deletado = await Proposta.delete(id);
      
      if (!deletado) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }
      
      res.json({ message: 'Proposta deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar proposta' });
    }
  }
}

module.exports = new PropostaController();