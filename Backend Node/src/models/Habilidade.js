const db = require('../config/database');

class Habilidade {
  // Listar todas as habilidades
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM Habilidade ORDER BY hab_nome');
    return rows;
  }
  // Buscar habilidade por ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM Habilidade WHERE hab_codigo = ?', [id]);
    return rows[0];
  }
  // Criar nova habilidade
  static async create(nome) {
    const [result] = await db.query('CALL spInserirHabilidades(?)', [nome]);
    return await this.findAll();
  }
}

module.exports = Habilidade;