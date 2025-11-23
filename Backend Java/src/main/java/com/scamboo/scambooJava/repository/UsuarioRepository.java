package com.scamboo.scambooJava.repository;


import com.scamboo.scambooJava.model.Credencial;
import com.scamboo.scambooJava.model.Usuario;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepository {

    private final JdbcTemplate jdbcTemplate;

    public UsuarioRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int inserirUsuarioCredencial(Credencial credencial, Usuario usuario) {

        String query = "{CALL spInserirUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        return jdbcTemplate.update(query,
                // Dados de Credencial
                credencial.getEmail(),
                credencial.getSenha(),
                credencial.getTipo(),
                // Dados de Usuário
                usuario.getUsuFotoPerfil(),
                usuario.getUsuNome(),
                usuario.getUsuDataNascimento(),
                usuario.getUsuStatus(),
                usuario.getUsuLinkPortifolio(),
                usuario.getUsuLinkLinkedin()
        );
    }

}
