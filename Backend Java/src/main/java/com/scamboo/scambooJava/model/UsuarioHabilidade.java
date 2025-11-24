package com.scamboo.scambooJava.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Gera getters, setters, toString, etc.
@NoArgsConstructor // cria um construtor q n recebe parametros
public class UsuarioHabilidade {

    private Long hab_codigo;
    private Long usu_codigo;

}
