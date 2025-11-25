require('dotenv').config();
const db = require('./src/config/database');

async function testarConexao() {
  try {
    console.log('Testando conexão com o banco de dados...');
    const conexao = await db.getConnection();
    console.log('Conexão com sucesso!');
    console.log('Banco:', process.env.DB_NAME);
    
    conexao.release();
    process.exit(0);
  } catch (error) {
    console.error('Erro na conexão:', error.message);
    process.exit(1);
  }
}

testarConexao();
