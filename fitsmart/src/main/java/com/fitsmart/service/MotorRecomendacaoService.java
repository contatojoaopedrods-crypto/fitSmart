package com.fitsmart.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsmart.dto.AvaliacaoDorCompletaResponse;
import com.fitsmart.dto.AvaliacaoFisicaResponse;
import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.dto.RecomendacaoExercicioResponse;
import com.fitsmart.dto.ResultadoRecomendacaoResponse;
import com.fitsmart.model.enums.ClassificacaoRecomendacao;
import com.fitsmart.model.enums.NivelExperiencia;
import com.fitsmart.model.enums.Objetivo;
import com.fitsmart.service.CalculadoraCompatibilidadeService.ResultadoPontuacao;
import com.fitsmart.service.ContextoRecomendacaoService.ContextoRecomendacao;
import com.fitsmart.service.RegraDorService.ResultadoRegraDor;

@Service
public class MotorRecomendacaoService {

    /*
     * Versão do MVP: considera dor e nível de experiência.
     * Lesões e mobilidade ainda não entram na pontuação.
     */
    private static final String AVISO =
            "Sugestão de apoio à decisão. Esta versão considera dor e nível "
            + "de experiência; lesões e mobilidade ainda não são avaliadas. "
            + "O professor deve revisar e validar antes de publicar.";

    private static final int PENALIZACAO_NIVEL_1 = 30;
    private static final int PENALIZACAO_NIVEL_2 = 60;

    private static final Comparator<RecomendacaoExercicioResponse> ORDEM =
            Comparator
                    .comparing((RecomendacaoExercicioResponse r) ->
                            r.classificacao() == ClassificacaoRecomendacao.NAO_RECOMENDADO)
                    .thenComparingInt(r -> -r.compatibilidade())
                    .thenComparing(r -> !r.objetivoCompativel())
                    .thenComparing(
                            RecomendacaoExercicioResponse::nome,
                            String.CASE_INSENSITIVE_ORDER);

    private final ContextoRecomendacaoService contextoService;
    private final ExercicioService exercicioService;
    private final RegraDorService regraDorService;
    private final CalculadoraCompatibilidadeService calculadora;

    public MotorRecomendacaoService(
            ContextoRecomendacaoService contextoService,
            ExercicioService exercicioService,
            RegraDorService regraDorService,
            CalculadoraCompatibilidadeService calculadora) {

        this.contextoService = contextoService;
        this.exercicioService = exercicioService;
        this.regraDorService = regraDorService;
        this.calculadora = calculadora;
    }

    @Transactional(readOnly = true)
    public ResultadoRecomendacaoResponse gerar(
            Long professorUserId,
            Long alunoId,
            Long avaliacaoId) {

        ContextoRecomendacao contexto =
                contextoService.preparar(professorUserId, alunoId, avaliacaoId);

        AvaliacaoFisicaResponse avaliacao = contexto.avaliacaoFisica();
        Objetivo objetivo = avaliacao.objetivo();
        NivelExperiencia nivelAluno = contexto.nivelExperienciaAluno();

        if (contexto.geracaoBloqueada()) {
            return new ResultadoRecomendacaoResponse(
                    alunoId,
                    avaliacaoId,
                    objetivo,
                    nivelAluno,
                    avaliacao.apto(),
                    true,
                    String.join(" ", contexto.motivosBloqueio()),
                    CalculadoraCompatibilidadeService.VERSAO_ALGORITMO,
                    LocalDateTime.now(),
                    List.of());
        }

        AvaliacaoDorCompletaResponse dor =
                contexto.avaliacaoCompleta().avaliacaoDor();

        List<RecomendacaoExercicioResponse> recomendacoes =
                exercicioService.listAtivos()
                        .stream()
                        .map(exercicio -> avaliar(exercicio, nivelAluno, objetivo, dor))
                        .sorted(ORDEM)
                        .toList();

        return new ResultadoRecomendacaoResponse(
                alunoId,
                avaliacaoId,
                objetivo,
                nivelAluno,
                avaliacao.apto(),
                false,
                AVISO,
                CalculadoraCompatibilidadeService.VERSAO_ALGORITMO,
                LocalDateTime.now(),
                recomendacoes);
    }

    private RecomendacaoExercicioResponse avaliar(
            ExercicioResponse exercicio,
            NivelExperiencia nivelAluno,
            Objetivo objetivo,
            AvaliacaoDorCompletaResponse dor) {

        List<DetalhePontuacaoResponse> detalhes = new ArrayList<>();

        ResultadoRegraDor resultadoDor = regraDorService.analisar(exercicio, dor);
        detalhes.addAll(resultadoDor.detalhes());

        DetalhePontuacaoResponse detalheNivel = avaliarNivel(exercicio, nivelAluno);
        if (detalheNivel != null) {
            detalhes.add(detalheNivel);
        }

        ResultadoPontuacao pontuacao =
                calculadora.calcular(detalhes, resultadoDor.bloqueado());

        List<Objetivo> objetivosExercicio = exercicio.objetivos();

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
                objetivosExercicio.contains(objetivo));
    }

    private DetalhePontuacaoResponse avaliarNivel(
            ExercicioResponse exercicio,
            NivelExperiencia nivelAluno) {

        int diferenca =
                exercicio.nivelExperiencia().ordinal() - nivelAluno.ordinal();

        if (diferenca <= 0) {
            return null;
        }

        int risco = diferenca == 1 ? PENALIZACAO_NIVEL_1 : PENALIZACAO_NIVEL_2;

        return new DetalhePontuacaoResponse(
                "NIVEL_001",
                null,
                risco,
                "O exercício exige o nível " + exercicio.nivelExperiencia()
                        + " e o aluno está no nível " + nivelAluno + ".");
    }
}