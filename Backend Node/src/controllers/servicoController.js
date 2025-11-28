const Servico = require('../models/Servico');
const db = require('../config/database');

class ServicoController {

  // GET /api/servicos
  async todosServicos(req, res) {
    try {
      const servicos = await Servico.buscarServicos();
      res.json(servicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/servicos/disponiveis
  async disponiveis(req, res) {
    try {
      const servicos = await Servico.buscarDisponiveis();
      res.json(servicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/servicos/:id
  async show(req, res) {
    try {
      const { id } = req.params;
      const servico = await Servico.findById(id);
      
      if (!servico) {
        return res.status(404).json({ error: 'Serviço não encontrado' });
      }
      
      res.json(servico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/servicos/categoria/:categoriaId
  async byCategoria(req, res) {
    try {
      const { categoriaId } = req.params;
      const servicos = await Servico.findByCategoria(categoriaId);
      res.json(servicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/servicos/usuario/:usuarioId
  async byUsuario(req, res) {
    try {
      const { usuarioId } = req.params;
      const [rows] = await db.query(`
        SELECT s.*, u.usu_Nome, c.cat_nome
        FROM Servico s
        INNER JOIN Usuario u ON s.usu_codigo = u.usu_codigo
        INNER JOIN Categoria c ON s.cat_codigo = c.cat_codigo
        WHERE s.usu_codigo = ?
        ORDER BY s.ser_dataPedido DESC
      `, [usuarioId]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST /api/servicos
  async guardarServico(req, res) {
    try {
      const { nome, descricao, dataExpiracao, usuarioId, categoriaId } = req.body;
      
      // Validações
      if (!nome || !descricao || !dataExpiracao || !usuarioId || !categoriaId) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
      }
      
      const servico = await Servico.criarServico({
        nome,
        descricao,
        dataExpiracao,
        usuarioId,
        categoriaId
      });
      
      res.status(201).json(servico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PATCH /api/servicos/:id/concluir
  async concluir(req, res) {
    try {
      const { id } = req.params;
      const servico = await Servico.concluir(id);
      
      if (!servico) {
        return res.status(404).json({ error: 'Serviço não encontrado' });
      }
      
      res.json({ message: 'Serviço concluído com sucesso', servico });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE /api/servicos/:id
  async deletarServico(req, res) {
    try {
      const { id } = req.params;
      const deletado = await Servico.deletar(id);
      
      if (!deletado) {
        return res.status(404).json({ error: 'Serviço não encontrado' });
      }
      
      res.json({ message: 'Serviço deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new ServicoController();