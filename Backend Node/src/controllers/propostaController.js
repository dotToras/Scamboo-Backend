const Proposta = require('../models/Proposta');

// GET /api/propostas
exports.index = async (req, res) => {
  try {
    const propostas = await Proposta.findAll();
    res.json(propostas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar propostas' });
  }
};

// GET /api/propostas/:id
exports.show = async (req, res) => {
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
};

// GET /api/propostas/usuario/:usuarioId
exports.byUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const propostas = await Proposta.findByUsuario(usuarioId);
    res.json(propostas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar propostas do usuário' });
  }
};

// GET /api/propostas/servico/:servicoId
exports.byServico = async (req, res) => {
  try {
    const { servicoId } = req.params;
    const propostas = await Proposta.findByServico(servicoId);
    res.json(propostas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar propostas do serviço' });
  }
};

// POST /api/propostas
exports.store = async (req, res) => {
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
};

// PATCH /api/propostas/:id/aceitar
exports.aceitar = async (req, res) => {
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
};

// PATCH /api/propostas/:id/recusar
exports.recusar = async (req, res) => {
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
};

// DELETE /api/propostas/:id
exports.destroy = async (req, res) => {
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
};