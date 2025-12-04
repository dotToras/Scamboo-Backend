package com.scamboo.scambooJava.repository;

import com.scamboo.scambooJava.model.Chat;
import com.scamboo.scambooJava.model.Mensagem;
import com.scamboo.scambooJava.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Repositório para interações com as procedures do banco de dados relacionadas a Chat e Mensagem.
 */
@Repository
public class ChatRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ChatRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    private static final class MensagemRowMapper implements RowMapper<Mensagem> {
        @Override
        public Mensagem mapRow(ResultSet rs, int rowNum) throws SQLException {
            Mensagem msg = new Mensagem();
            msg.setMenCodigo(rs.getInt("men_codigo"));
            msg.setMenTextoMensagem(rs.getString("men_textoMensagem"));
         
            msg.setMenDataEnvio(rs.getTimestamp("men_dataEnvio").toLocalDateTime()); 
            msg.setUsuCodigo(rs.getInt("usu_codigo"));
            msg.setUsuNome(rs.getString("usu_Nome"));
            msg.setUsuFotoPerfil(rs.getString("usu_fotoPerfil"));
            msg.setChaCodigo(rs.getInt("cha_codigo"));
            return msg;
        }
    }

    private static final class ChatRowMapper implements RowMapper<Chat> {
        @Override
        public Chat mapRow(ResultSet rs, int rowNum) throws SQLException {
            Chat chat = new Chat();
            chat.setChaCodigo(rs.getInt("cha_codigo"));
            chat.setChaNome(rs.getString("cha_nome"));
            chat.setCharDescricao(rs.getString("char_descricao"));
            return chat;
        }
    }
    
    private static final class UsuarioRowMapper implements RowMapper<Usuario> {
        @Override
        public Usuario mapRow(ResultSet rs, int rowNum) throws SQLException {
            Usuario usuario = new Usuario();
            usuario.setUsuCodigo(rs.getInt("usu_codigo"));
            usuario.setUsuNome(rs.getString("usu_nome"));
            usuario.setUsuFotoPerfil(rs.getString("usu_fotoPerfil"));
            return usuario;
        }
    }

    // Mapper para capturar apenas um valor Integer (o ID de retorno)
    private static final class IntegerRowMapper implements RowMapper<Integer> {
        @Override
        public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
            return rs.getInt(1); // Captura o primeiro valor do ResultSet
        }
    }


    public List<Chat> listarChatsUsuario(Integer usuCodigo) {
        String sql = "{CALL spListarChatsUsuario(?)}";
        return jdbcTemplate.query(sql, new ChatRowMapper(), usuCodigo);
    }

    
    public List<Mensagem> visualizarHistoricoMensagens(Integer chaCodigo) {
        String sql = "{CALL spVisualizarHistoricoMensagens(?)}";
        return jdbcTemplate.query(sql, new MensagemRowMapper(), chaCodigo);
    }

    
    public List<Usuario> listarMembrosChat(Integer chaCodigo) {
        String sql = "{CALL spListarMembrosChat(?)}";
        return jdbcTemplate.query(sql, new UsuarioRowMapper(), chaCodigo);
    }

    
    public Mensagem inserirMensagem(Mensagem mensagem) {
        String sql = "{CALL spInserirMensagem(?, ?, ?)}";
        
        try {
            // Usa queryForObject para capturar o SELECT retornado pela procedure
            return jdbcTemplate.queryForObject(sql, new MensagemRowMapper(),
                mensagem.getMenTextoMensagem(), 
                mensagem.getChaCodigo(), 
                mensagem.getUsuCodigo()
            );
        } catch (org.springframework.dao.EmptyResultDataAccessException e) {
    
            return null;
        }
    }


    
    public Chat inserirChat(Chat chat, Integer usuCodigoCriador) {

        String sql = "{CALL spInserirChat(?, ?, ?)}"; 

        try {
            return jdbcTemplate.queryForObject(sql, new ChatRowMapper(),
                chat.getChaNome(), 
                chat.getCharDescricao(), 
                usuCodigoCriador
            );
        } catch (org.springframework.dao.EmptyResultDataAccessException e) {
            // Caso o procedimento não retorne nenhum objeto, retorna null
            return null;
        }
    }


    public void adicionarMembroChat(Integer chaCodigo, Integer usuCodigo) {
        String sql = "{CALL spAdicionarUsuarioChat(?, ?)}";
        jdbcTemplate.update(sql, chaCodigo, usuCodigo);
    }
}