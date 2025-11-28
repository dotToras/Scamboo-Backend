const Habilidade = require('../models/Habilidade');

class HabilidadeController {

  // GET /api/habilidades
  async exibirHabilidades(req, res) {
    try {
      const habilidades = await Habilidade.buscarTodasHabilidades;
      res.json(habilidades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar habilidades' });
    }
  }

  // GET /api/habilidades/:id
  async exibirHabilidadeId(req, res) {
    try {
      const { id } = req.params;
      const habilidade = await Habilidade.buscarHabilidadeId(id);
      
      if (!habilidade) {
        return res.status(404).json({ error: 'Habilidade não encontrada' });
      }
      
      res.json(habilidade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar habilidade' });
    }
  }

  // POST /api/habilidades
  async salvarHabilidade(req, res) {
    try {
      const { nome } = req.body;
      
      if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      await Habilidade.criarHabilidade(nome);
      const habilidades = await Habilidade;
      
      res.status(201).json({
        message: 'Habilidade criada com sucesso',
        habilidades
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar habilidade' });
    }
  }
}

module.exports = new HabilidadeController();