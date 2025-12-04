const Usuario = require('../models/Usuario');

class UsuarioController {

  // GET /api/usuarios
  async index(req, res) {
    try {
      const usuarios = await Usuario.buscarTodos();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  // GET /api/usuarios/:id
  async show(req, res) {
    try {
      const { id } = req.params;
      // Chama o model para buscar o usuário e espera o resultado
      const usuario = await Usuario.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json(usuario); // Retorna o usuário encontrado
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  // POST /api/usuarios
  async store(req, res) {
    try {
      const { email, senha, tipo, fotoPerfil, nome, dataNascimento, status, linkPortifolio, linkLinkedin } = req.body;

      // Validação básica
      if (!email || !senha || !nome || !dataNascimento) {
        return res.status(400).json({
          error: 'Campos obrigatórios: email, senha, nome, dataNascimento'
        });
      }

      // Verificar se email já existe
      const usuarioExistente = await Usuario.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const novoUsuario = await Usuario.create({
        email,
        senha,
        tipo: tipo || 0,
        fotoPerfil: fotoPerfil || null,
        nome,
        dataNascimento,
        status: status !== undefined ? status : 1,
        linkPortifolio: linkPortifolio || null,
        linkLinkedin: linkLinkedin || null
      });

      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  // PUT /api/usuarios/:id
  async update(req, res) {
    try {
      const { id } = req.params;

      // Busca o usuário atual
      const usuario = await Usuario.buscarPorId(id);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

      // Atualiza apenas os campos enviados, mantendo os outros
      const dadosAtualizados = {
        fotoPerfil: req.body.usu_fotoPerfil || usuario.usu_fotoPerfil,
        nome: req.body.usu_nome || usuario.usu_nome,
        dataNascimento: req.body.usu_dataNascimento || usuario.usu_dataNascimento,
        linkPortifolio: req.body.usu_linkPortifolio || usuario.usu_linkPortifolio,
        linkLinkedin: req.body.usu_linkLinkedin || usuario.usu_linkLinkedin
      };

      await Usuario.atualizar(id, dadosAtualizados);

      res.json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }


  // DELETE /api/usuarios/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const deletado = await Usuario.deletar(id);

      if (!deletado) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }

  // GET /api/usuarios/:id/habilidades
  async getHabilidades(req, res) {
    try {
      const { id } = req.params;
      const habilidades = await Usuario.buscarHabilidades(id);
      res.json(habilidades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar habilidades' });
    }
  }

  // POST /api/usuarios/:id/habilidades
  async addHabilidade(req, res) {
    try {
      const { id } = req.params;
      const { habilidadeId } = req.body;

      if (!habilidadeId) {
        return res.status(400).json({ error: 'habilidadeId é obrigatório' });
      }

      await Usuario.addHabilidade(id, habilidadeId);
      res.status(201).json({ message: 'Habilidade adicionada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar habilidade' });
    }
  }
}

module.exports = new UsuarioController();