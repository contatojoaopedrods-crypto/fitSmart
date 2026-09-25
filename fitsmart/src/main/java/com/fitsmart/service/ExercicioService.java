package com.fitsmart.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.dto.ExercicioResponse.AcaoArticularVinculadaResponse;
import com.fitsmart.dto.ExercicioResponse.EquipamentoVinculadoResponse;
import com.fitsmart.dto.ExercicioResponse.GrupoMuscularVinculadoResponse;
import com.fitsmart.dto.SalvarExercicioRequest;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.AcaoArticular;
import com.fitsmart.model.Equipamento;
import com.fitsmart.model.Exercicio;
import com.fitsmart.model.ExercicioAcaoArticular;
import com.fitsmart.model.ExercicioEquipamento;
import com.fitsmart.model.ExercicioGrupoMuscular;
import com.fitsmart.model.enums.GrupoMuscular;
import com.fitsmart.repository.AcaoArticularRepository;
import com.fitsmart.repository.EquipamentoRepository;
import com.fitsmart.repository.ExercicioRepository;

@Service
public class ExercicioService {

    private final ExercicioRepository exercicioRepository;
    private final EquipamentoRepository equipamentoRepository;
    private final AcaoArticularRepository acaoArticularRepository;

    public ExercicioService(
            ExercicioRepository exercicioRepository,
            EquipamentoRepository equipamentoRepository,
            AcaoArticularRepository acaoArticularRepository) {

        this.exercicioRepository = exercicioRepository;
        this.equipamentoRepository = equipamentoRepository;
        this.acaoArticularRepository = acaoArticularRepository;
    }

    private Exercicio findById(Long exercicioId) {

        return exercicioRepository
                .findById(exercicioId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Exercício não encontrado"
                        )
                );
    }

    private Exercicio findAtivoById(Long exercicioId) {

        return exercicioRepository
                .findByIdAndAtivoTrue(exercicioId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Exercício não encontrado"
                        )
                );
    }

    private Equipamento findEquipamentoAtivo(
            Long equipamentoId) {

        return equipamentoRepository
                .findByIdAndAtivoTrue(equipamentoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipamento não encontrado"
                        )
                );
    }

    private AcaoArticular findAcaoArticular(
            Long acaoArticularId) {

        return acaoArticularRepository
                .findById(acaoArticularId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ação articular não encontrada"
                        )
                );
    }

    private void aplicarDadosPrincipais(
            Exercicio exercicio,
            SalvarExercicioRequest request) {

        exercicio.setNome(request.nome().trim());
        exercicio.setDescricao(request.descricao());
        exercicio.setCaminhoImagem(request.caminhoImagem());
        exercicio.setUrlVideo(request.urlVideo());
        exercicio.setPlanoMovimento(
                request.planoMovimento()
        );
        exercicio.setCargaAxial(request.cargaAxial());
        exercicio.setPressaoAbdominal(
                request.pressaoAbdominal()
        );
        exercicio.setEstabilidadeExigida(
                request.estabilidadeExigida()
        );
        exercicio.setNivelExperiencia(
                request.nivelExperiencia()
        );
        exercicio.setDificuldade(request.dificuldade());

        exercicio.setImpactoCervical(
                request.impactoCervical()
        );
        exercicio.setImpactoOmbro(
                request.impactoOmbro()
        );
        exercicio.setImpactoCotovelo(
                request.impactoCotovelo()
        );
        exercicio.setImpactoPunho(
                request.impactoPunho()
        );
        exercicio.setImpactoToracica(
                request.impactoToracica()
        );
        exercicio.setImpactoLombar(
                request.impactoLombar()
        );
        exercicio.setImpactoQuadril(
                request.impactoQuadril()
        );
        exercicio.setImpactoJoelho(
                request.impactoJoelho()
        );
        exercicio.setImpactoTornozelo(
                request.impactoTornozelo()
        );
    }

    private void adicionarEquipamentos(
            Exercicio exercicio,
            SalvarExercicioRequest request) {

        Set<Long> idsAdicionados = new HashSet<>();

        for (SalvarExercicioRequest.EquipamentoItem item
                : request.equipamentos()) {

            if (!idsAdicionados.add(item.equipamentoId())) {
                throw badRequest(
                        "Um equipamento não pode ser repetido"
                );
            }

            Equipamento equipamento =
                    findEquipamentoAtivo(
                            item.equipamentoId()
                    );

            exercicio.addEquipamento(
                    new ExercicioEquipamento(equipamento)
            );
        }
    }

    private void adicionarGruposMusculares(
            Exercicio exercicio,
            SalvarExercicioRequest request) {

        Set<GrupoMuscular> gruposAdicionados =
                new HashSet<>();

        for (SalvarExercicioRequest.GrupoMuscularItem item
                : request.gruposMusculares()) {

            if (!gruposAdicionados.add(
                    item.grupoMuscular())) {

                throw badRequest(
                        "Um grupo muscular não pode ser repetido"
                );
            }

            exercicio.addGrupoMuscular(
                    new ExercicioGrupoMuscular(
                            item.grupoMuscular(),
                            item.nivelAtivacao()
                    )
            );
        }
    }

    private void adicionarAcoesArticulares(
            Exercicio exercicio,
            SalvarExercicioRequest request) {

        Set<Long> idsAdicionados = new HashSet<>();

        for (SalvarExercicioRequest.AcaoArticularItem item
                : request.acoesArticulares()) {

            if (!idsAdicionados.add(
                    item.acaoArticularId())) {

                throw badRequest(
                        "Uma ação articular não pode ser repetida"
                );
            }

            AcaoArticular acaoArticular =
                    findAcaoArticular(
                            item.acaoArticularId()
                    );

            exercicio.addAcaoArticular(
                    new ExercicioAcaoArticular(
                            acaoArticular,
                            item.amplitudeMovimento()
                    )
            );
        }
    }

    private void adicionarRelacionamentos(
            Exercicio exercicio,
            SalvarExercicioRequest request) {

        adicionarEquipamentos(exercicio, request);
        adicionarGruposMusculares(exercicio, request);
        adicionarAcoesArticulares(exercicio, request);
    }

    private ResponseStatusException badRequest(
            String mensagem) {

        return new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                mensagem
        );
    }

    private ExercicioResponse convertToResponse(
            Exercicio exercicio) {

        List<EquipamentoVinculadoResponse>
                equipamentos = exercicio
                        .getEquipamentos()
                        .stream()
                        .map(vinculo ->
                                new EquipamentoVinculadoResponse(
                                        vinculo.getId(),
                                        vinculo.getEquipamento().getId(),
                                        vinculo.getEquipamento().getNome(),
                                        vinculo.getEquipamento().getTipo()
                                )
                        )
                        .toList();

        List<GrupoMuscularVinculadoResponse>
                gruposMusculares = exercicio
                        .getGruposMusculares()
                        .stream()
                        .map(vinculo ->
                                new GrupoMuscularVinculadoResponse(
                                        vinculo.getId(),
                                        vinculo.getGrupoMuscular(),
                                        vinculo.getNivelAtivacao()
                                )
                        )
                        .toList();

        List<AcaoArticularVinculadaResponse>
                acoesArticulares = exercicio
                        .getAcoesArticulares()
                        .stream()
                        .map(vinculo -> {
                            AcaoArticular acao =
                                    vinculo.getAcaoArticular();

                            return new AcaoArticularVinculadaResponse(
                                    vinculo.getId(),
                                    acao.getId(),
                                    acao.getNome(),
                                    acao.getArticulacao(),
                                    acao.getPlanoMovimento(),
                                    vinculo.getAmplitudeMovimento()
                            );
                        })
                        .toList();

        return new ExercicioResponse(
                exercicio.getId(),
                exercicio.getNome(),
                exercicio.getDescricao(),
                exercicio.getCaminhoImagem(),
                exercicio.getUrlVideo(),
                exercicio.getPlanoMovimento(),
                exercicio.getCargaAxial(),
                exercicio.getPressaoAbdominal(),
                exercicio.getEstabilidadeExigida(),
                exercicio.getNivelExperiencia(),
                exercicio.getDificuldade(),
                exercicio.getImpactoCervical(),
                exercicio.getImpactoOmbro(),
                exercicio.getImpactoCotovelo(),
                exercicio.getImpactoPunho(),
                exercicio.getImpactoToracica(),
                exercicio.getImpactoLombar(),
                exercicio.getImpactoQuadril(),
                exercicio.getImpactoJoelho(),
                exercicio.getImpactoTornozelo(),
                exercicio.isAtivo(),
                equipamentos,
                gruposMusculares,
                acoesArticulares
        );
    }

    @Transactional
    public ExercicioResponse createExercicio(
            SalvarExercicioRequest request) {

        Exercicio exercicio = new Exercicio();

        aplicarDadosPrincipais(exercicio, request);
        exercicio.setAtivo(true);

        adicionarRelacionamentos(exercicio, request);

        Exercicio exercicioSalvo =
                exercicioRepository.save(exercicio);

        return convertToResponse(exercicioSalvo);
    }

    @Transactional
    public ExercicioResponse updateExercicio(
            Long exercicioId,
            SalvarExercicioRequest request) {

        Exercicio exercicio = findById(exercicioId);

        exercicio.limparRelacionamentos();

        exercicioRepository.flush();

        aplicarDadosPrincipais(exercicio, request);
        adicionarRelacionamentos(exercicio, request);

        Exercicio exercicioAtualizado =
                exercicioRepository.save(exercicio);

        return convertToResponse(exercicioAtualizado);
    }

    @Transactional
    public ExercicioResponse updateStatus(
            Long exercicioId,
            boolean ativo) {

        Exercicio exercicio = findById(exercicioId);

        exercicio.setAtivo(ativo);

        return convertToResponse(
                exercicioRepository.save(exercicio)
        );
    }

    @Transactional(readOnly = true)
    public List<ExercicioResponse> listAll() {

        return exercicioRepository
                .findAllByOrderByNomeAsc()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ExercicioResponse> listAtivos() {

        return exercicioRepository
                .findAllByAtivoTrueOrderByNomeAsc()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ExercicioResponse getAtivo(
            Long exercicioId) {

        return convertToResponse(
                findAtivoById(exercicioId)
        );
    }
}