package com.scamboo.scambooJava.repository;

import com.scamboo.scambooJava.model.Avaliacao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AvaliacaoRepository {

    private final JdbcTemplate jdbc;
    public AvaliacaoRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }


    public Avaliacao inserirAvaliacao(Avaliacao ava){
        jdbc.update("CALL spInserirAvaliacao(?, ?, ?, ?)",
                ava.getNota(), ava.getMensagem() ,ava.getUsuCodigo(), ava.getSerCodigo());

        return ava;
    }
    
    public List<Avaliacao> avaliacoesFeitasPorUsuario(Long usuarioId) {
        return jdbc.query(
            "CALL spAvaliacoesFeitasPorUsuario(?)",
            new BeanPropertyRowMapper<>(Avaliacao.class),
            usuarioId
        );
    }
    // TODO: Deletar avaliação
    // Deletar avaliação
    public void deletarAvaliacao(int codigo) {
        jdbc.update("CALL spDeletarAvaliacao(?)", codigo);
    }
}
