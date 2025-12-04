package com.scamboo.scambooJava.model;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Gera getters, setters, toString, etc.
@NoArgsConstructor // cria um construtor q n recebe parametros
public class Avaliacao {

    private Integer codigo;
    private Double  nota;
    private String  mensagem;
    private Integer usuCodigo;
    private Integer serCodigo;

}
