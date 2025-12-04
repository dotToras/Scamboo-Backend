const db = require('../config/database');

class Usuario {

  static async buscarTodos() {
    const [rows] = await db.query(`
      SELECT u.*, c.cre_email, c.cre_dataCadastro
      FROM Usuario u
      INNER JOIN Credencial c ON u.cre_codigo = c.cre_codigo
    `);
    return rows; // Retorna array com todos os usuários
  }

  static async buscarPorId(id) {
    const [rows] = await db.query(`
      SELECT u.*, c.cre_email, c.cre_dataCadastro
      FROM Usuario u
      INNER JOIN Credencial c ON u.cre_codigo = c.cre_codigo
      WHERE u.usu_codigo = ?
    `, [id]);
    return rows[0]; // Retorna o usuário encontrado
  }

  static async buscarPorEmail(email) {
    const [rows] = await db.query(`
      SELECT u.*, c.cre_email, c.cre_Senha, c.cre_dataCadastro
      FROM Usuario u
      INNER JOIN Credencial c ON u.cre_codigo = c.cre_codigo
      WHERE c.cre_email = ?
    `, [email]);
    return rows[0]; // Retorna o usuário encontrado
  }

  static async criar(userData) {
    try {
      const { email, senha, fotoPerfil, nome, dataNascimento, status, linkPortifolio, linkLinkedin } = userData;

      // Executa a procedure spInserirUsuario que cuida do INSERT em Credencial e Usuario
      await db.query(
        'CALL spInserirUsuario(?, ?, ?, ?, ?, ?, ?, ?)',
        [email, senha, fotoPerfil, nome, dataNascimento, status, linkPortifolio, linkLinkedin]
      );

      // Busca o usuário recém-criado para retornar
      return await this.buscarPorEmail(email);
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      throw error;
    }
  }

  static async verificarLogin(email, senha) {
    const [rows] = await db.query(
      'CALL spVerificarLogin(?, ?)',
      [email, senha]
    );
    // spVerificarLogin retorna o código da Credencial, Usuário e Status
    return rows[0][0];
  }

  static async atualizar(id, dados) {
    const { fotoPerfil, nome, dataNascimento, linkPortifolio, linkLinkedin } = dados;

    const [result] = await db.query(
      `CALL spAtualizarPerfil(?, ?, ?, ?, ?, ?)`,
      [id, fotoPerfil, nome, dataNascimento, linkPortifolio, linkLinkedin]
    );

    return result;
  }

  static async deletar(id) {
    // Buscar código da credencial
    const usuario = await this.buscarPorId(id);
    if (!usuario) return false;

    // Deletar usuário e depois credencial para respeitar chaves estrangeiras
    await db.query('DELETE FROM Usuario WHERE usu_codigo = ?', [id]);
    await db.query('DELETE FROM Credencial WHERE cre_codigo = ?', [usuario.cre_codigo]);

    return true;
  }

  static async buscarHabilidades(id) {
    const [rows] = await db.query(`
      SELECT h.*
      FROM Habilidade h
      INNER JOIN UsuarioHabilidade uh ON h.hab_codigo = uh.hab_codigo
      WHERE uh.usu_codigo = ?
    `, [id]);
    return rows;
  }

  static async adicionarHabilidade(usuarioId, habilidadeId) {
    await db.query(
      'INSERT INTO UsuarioHabilidade (usu_codigo, hab_codigo) VALUES (?, ?)',
      [usuarioId, habilidadeId]
    );
    return true;
  }

  static async exibirSaldoMoedas(id) {
    const [rows] = await db.query(
      'CALL spExibirSaldoMoedas(?)',
      [id]
    );
    // spExibirSaldoMoedas retorna usu_codigo, usu_Nome, usu_saldoMoeda
    return rows[0][0];
  }
}

module.exports = Usuario;