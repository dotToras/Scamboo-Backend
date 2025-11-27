const db = require('../config/database');

class Servico {

  // Buscar todos os serviços
  static async buscarServicos() {
    const [linhas] = await db.query(` SELECT * FROM vwServicos `);
    return linhas;
  }

  // Buscar serviços disponíveis (não concluídos e não expirados)
  static async buscarDisponiveis() {
    const [linhas] = await db.query(` SELECT * FROM vwServicosDisponiveis `);
    return linhas;
  }

  // Buscar serviço por ID
  static async findById(id) {
    const [rows] = await db.query(`
      SELECT s.*, u.usu_Nome, c.cat_nome
      FROM Servico s
      INNER JOIN Usuario u ON s.usu_codigo = u.usu_codigo
      INNER JOIN Categoria c ON s.cat_codigo = c.cat_codigo
      WHERE s.ser_codigo = ?
    `, [id]);
    return rows[0];
  }

  // Buscar serviços por categoria
  static async findByCategoria(categoriaId) {
    const [rows] = await db.query(`
      SELECT s.*, u.usu_Nome, c.cat_nome
      FROM Servico s
      INNER JOIN Usuario u ON s.usu_codigo = u.usu_codigo
      INNER JOIN Categoria c ON s.cat_codigo = c.cat_codigo
      WHERE s.cat_codigo = ? AND s.ser_concluido = 0
      ORDER BY s.ser_dataPedido DESC
    `, [categoriaId]);
    return rows;
  }

  // Criar novo serviço
  static async criarServico(servicoData) {
    const { nome, descricao, dataExpiracao, usuarioId, categoriaId } = servicoData;

    const [resultado] = await db.query(`
      call spInserirServico(?, ?, ?, ?, ?)
    `, [nome, descricao, dataExpiracao, usuarioId, categoriaId]);

    return await this.findById(resultado.insertId);
  }

  // Atualizar serviço -- VER SE VAI SER USADO
  /*/ PUT /api/servicos/:id
  static async update(id, servicoData) {
    const { nome, descricao, dataExpiracao, categoriaId } = servicoData;
    
    await db.query(`
      UPDATE Servico 
      SET ser_nome = ?, 
          ser_descricao = ?, 
          ser_dataExpiracao = ?,
          cat_codigo = ?
      WHERE ser_codigo = ?
    `, [nome, descricao, dataExpiracao, categoriaId, id]);
    
    return await this.findById(id);
  }
    */

  // Marcar serviço como concluído
  static async concluir(id) {
    await db.query('UPDATE Servico SET ser_concluido = 1 WHERE ser_codigo = ?', [id]);
    return await this.findById(id);
  }

  // Deletar serviço
  static async deletar(id) {
    const [result] = await db.query('CALL spDeletarServico(?)', [id]);
    return result.affectedRows > 0;
  }

  // Buscar propostas do serviço
  static async findPropostas(id) {
    const [rows] = await db.query(`
      SELECT p.*, u.usu_Nome, u.usu_fotoPerfil
      FROM Proposta p
      INNER JOIN Usuario u ON p.usu_codigo = u.usu_codigo
      WHERE p.ser_codigo = ?
      ORDER BY p.pro_codigo DESC
    `, [id]);
    return rows;
  }
}

module.exports = Servico;