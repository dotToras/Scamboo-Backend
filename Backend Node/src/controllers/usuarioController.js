const Usuario = require('../models/Usuario');

class UsuarioController {

  // GET /api/usuarios
  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll();
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
      const usuario = await Usuario.findById(id);
      
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
      const usuarioExistente = await Usuario.findByEmail(email);
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
      const { fotoPerfil, nome, status, linkPortifolio, linkLinkedin } = req.body;

      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Atualiza apenas os campos fornecidos
      const usuarioAtualizado = await Usuario.update(id, {
        fotoPerfil: fotoPerfil || usuario.usu_fotoPerfil,
        nome: nome || usuario.usu_Nome,
        status: status !== undefined ? status : usuario.usu_status,
        linkPortifolio: linkPortifolio || usuario.usu_linkPortifolio,
        linkLinkedin: linkLinkedin || usuario.usu_linkLinkedin
      });

      res.json(usuarioAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  // DELETE /api/usuarios/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const deletado = await Usuario.delete(id);
      
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
      const habilidades = await Usuario.findHabilidades(id);
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

  // GET /api/usuarios/:id/areas-interesse
  async getAreasInteresse(req, res) {
    try {
      const { id } = req.params;
      const areas = await Usuario.findAreasInteresse(id);
      res.json(areas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar áreas de interesse' });
    }
  }

  // POST /api/usuarios/:id/areas-interesse
  async addAreaInteresse(req, res) {
    try {
      const { id } = req.params;
      const { areaId } = req.body;

      if (!areaId) {
        return res.status(400).json({ error: 'areaId é obrigatório' });
      }

      await Usuario.addAreaInteresse(id, areaId);
      res.status(201).json({ message: 'Área de interesse adicionada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar área de interesse' });
    }
  }
}

module.exports = new UsuarioController();