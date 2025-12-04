const db = require('../config/database');

class Proposta {

  // Buscar todas as propostas
  static async findAll() {
    const [rows] = await db.query(`
      SELECT p.*, u.usu_Nome, s.ser_nome
      FROM Proposta p
      INNER JOIN Usuario u ON p.usu_codigo = u.usu_codigo
      INNER JOIN Servico s ON p.ser_codigo = s.ser_codigo
      ORDER BY p.pro_codigo DESC
    `);
    return rows;
  }

  // Buscar proposta por ID
  static async findById(id) {
    const [rows] = await db.query(`
      SELECT p.*, u.usu_Nome, u.usu_fotoPerfil, s.ser_nome
      FROM Proposta p
      INNER JOIN Usuario u ON p.usu_codigo = u.usu_codigo
      INNER JOIN Servico s ON p.ser_codigo = s.ser_codigo
      WHERE p.pro_codigo = ?
    `, [id]);
    return rows[0];
  }

  // Buscar propostas por usuário (propostas enviadas)
  static async findByUsuario(usuarioId) {
    const [rows] = await db.query(`
      SELECT p.*, s.ser_nome, s.ser_descricao
      FROM Proposta p
      INNER JOIN Servico s ON p.ser_codigo = s.ser_codigo
      WHERE p.usu_codigo = ?
      ORDER BY p.pro_codigo DESC
    `, [usuarioId]);
    return rows;
  }

  // Buscar propostas por serviço
  static async findByServico(servicoId) {
    const [rows] = await db.query(`
      SELECT p.*, u.usu_Nome, u.usu_fotoPerfil
      FROM Proposta p
      INNER JOIN Usuario u ON p.usu_codigo = u.usu_codigo
      WHERE p.ser_codigo = ?
      ORDER BY p.pro_codigo DESC
    `, [servicoId]);
    return rows;
  }

  // Criar nova proposta (dispara trigger de notificação)
  static async create(propostaData) {
    const { descricao, usuarioId, servicoId } = propostaData;

    const [result] = await db.query(`
      INSERT INTO Proposta (pro_descricao, pro_aceita, usu_codigo, ser_codigo)
      VALUES (?, 0, ?, ?)
    `, [descricao, usuarioId, servicoId]);

    return await this.findById(result.insertId);
  }

  // Aceitar proposta
  static async aceitar(id) {
    await db.query('CALL spAceitarProposta(?)', [id]);
    return await this.findById(id);
  }

  // Recusar proposta
  static async recusar(id) {
    await db.query('UPDATE Proposta SET pro_aceita = 0 WHERE pro_codigo = ?', [id]);
    return await this.findById(id);
  }

  // Deletar proposta
  static async delete(id) {
    const [result] = await db.query('DELETE FROM Proposta WHERE pro_codigo = ?', [id]);
    return result.affectedRows > 0;
  }

  // Buscar notificações da proposta
  static async findNotificacoes(propostaId) {
    const [rows] = await db.query(`
      SELECT * FROM vwNotificacoesProposta
      WHERE codigoRelacionado = ?
      ORDER BY data DESC
    `, [propostaId]);
    return rows;
  }
}

module.exports = Proposta;