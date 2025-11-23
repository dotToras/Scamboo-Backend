package com.scamboo.scambooJava.controller;

import com.scamboo.scambooJava.dto.UsuarioCadastroDTO;
import com.scamboo.scambooJava.model.Credencial;
import com.scamboo.scambooJava.model.Usuario;
import com.scamboo.scambooJava.repository.UsuarioRepository;
import com.scamboo.scambooJava.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Anotação que identifica como um POST
    @PostMapping
    public ResponseEntity<String> cadastrarUsuario(@RequestBody UsuarioCadastroDTO dto) {

        Credencial credencial = new Credencial();
        credencial.setEmail(dto.getEmail());
        credencial.setSenha(dto.getSenha());
        credencial.setTipo(dto.getTipo());

        Usuario usuario = new Usuario();
        usuario.setUsuFotoPerfil(dto.getUsuFotoPerfil());
        usuario.setUsuNome(dto.getUsuNome());
        usuario.setUsuDataNascimento(dto.getUsuDataNascimento());
        usuario.setUsuStatus(dto.getUsuStatus());
        usuario.setUsuLinkPortifolio(dto.getUsuLinkPortifolio());
        usuario.setUsuLinkLinkedin(dto.getUsuLinkLinkedin());

        int linhasAfetadas = usuarioService.salvarNovoUsuario(credencial, usuario);

        if (linhasAfetadas > 0) {
            return new ResponseEntity<>("Usuário criado com sucesso!", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Falha ao criar usuário. Tente novamente.", HttpStatus.BAD_REQUEST);
        }
    }
}
