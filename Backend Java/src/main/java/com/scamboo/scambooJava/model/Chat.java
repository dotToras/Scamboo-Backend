package com.scamboo.scambooJava.model;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Gera getters, setters, toString, etc.
@NoArgsConstructor // cria um construtor q n recebe parametros
public class Chat {
    private Integer chaCodigo;
    private String chaNome;
    private String charDescricao;
    // Lista de mensagens do chat, preenchida ao visualizar o histórico
    private List<Mensagem> mensagens;
}