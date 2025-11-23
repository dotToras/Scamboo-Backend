package com.scamboo.scambooJava.dto;

import lombok.Data;

import java.time.LocalDate;
// classe criada apenas para transitar os objetos
@Data
public class UsuarioCadastroDTO {

    private String email;
    private String senha;
    private Boolean tipo;

    private String usuFotoPerfil;
    private String usuNome;
    private LocalDate usuDataNascimento;
    private Boolean usuStatus;
    private String usuLinkPortifolio;
    private String usuLinkLinkedin;

}
