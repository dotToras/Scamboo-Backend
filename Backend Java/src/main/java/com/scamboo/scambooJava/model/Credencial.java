package com.scamboo.scambooJava.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data // Gera getters, setters, toString, etc.
@NoArgsConstructor // cria um construtor q n recebe parametros
public class Credencial {

    private Long codigo;
    private String email;
    private String senha;
    private LocalDate dataCadastro;
    private Boolean tipo;

}
