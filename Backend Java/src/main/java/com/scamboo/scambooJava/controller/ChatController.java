package com.scamboo.scambooJava.controller;

import com.scamboo.scambooJava.model.Chat;
import com.scamboo.scambooJava.model.Mensagem;
import com.scamboo.scambooJava.model.Usuario;
import com.scamboo.scambooJava.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/usuario/{usuCodigo}")
    public ResponseEntity<List<Chat>> listarChatsUsuario(@PathVariable Integer usuCodigo) {
        List<Chat> chats = chatService.listarChatsPorUsuario(usuCodigo);
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/{chaCodigo}/mensagens")
    public ResponseEntity<List<Mensagem>> visualizarHistoricoMensagens(@PathVariable Integer chaCodigo) {
        List<Mensagem> mensagens = chatService.visualizarHistorico(chaCodigo);
        return ResponseEntity.ok(mensagens);
    }
    
    @GetMapping("/{chaCodigo}/membros")
    public ResponseEntity<List<Usuario>> listarMembrosChat(@PathVariable Integer chaCodigo) {
        List<Usuario> membros = chatService.listarMembros(chaCodigo);
        return ResponseEntity.ok(membros);
    }


    @PostMapping("/mensagem")
    public ResponseEntity<Mensagem> enviarMensagem(@RequestBody Mensagem mensagem) {
        if (mensagem.getChaCodigo() == null || mensagem.getUsuCodigo() == null || mensagem.getMenTextoMensagem() == null || mensagem.getMenTextoMensagem().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        Mensagem novaMensagem = chatService.enviarMensagem(mensagem);
        
        if (novaMensagem != null) {
            return new ResponseEntity<>(novaMensagem, HttpStatus.CREATED);
        } else {
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/criar/{usuCodigoCriador}")
    public ResponseEntity<Chat> criarChat(@PathVariable Integer usuCodigoCriador, @RequestBody Chat chat) {
        if (chat.getChaNome() == null || chat.getChaNome().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Chat novoChat = chatService.criarChat(chat, usuCodigoCriador);
        
        // Verifica se o Chat foi retornado (o que indica sucesso na criação)
        if (novoChat != null) {
            // Retorna o objeto Chat completo com o ID gerado pelo banco
            return new ResponseEntity<>(novoChat, HttpStatus.CREATED);
        } else {
            // Caso a service/repository não retorne o Chat por algum erro
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{chaCodigo}/membros/{usuCodigo}")
    public ResponseEntity<Void> adicionarMembro(@PathVariable Integer chaCodigo, @PathVariable Integer usuCodigo) {
        chatService.adicionarMembro(chaCodigo, usuCodigo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
