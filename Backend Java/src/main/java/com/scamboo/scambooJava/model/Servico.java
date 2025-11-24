package com.scamboo.scambooJava.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Gera getters, setters, toString, etc.
@NoArgsConstructor // cria um construtor q n recebe parametros
public class Servico {

    private Long codigo;
    private String nome;
    private String descricao;
    private LocalDate dataPedido;
    private LocalDate dataExpiracao;
    private Boolean concluido;
    private Integer usu_codigo;
    private Integer cat_codigo;

}
