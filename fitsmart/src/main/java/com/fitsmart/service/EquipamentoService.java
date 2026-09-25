package com.fitsmart.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.EquipamentoResponse;
import com.fitsmart.dto.SalvarEquipamentoRequest;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.Equipamento;
import com.fitsmart.repository.EquipamentoRepository;

@Service
public class EquipamentoService {

    private final EquipamentoRepository equipamentoRepository;

    public EquipamentoService(
            EquipamentoRepository equipamentoRepository) {

        this.equipamentoRepository = equipamentoRepository;
    }

    private Equipamento findById(Long equipamentoId) {

        return equipamentoRepository
                .findById(equipamentoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipamento não encontrado"
                        )
                );
    }

    private EquipamentoResponse convertToResponse(
            Equipamento equipamento) {

        return new EquipamentoResponse(
                equipamento.getId(),
                equipamento.getNome(),
                equipamento.getTipo(),
                equipamento.isAtivo()
        );
    }

    private void atualizarDados(
            Equipamento equipamento,
            SalvarEquipamentoRequest request) {

        equipamento.setNome(request.nome().trim());
        equipamento.setTipo(request.tipo());
    }

    @Transactional
    public EquipamentoResponse createEquipamento(
            SalvarEquipamentoRequest request) {

        Equipamento equipamento = new Equipamento();

        atualizarDados(equipamento, request);
        equipamento.setAtivo(true);

        return convertToResponse(
                equipamentoRepository.save(equipamento)
        );
    }

    @Transactional
    public EquipamentoResponse updateEquipamento(
            Long equipamentoId,
            SalvarEquipamentoRequest request) {

        Equipamento equipamento = findById(equipamentoId);

        atualizarDados(equipamento, request);

        return convertToResponse(
                equipamentoRepository.save(equipamento)
        );
    }

    @Transactional
    public EquipamentoResponse updateStatus(
            Long equipamentoId,
            boolean ativo) {

        Equipamento equipamento = findById(equipamentoId);

        equipamento.setAtivo(ativo);

        return convertToResponse(
                equipamentoRepository.save(equipamento)
        );
    }

    @Transactional(readOnly = true)
    public List<EquipamentoResponse> listAll() {

        return equipamentoRepository
                .findAllByOrderByNomeAsc()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EquipamentoResponse> listAtivos() {

        return equipamentoRepository
                .findAllByAtivoTrueOrderByNomeAsc()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }
}