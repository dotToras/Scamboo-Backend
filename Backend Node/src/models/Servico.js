const db = require('../config/database');

class Servico {

  // Buscar todos os serviços (usando View)
  static async buscarTodos() {
    const [linhas] = await db.query(` SELECT * FROM vwServicos `);
    return linhas;
  }

  // Buscar serviços disponíveis (não concluídos e não expirados - usando View)
  static async buscarDisponiveis() {
    const [linhas] = await db.query(` SELECT * FROM vwServicosDisponiveis `);
    return linhas;
  }

  // Buscar serviço por ID
  static async buscarPorId(id) {
    const [rows] = await db.query(`
      SELECT s.*, u.usu_Nome, c.cat_nome
      FROM Servico s
      INNER JOIN Usuario u ON s.usu_codigo = u.usu_codigo
      INNER JOIN Categoria c ON s.cat_codigo = c.cat_codigo
      WHERE s.ser_codigo = ?
    `, [id]);
    return rows[0]; // Retorna o serviço encontrado
  }

  // Buscar serviços por categoria
  static async buscarPorCategoria(categoriaId) {
    const [rows] = await db.query(`
      SELECT s.*, u.usu_Nome, c.cat_nome
      FROM Servico s
      INNER JOIN Usuario u ON s.usu_codigo = u.usu_codigo
      INNER JOIN Categoria c ON s.cat_codigo = c.cat_codigo
      WHERE s.cat_codigo = ? AND s.ser_concluido = 0
      ORDER BY s.ser_dataPedido DESC
    `, [categoriaId]);
    return rows; // Retorna array de serviços
  }

  // Criar novo serviço usando spInserirServico
  static async criar(servicoData) {
    try {
      const { nome, descricao, dataExpiracao, usuarioId, categoriaId } = servicoData;

      // Executa a procedure spInserirServico
      await db.query(
        'CALL spInserirServico(?, ?, ?, ?, ?)',
        [nome, descricao, dataExpiracao, usuarioId, categoriaId]
      );

      // Buscar o serviço recém-criado (pela view, ordenando pelo mais recente)
      const [rows] = await db.query(`
        SELECT * FROM vwServicos
        WHERE ser_nome = ?
        ORDER BY ser_codigo DESC
        LIMIT 1
      `, [nome]);

      return rows[0]; // Retorna o serviço criado
    } catch (error) {
      console.error('Erro ao criar serviço:', error.message);
      throw error;
    }
  }

  // Atualizar serviço usando spAtualizarServico
  static async atualizar(id, servicoData) {
    const { nome, descricao, dataExpiracao, categoriaId } = servicoData;

    await db.query(
      'CALL spAtualizarServico(?, ?, ?, ?, ?)',
      [id, nome, descricao, dataExpiracao, categoriaId]
    );

    return await this.buscarPorId(id); // Retorna o serviço atualizado
  }

  // Marcar serviço como concluído (Não há SP para isso)
  static async concluir(id) {
    await db.query('UPDATE Servico SET ser_concluido = 1 WHERE ser_codigo = ?', [id]);
    return await this.buscarPorId(id); // Retorna o serviço atualizado
  }

  // Deletar serviço usando spDeletarServico
  static async deletar(id) {
    const [result] = await db.query('CALL spDeletarServico(?)', [id]);
    // Verifica se houve linhas afetadas, o que indica sucesso na deleção
    return result.affectedRows > 0;
  }

  // Buscar propostas do serviço
  static async buscarPropostas(id) {
    const [rows] = await db.query(`
      SELECT p.*, u.usu_Nome, u.usu_fotoPerfil
      FROM Proposta p
      INNER JOIN Usuario u ON p.usu_codigo = u.usu_codigo
      WHERE p.ser_codigo = ?
      ORDER BY p.pro_codigo DESC
    `, [id]);
    return rows; // Retorna array de propostas
  }

  static async buscarPorNome(nome) {
    const [rows] = await db.query(
        'CALL spbuscarServicos(?)',
        [nome]
    );
    
    return rows[0]; 
}

static async buscarHistoricoUsuario(usuarioId) {
    const [rows] = await db.query(
        'CALL spvisualizarHistorico(?)',
        [usuarioId]
    );
    // Retorna todos os serviços criados por aquele usuário
    return rows[0]; 
}

static async buscarAvaliacoes(servicoId) {
    const [rows] = await db.query(`
      SELECT a.*, u.usu_Nome, u.usu_fotoPerfil
      FROM Avaliacao a
      INNER JOIN Usuario u ON a.usu_codigo = u.usu_codigo
      WHERE a.ser_codigo = ?
    `, [servicoId]);
    return rows; 
}
}

module.exports = Servico;