package com.scamboo.scambooJava.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scamboo.scambooJava.model.Chat;
import com.scamboo.scambooJava.model.Mensagem;
import com.scamboo.scambooJava.model.Usuario;
import com.scamboo.scambooJava.repository.ChatRepository;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    
    public List<Chat> listarChatsPorUsuario(Integer usuCodigo) {
        return chatRepository.listarChatsUsuario(usuCodigo);
    }

   
    public List<Mensagem> visualizarHistorico(Integer chaCodigo) {
        return chatRepository.visualizarHistoricoMensagens(chaCodigo);
    }
    
   
    public List<Usuario> listarMembros(Integer chaCodigo) {
        return chatRepository.listarMembrosChat(chaCodigo);
    }

    
    public Mensagem enviarMensagem(Mensagem mensagem) {
        return chatRepository.inserirMensagem(mensagem);
    }

 
    public Chat criarChat(Chat chat, Integer usuCodigoCriador) {
       
        return chatRepository.inserirChat(chat, usuCodigoCriador);
    }

 
    public void adicionarMembro(Integer chaCodigo, Integer usuCodigo) {
        chatRepository.adicionarMembroChat(chaCodigo, usuCodigo);
    }
}
