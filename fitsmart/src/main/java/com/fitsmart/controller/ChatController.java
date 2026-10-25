package com.fitsmart.controller;

import com.fitsmart.dto.MensagemDTO;
import com.fitsmart.model.enums.TipoRemetente;
import com.fitsmart.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chats/messages")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MensagemDTO>> getChatHistory(
            @PathVariable Long userId,
            @RequestParam(value = "currentUserId", defaultValue = "1") Long currentUserId) {
        
        List<MensagemDTO> mensagens = chatService.obterHistorico(currentUserId, userId);
        return ResponseEntity.ok(mensagens);
    }

    @PostMapping
    public ResponseEntity<MensagemDTO> sendMessage(@RequestBody Map<String, Object> payload) {
        Long remetenteId = 1L; 
        TipoRemetente tipo = TipoRemetente.ALUNO;

        MensagemDTO mensagemEnviada = chatService.enviarMensagem(payload, remetenteId, tipo);
        return ResponseEntity.status(HttpStatus.CREATED).body(mensagemEnviada);
    }

    @PatchMapping("/user/{senderId}/read")
    public ResponseEntity<Void> markAsRead(
            @PathVariable Long senderId,
            @RequestParam(value = "currentUserId", defaultValue = "1") Long currentUserId) {
        
        chatService.marcarComoLidas(senderId, currentUserId);
        return ResponseEntity.noContent().build();
    }
}