const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/servicos', require('./routes/servicosRoutes'));
app.use('/api/propostas', require('./routes/propostaRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/habilidades', require('./routes/habilidadeRoutes'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Scamboo rodando!' });
});

module.exports = app;