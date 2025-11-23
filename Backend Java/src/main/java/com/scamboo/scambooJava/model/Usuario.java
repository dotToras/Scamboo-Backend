package com.scamboo.scambooJava.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class Usuario {

    private Long usuCodigo;
    private String usuFotoPerfil;
    private String usuNome;
    private LocalDate usuDataNascimento;
    private Integer usuSaldoMoeda;
    private Boolean usuStatus;
    private String usuLinkPortifolio;
    private String usuLinkLinkedin;
    private Long creCodigo;
}
