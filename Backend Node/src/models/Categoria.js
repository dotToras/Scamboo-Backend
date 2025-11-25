const db = require('../config/database');

class Categoria {

    // Buscar todas as categorias
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM Categoria ORDER BY cat_nome');
        return rows;
    }
    // Buscar categoria por ID
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM Categoria WHERE cat_codigo = ?', [id]);
        return rows[0];
    }
    // Criar nova categoria
    static async create(nome) {
        const [result] = await db.query('CALL spInserirCategoria(?)', [nome]);
        return await this.findAll();
    }
}

module.exports = Categoria;