const Categoria = require('../models/Categoria');

class CategoriaController {

  // GET /api/categorias
  async index(req, res) {
    try {
      const categorias = await Categoria.findAll();
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  // GET /api/categorias/:id
  async show(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findById(id);
      
      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      
      res.json(categoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  // POST /api/categorias
  async store(req, res) {
    try {
      const { nome } = req.body;
      
      if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      await Categoria.create(nome);
      const categorias = await Categoria.findAll();
      
      res.status(201).json({
        message: 'Categoria criada com sucesso',
        categorias
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar categoria' });
    }
  }
}

module.exports = new CategoriaController();