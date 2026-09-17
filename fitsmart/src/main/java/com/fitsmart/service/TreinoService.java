package com.fitsmart.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AtualizarTreinoDTO;
import com.fitsmart.dto.CriarTreinoDTO;
import com.fitsmart.dto.ItemTreinoInputDTO;
import com.fitsmart.dto.ItemTreinoResponseDTO;
import com.fitsmart.dto.TreinoResponseDTO;
import com.fitsmart.model.Aluno;
import com.fitsmart.model.Exercicio;
import com.fitsmart.model.ItemTreino;
import com.fitsmart.model.Professor;
import com.fitsmart.model.StatusTreino;
import com.fitsmart.model.Treino;
import com.fitsmart.repository.AlunoRepository;
import com.fitsmart.repository.ExercicioRepository;
import com.fitsmart.repository.ProfessorRepository;
import com.fitsmart.repository.TreinoRepository;

@Service
public class TreinoService {

    private final TreinoRepository treinoRepository;
    private final ExercicioRepository exercicioRepository;
    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;

    public TreinoService(
            TreinoRepository treinoRepository,
            ExercicioRepository exercicioRepository,
            AlunoRepository alunoRepository,
            ProfessorRepository professorRepository) {
        this.treinoRepository = treinoRepository;
        this.exercicioRepository = exercicioRepository;
        this.alunoRepository = alunoRepository;
        this.professorRepository = professorRepository;
    }

    @Transactional
    public TreinoResponseDTO criarRascunho(Long professorUserId, Long alunoId, CriarTreinoDTO dto) {
        Professor professor = professorRepository.findByUser_Id(professorUserId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado para o usuário: " + professorUserId));

        Aluno aluno = alunoRepository.findByIdAndProfessor_User_Id(alunoId, professorUserId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado ou não vinculado a este professor"));

        Treino treino = new Treino();
        treino.setAluno(aluno);
        treino.setProfessor(professor);
        treino.setObservacoes(dto.getObservacoes());
        treino.setStatus(StatusTreino.RASCUNHO);
        treino.setDataCriacao(LocalDateTime.now());

        if (dto.getItens() != null) {
            for (ItemTreinoInputDTO itemDto : dto.getItens()) {
                ItemTreino item = criarItemTreino(itemDto);
                treino.adicionarItem(item);
            }
        }

        Treino treinoSalvo = treinoRepository.save(treino);
        return converterParaDTO(treinoSalvo);
    }

    @Transactional(readOnly = true)
    public List<TreinoResponseDTO> listarTreinosDoAluno(Long professorUserId, Long alunoId) {
        return treinoRepository.findAllByAluno_IdAndProfessor_User_IdOrderByDataCriacaoDesc(alunoId, professorUserId)
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TreinoResponseDTO buscarTreinoPorId(Long professorUserId, Long alunoId, Long treinoId) {
        Treino treino = treinoRepository.findByIdAndAluno_IdAndProfessor_User_Id(treinoId, alunoId, professorUserId)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        return converterParaDTO(treino);
    }

    @Transactional
    public TreinoResponseDTO atualizarTreino(Long professorUserId, Long alunoId, Long treinoId, AtualizarTreinoDTO dto) {
        Treino treino = treinoRepository.findByIdAndAluno_IdAndProfessor_User_Id(treinoId, alunoId, professorUserId)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));

        treino.setObservacoes(dto.getObservacoes());
        
        // Atualiza a lista de itens sem alterar a tabela Exercicio original
        treino.getItens().clear();

        if (dto.getItens() != null) {
            for (ItemTreinoInputDTO itemDto : dto.getItens()) {
                ItemTreino item = criarItemTreino(itemDto);
                treino.adicionarItem(item);
            }
        }

        Treino treinoAtualizado = treinoRepository.save(treino);
        return converterParaDTO(treinoAtualizado);
    }

    @Transactional
    public TreinoResponseDTO publicarTreino(Long professorUserId, Long alunoId, Long treinoId) {
        Treino treino = treinoRepository.findByIdAndAluno_IdAndProfessor_User_Id(treinoId, alunoId, professorUserId)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));

        treino.setStatus(StatusTreino.PUBLICADO);
        treino.setDataPublicacao(LocalDateTime.now());

        Treino treinoPublicado = treinoRepository.save(treino);
        return converterParaDTO(treinoPublicado);
    }

    private ItemTreino criarItemTreino(ItemTreinoInputDTO itemDto) {
        Exercicio exercicio = exercicioRepository.findById(itemDto.getExercicioId())
                .orElseThrow(() -> new RuntimeException("Exercício não encontrado com ID: " + itemDto.getExercicioId()));

        ItemTreino item = new ItemTreino();
        item.setExercicio(exercicio);
        item.setOrdem(itemDto.getOrdem());
        item.setSeries(itemDto.getSeries());
        item.setRepeticoes(itemDto.getRepeticoes());
        item.setCarga(itemDto.getCarga());
        item.setTempoSegundos(itemDto.getTempoSegundos());
        item.setObservacoes(itemDto.getObservacoes());
        return item;
    }

    private TreinoResponseDTO converterParaDTO(Treino treino) {
        TreinoResponseDTO dto = new TreinoResponseDTO();
        dto.setId(treino.getId());
        dto.setStatus(treino.getStatus());
        dto.setDataCriacao(treino.getDataCriacao());
        dto.setDataPublicacao(treino.getDataPublicacao());
        dto.setObservacoes(treino.getObservacoes());
        dto.setAlunoId(treino.getAluno().getId());
        dto.setProfessorId(treino.getProfessor().getId());

        List<ItemTreinoResponseDTO> itensDTO = treino.getItens().stream().map(item -> {
            ItemTreinoResponseDTO itemDto = new ItemTreinoResponseDTO();
            itemDto.setId(item.getId());
            itemDto.setExercicioId(item.getExercicio().getId());
            itemDto.setExercicioNome(item.getExercicio().getNome());
            itemDto.setOrdem(item.getOrdem());
            itemDto.setSeries(item.getSeries());
            itemDto.setRepeticoes(item.getRepeticoes());
            itemDto.setCarga(item.getCarga());
            itemDto.setTempoSegundos(item.getTempoSegundos());
            itemDto.setObservacoes(item.getObservacoes());
            return itemDto;
        }).collect(Collectors.toList());

        dto.setItens(itensDTO);
        return dto;
    }
}