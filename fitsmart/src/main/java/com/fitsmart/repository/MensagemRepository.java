package com.fitsmart.repository;

import com.fitsmart.model.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MensagemRepository extends JpaRepository<Mensagem, Long> {

    // Busca histórico completo entre dois utilizadores (remetente e destinatário em ambas direções)
    @Query("SELECT m FROM Mensagem m WHERE " +
           "(m.remetenteId = :userId1 AND m.destinatarioId = :userId2) OR " +
           "(m.remetenteId = :userId2 AND m.destinatarioId = :userId1) " +
           "ORDER BY m.dataEnvio ASC")
    List<Mensagem> findHistoricoConversa(@Param("userId1") Long userId1, @Param("userId2") Long userId2);
}