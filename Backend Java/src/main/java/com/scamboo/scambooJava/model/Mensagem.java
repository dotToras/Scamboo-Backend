package com.scamboo.scambooJava.model;

import lombok.Data;
import java.time.LocalDateTime;


@Data
public class Mensagem {
    private Integer menCodigo;
    private String menTextoMensagem;
    private LocalDateTime menDataEnvio;
    private Integer chaCodigo;
    
    /* Dados autor */ 
    private Integer usuCodigo; // Código do autor
    private String usuNome; // Nome do autor (para visualização)
    private String usuFotoPerfil; // Foto do autor (para visualização)
}