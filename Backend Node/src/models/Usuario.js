const db = require('../config/database');

class Usuario {

  // Buscar todos os usuários
  static async findAll() {
    const [rows] = await db.query(`
      SELECT u.*, c.cre_email, c.cre_tipo, c.cre_dataCadastro
      FROM Usuario u
      INNER JOIN Credencial c ON u.cre_codigo = c.cre_codigo
    `);
    return rows; // Retorna array com todos os usuários
  }

  // Buscar usuário por ID
  static async findById(id) {
    const [rows] = await db.query(`
      SELECT u.*, c.cre_email, c.cre_tipo, c.cre_dataCadastro
      FROM Usuario u
      INNER JOIN Credencial c ON u.cre_codigo = c.cre_codigo
      WHERE u.usu_codigo = ?
    `, [id]);
    return rows[0]; // Retorna o usuário encontrado
  }

  // Criar novo usuário usando procedure
  static async create(userData) {
    /* A forma feita extrai os dados do usuário com desestruturação, equivalente a:
          const email = req.body.email;
          const senha = req.body.senha;
    */
    const { email, senha, tipo, fotoPerfil, nome, dataNascimento, status, linkPortifolio, linkLinkedin } = userData;

    // Inserir credencial e usuário via procedure
    await db.query(
      'CALL spInserirUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [email, senha, tipo, fotoPerfil, nome, dataNascimento, status, linkPortifolio, linkLinkedin]
      // Extrai os parâmetros conforme a procedure definida no banco
    );

    // Retornar o usuário recém-criado
    return await this.findByEmail(email);
  }

  // Atualizar usuário
  static async update(id, userData) {
    const { fotoPerfil, nome, status, linkPortifolio, linkLinkedin } = userData;

    await db.query(`
      UPDATE Usuario 
      SET usu_fotoPerfil = ?, 
          usu_Nome = ?, 
          usu_status = ?, 
          usu_linkPortifolio = ?, 
          usu_linkLinkedin = ?
      WHERE usu_codigo = ?
    `, [fotoPerfil, nome, status, linkPortifolio, linkLinkedin, id]);

    return await this.findById(id);
  }

  // Deletar usuário
  static async delete(id) {
    // Buscar código da credencial
    const usuario = await this.findById(id);
    if (!usuario) return false;

    // Deletar usuário
    await db.query('DELETE FROM Usuario WHERE usu_codigo = ?', [id]);
    // Deletar credencial
    await db.query('DELETE FROM Credencial WHERE cre_codigo = ?', [usuario.cre_codigo]);

    return true;
  }

  // Buscar habilidades do usuário
  static async findHabilidades(id) {
    const [rows] = await db.query(`
      SELECT h.*
      FROM Habilidade h
      INNER JOIN UsuarioHabilidade uh ON h.hab_codigo = uh.hab_codigo
      WHERE uh.usu_codigo = ?
    `, [id]);
    return rows;
  }

  // Adicionar habilidade ao usuário
  static async addHabilidade(usuarioId, habilidadeId) {
    await db.query(
      'INSERT INTO UsuarioHabilidade (usu_codigo, hab_codigo) VALUES (?, ?)',
      [usuarioId, habilidadeId]
    );
    return true;
  }

  // Buscar áreas de interesse do usuário
  static async findAreasInteresse(id) {
    const [rows] = await db.query(`
      SELECT a.*
      FROM AreaInteresse a
      INNER JOIN UsuarioArea ua ON a.ari_codigo = ua.ari_codigo
      WHERE ua.usu_codigo = ?
    `, [id]);
    return rows;
  }

  // Adicionar área de interesse ao usuário
  static async addAreaInteresse(usuarioId, areaId) {
    await db.query(
      'INSERT INTO UsuarioArea (usu_codigo, ari_codigo) VALUES (?, ?)',
      [usuarioId, areaId]
    );
    return true;
  }
}

module.exports = Usuario;