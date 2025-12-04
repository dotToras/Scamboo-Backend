package com.scamboo.scambooJava.controller;

import com.scamboo.scambooJava.model.Avaliacao;
import com.scamboo.scambooJava.service.AvaliacaoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {


    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping
    public Avaliacao criar(@RequestBody Avaliacao avaliacao) {
        return avaliacaoService.criar(avaliacao);
    }


}
