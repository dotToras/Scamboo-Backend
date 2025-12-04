const db = require('../config/database');

class Habilidade {
  // Listar todas as habilidades
  static async buscarTodasHabilidades() {
    const [linhas] = await db.query('SELECT * FROM vwHabilidades');
    return linhas;
  }
  // Buscar habilidade por ID
  static async buscarHabilidadeId(id) {
    const [linhas] = await db.query('SELECT * FROM vwHabilidades WHERE hab_codigo = ?', [id]);
    return linhas[0];
  }
  // Criar nova habilidade
  static async criarHabilidade(nome) {
    const [resultado] = await db.query('CALL spInserirHabilidades(?)', [nome]);
    return await this.buscarTodasHabilidades();
  }
}

module.exports = Habilidade;