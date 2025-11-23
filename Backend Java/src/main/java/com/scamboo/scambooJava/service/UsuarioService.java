package com.scamboo.scambooJava.service;

import com.scamboo.scambooJava.model.Credencial;
import com.scamboo.scambooJava.model.Usuario;
import com.scamboo.scambooJava.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public int salvarNovoUsuario(Credencial credencial, Usuario usuario) {
        return repository.inserirUsuarioCredencial(credencial, usuario);
    }

}
