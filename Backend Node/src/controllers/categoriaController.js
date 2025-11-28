const Categoria = require('../models/Categoria');

class CategoriaController {

  // GET /api/categorias
  async exibirCategorias(req, res) {
    try {
      const categorias = await Categoria.buscarCategorias();
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  // GET /api/categorias/:id
  async exibirCategoriaId(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.buscarCategoriasId(id);
      
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
  async salvarCategoria(req, res) {
    try {
      const { nome } = req.body;
      
      if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      await Categoria.inserirCategoria(nome);
      const categorias = await Categoria.buscarCategorias();
      
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