const db = require('../config/database');

class Categoria {

    // Buscar todas as categorias
    static async buscarCategorias() {
        const [linhas] = await db.query('SELECT * FROM vwCategorias');
        return linhas;
    }
    // Buscar categoria por ID
    static async buscarCategoriasId(id) {
        const [linhas] = await db.query('SELECT * FROM vwCategorias WHERE cat_codigo = ?', [id]);
        return linhas[0];
    }

    // Criar nova categoria
    static async inserirCategoria(nome) {
        const [resultado] = await db.query('CALL spInserirCategoria(?)', [nome]);
        return await this.buscarCategorias();
    }
}

module.exports = Categoria;