package com.scamboo.scambooJava.service;

import com.scamboo.scambooJava.model.Avaliacao;
import com.scamboo.scambooJava.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaRepo;

    public Avaliacao criar(Avaliacao ava) {
        return avaRepo.inserirAvaliacao(ava);
    }
}
