package com.fitsmart.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AvaliacaoCompletaResponse;
import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.dto.RecomendacaoExercicioResponse;
import com.fitsmart.dto.ResultadoRecomendacaoResponse;
import com.fitsmart.model.enums.ClassificacaoRecomendacao;
import com.fitsmart.model.enums.Objetivo;
import com.fitsmart.service.ContextoRecomendacaoService.ContextoRecomendacao;

@Service
public class MotorRecomendacaoService {

    private static final String AVISO_PADRAO =
            "Resultado de apoio à decisão, baseado em heurísticas "
            + "do MVP sem validação clínica. A pontuação não representa "
            + "probabilidade de lesão ou liberação médica. "
            + "O professor deve revisar, modificar e aprovar o treino.";

    private final ContextoRecomendacaoService contextoService;
    private final ExercicioService exercicioService;
    private final CalculadoraCompatibilidadeService calculadora;
    private final RegraDorService regraDorService;
    private final RegraMobilidadeService regraMobilidadeService;
    private final RegraBiomecanicaService regraBiomecanicaService;
    private final RegraLesaoService regraLesaoService;
    private final RegraExperienciaService regraExperienciaService;

    public MotorRecomendacaoService(
            ContextoRecomendacaoService contextoService,
            ExercicioService exercicioService,
            CalculadoraCompatibilidadeService calculadora,
            RegraDorService regraDorService,
            RegraMobilidadeService regraMobilidadeService,
            RegraBiomecanicaService regraBiomecanicaService,
            RegraLesaoService regraLesaoService,
            RegraExperienciaService regraExperienciaService) {

        this.contextoService = contextoService;
        this.exercicioService = exercicioService;
        this.calculadora = calculadora;
        this.regraDorService = regraDorService;
        this.regraMobilidadeService = regraMobilidadeService;
        this.regraBiomecanicaService = regraBiomecanicaService;
        this.regraLesaoService = regraLesaoService;
        this.regraExperienciaService = regraExperienciaService;
    }

    @Transactional(readOnly = true)
    public ResultadoRecomendacaoResponse gerarRecomendacoes(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        /*
         * O contexto verifica o vínculo entre professor,
         * aluno e avaliação, além das pendências.
         */
        ContextoRecomendacao contexto =
                contextoService.preparar(
                        professorUserId,
                        alunoId,
                        avaliacaoId
                );

        /*
         * Se a avaliação não puder ser utilizada,
         * não consulta nem pontua os exercícios.
         */
        if (contexto.geracaoBloqueada()) {

            String aviso =
                    "Geração bloqueada: "
                    + String.join(
                            " ",
                            contexto.motivosBloqueio()
                    )
                    + " "
                    + AVISO_PADRAO;

            return montarResultado(
                    contexto,
                    aviso,
                    List.of()
            );
        }

        List<ExercicioResponse> exercicios =
                exercicioService.listAtivos();

        List<RecomendacaoExercicioResponse> recomendacoes =
                exercicios.stream()
                        .map(exercicio ->
                                analisarExercicio(
                                        exercicio,
                                        contexto
                                )
                        )
                        .sorted(ordenacao())
                        .toList();

        String aviso = AVISO_PADRAO;

        if (recomendacoes.isEmpty()) {

            aviso =
                    "Nenhum exercício ativo foi encontrado no catálogo. "
                    + AVISO_PADRAO;

        } else if (recomendacoes.stream().allMatch(item ->
                item.classificacao()
                == ClassificacaoRecomendacao.NAO_RECOMENDADO)) {

            aviso =
                    "Todos os exercícios analisados foram classificados "
                    + "como não recomendados pelas regras do MVP. "
                    + "Consulte os motivos de cada item. "
                    + AVISO_PADRAO;
        }

        return montarResultado(
                contexto,
                aviso,
                recomendacoes
        );
    }

    private RecomendacaoExercicioResponse analisarExercicio(
            ExercicioResponse exercicio,
            ContextoRecomendacao contexto) {

        AvaliacaoCompletaResponse avaliacao =
                Objects.requireNonNull(
                        contexto.avaliacaoCompleta(),
                        "O contexto liberado deve conter a avaliação completa"
                );

        List<DetalhePontuacaoResponse> detalhes =
                new ArrayList<>();

        var resultadoDor =
                regraDorService.analisar(
                        exercicio,
                        avaliacao.avaliacaoDor()
                );

        var resultadoMobilidade =
                regraMobilidadeService.analisar(
                        exercicio,
                        avaliacao.avaliacaoMobilidade()
                );

        var resultadoBiomecanica =
                regraBiomecanicaService.analisar(
                        exercicio,
                        avaliacao.avaliacaoBiomecanica()
                );

        var resultadoLesao =
                regraLesaoService.analisar(
                        exercicio,
                        contexto.avaliacaoFisica().alunoId(),
                        avaliacao.historicoLesoes()
                );

        var resultadoExperiencia =
                regraExperienciaService.analisar(
                        exercicio,
                        contexto.nivelExperienciaAluno()
                );

        detalhes.addAll(resultadoDor.detalhes());
        detalhes.addAll(resultadoMobilidade.detalhes());
        detalhes.addAll(resultadoBiomecanica.detalhes());
        detalhes.addAll(resultadoLesao.detalhes());
        detalhes.addAll(resultadoExperiencia.detalhes());

        /*
         * Qualquer bloqueio prevalece sobre a média,
         * independentemente das outras penalizações.
         */
        boolean bloqueado =
                resultadoDor.bloqueado()
                || resultadoMobilidade.bloqueado()
                || resultadoBiomecanica.bloqueado()
                || resultadoLesao.bloqueado()
                || resultadoExperiencia.bloqueado();

        List<Objetivo> objetivosExercicio =
                List.copyOf(
                        Objects.requireNonNull(
                                exercicio.objetivos(),
                                "A lista de objetivos do exercício é obrigatória"
                        )
                );

        Objetivo objetivoAluno =
                contexto.avaliacaoFisica().objetivo();

        boolean objetivoCompativel =
                objetivosExercicio.contains(objetivoAluno);

        /*
         * Exercícios antigos podem estar sem objetivos.
         * Nesse caso, o cadastro precisa ser completado
         * antes de o exercício ser sugerido.
         */
        if (objetivosExercicio.isEmpty()) {

            bloqueado = true;

            detalhes.add(
                    new DetalhePontuacaoResponse(
                            "CATALOGO_SEM_OBJETIVOS_001",
                            null,
                            0,
                            "O exercício não possui objetivos cadastrados. "
                            + "Complete o cadastro antes de utilizá-lo "
                            + "na recomendação."
                    )
            );

        } else if (!objetivoCompativel) {

            /*
             * A diferença de objetivo é informativa.
             * Não é tratada como risco clínico.
             */
            detalhes.add(
                    new DetalhePontuacaoResponse(
                            "OBJETIVO_DIFERENTE_001",
                            null,
                            0,
                            "O objetivo da avaliação do aluno é "
                            + objetivoAluno
                            + ", mas os objetivos cadastrados "
                            + "no exercício são "
                            + objetivosExercicio
                            + "."
                    )
            );
        }

        var pontuacao =
                calculadora.calcular(
                        detalhes,
                        bloqueado
                );

        return new RecomendacaoExercicioResponse(
                exercicio.id(),
                exercicio.nome(),
                exercicio.nivelExperiencia(),
                exercicio.dificuldade(),
                pontuacao.compatibilidade(),
                pontuacao.riscoCalculado(),
                pontuacao.classificacao(),
                pontuacao.detalhes(),
                objetivosExercicio,
                objetivoCompativel
        );
    }

    private Comparator<RecomendacaoExercicioResponse> ordenacao() {

        return Comparator
                .comparingInt(
                        (RecomendacaoExercicioResponse item) ->
                                prioridadeClassificacao(
                                        item.classificacao()
                                )
                )
                .thenComparing(
                        Comparator.comparingInt(
                                RecomendacaoExercicioResponse::compatibilidade
                        ).reversed()
                )
                .thenComparing(
                        Comparator.comparing(
                                RecomendacaoExercicioResponse::objetivoCompativel
                        ).reversed()
                )
                .thenComparing(
                        RecomendacaoExercicioResponse::nome,
                        String.CASE_INSENSITIVE_ORDER
                )
                .thenComparing(
                        RecomendacaoExercicioResponse::exercicioId
                );
    }

    private int prioridadeClassificacao(
            ClassificacaoRecomendacao classificacao) {

        return switch (classificacao) {
            case RECOMENDADO -> 1;
            case RECOMENDADO_COM_ATENCAO -> 2;
            case ALTO_RISCO -> 3;
            case NAO_RECOMENDADO -> 4;
        };
    }

    private ResultadoRecomendacaoResponse montarResultado(
            ContextoRecomendacao contexto,
            String aviso,
            List<RecomendacaoExercicioResponse> recomendacoes) {

        var avaliacaoFisica = contexto.avaliacaoFisica();

        return new ResultadoRecomendacaoResponse(
                avaliacaoFisica.alunoId(),
                avaliacaoFisica.id(),
                avaliacaoFisica.objetivo(),
                contexto.nivelExperienciaAluno(),
                avaliacaoFisica.apto(),
                contexto.geracaoBloqueada(),
                aviso,
                CalculadoraCompatibilidadeService.VERSAO_ALGORITMO,
                LocalDateTime.now(),
                List.copyOf(recomendacoes)
        );
    }
}