package com.fitsmart.service;

import com.fitsmart.dto.MensagemDTO;
import com.fitsmart.model.enums.TipoRemetente;
import com.fitsmart.model.Mensagem;
import com.fitsmart.repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private MensagemRepository mensagemRepository;

    /**
     * Recupera o histórico de conversas trocadas entre dois utilizadores.
     * @param currentUserId ID do utilizador autenticado
     * @param targetUserId ID do interlocutor (Aluno ou Professor)
     */
    @Transactional(readOnly = true)
    public List<MensagemDTO> obterHistorico(Long currentUserId, Long targetUserId) {
        List<Mensagem> mensagens = mensagemRepository.findHistoricoConversa(currentUserId, targetUserId);
        return mensagens.stream()
                .map(MensagemDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Persiste e envia uma nova mensagem.
     * @param payload Dados enviados pelo app (destinatarioId, texto, etc.)
     * @param senderId ID do utilizador que enviou a mensagem
     * @param tipoRemetente Tipo de conta (ALUNO ou PROFESSOR)
     */
    @Transactional
    public MensagemDTO enviarMensagem(Map<String, Object> payload, Long senderId, TipoRemetente tipoRemetente) {
        Long destinatarioId = Long.valueOf(payload.get("destinatarioId").toString());
        String texto = payload.get("texto").toString();

        Mensagem novaMensagem = new Mensagem(senderId, destinatarioId, texto, tipoRemetente);
        Mensagem mensagemSalva = mensagemRepository.save(novaMensagem);

        return new MensagemDTO(mensagemSalva);
    }

    /**
     * Atualiza as mensagens não lidas de um determinado remetente para lidas.
     * @param senderId ID do remetente das mensagens
     * @param currentUserId ID do destinatário atual
     */
    @Transactional
    public void marcarComoLidas(Long senderId, Long currentUserId) {
        List<Mensagem> mensagens = mensagemRepository.findHistoricoConversa(currentUserId, senderId);
        for (Mensagem m : mensagens) {
            if (m.getRemetenteId().equals(senderId) && !m.isLida()) {
                m.setLida(true);
            }
        }
        mensagemRepository.saveAll(mensagens);
    }
}