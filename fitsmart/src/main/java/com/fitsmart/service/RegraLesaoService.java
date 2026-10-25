package com.fitsmart.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.fitsmart.dto.AvaliacaoLesaoResponse;
import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.dto.ExercicioResponse;
import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.GravidadeLesao;
import com.fitsmart.model.enums.Impacto;
import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.StatusLesao;

@Service
public class RegraLesaoService {

    /*
     * Heurísticas da versão 1.0.0 do MVP.
     *
     * Não representam diagnóstico, probabilidade de lesão
     * ou critérios clínicos validados de liberação.
     *
     * O bloqueio impede a sugestão automática do exercício.
     */
    public ResultadoRegraLesao analisar(
            ExercicioResponse exercicio,
            Long alunoId,
            List<AvaliacaoLesaoResponse> historico) {

        Objects.requireNonNull(
                exercicio,
                "O exercício é obrigatório"
        );

        Objects.requireNonNull(
                alunoId,
                "O aluno é obrigatório"
        );

        Objects.requireNonNull(
                historico,
                "O histórico de lesões é obrigatório"
        );

        Objects.requireNonNull(
                exercicio.acoesArticulares(),
                "A lista de ações articulares é obrigatória"
        );

        List<AvaliacaoLesaoResponse> registrosAtuais =
                selecionarRegistrosMaisRecentes(
                        alunoId,
                        historico
                );

        Map<Articulacao, DetalhePontuacaoResponse> maioresPenalizacoes =
                new EnumMap<>(Articulacao.class);

        List<DetalhePontuacaoResponse> bloqueios =
                new ArrayList<>();

        for (AvaliacaoLesaoResponse lesao : registrosAtuais) {

            /*
             * Um registro de recuperação sem dor atual
             * não gera penalização nesta regra.
             */
            boolean recuperada =
                    lesao.statusLesao() == StatusLesao.RECUPERADA;

            if (recuperada && !lesao.dorAtualmente()) {
                continue;
            }

            Impacto impacto =
                    obterImpacto(
                            exercicio,
                            lesao.articulacao()
                    );

            boolean possuiAcaoNaArticulacao =
                    exercicio.acoesArticulares()
                            .stream()
                            .anyMatch(acao ->
                                    acao.articulacao()
                                    == lesao.articulacao()
                            );

            boolean articulacaoUtilizada =
                    possuiAcaoNaArticulacao
                    || impacto != Impacto.NENHUM;

            if (!articulacaoUtilizada) {
                continue;
            }

            /*
             * Política conservadora do MVP:
             * lesão não recuperada, grave e sem liberação
             * registrada bloqueia a sugestão do exercício
             * relacionado à articulação.
             *
             * Ausência de liberação registrada não prova
             * que houve uma proibição médica.
             */
            boolean bloqueioPorLesao =
                    !recuperada
                    && lesao.gravidade() == GravidadeLesao.GRAVE
                    && !lesao.liberacaoMedica();

            int penalizacaoBase = recuperada
                    ? 15
                    : penalizacaoPorGravidade(lesao.gravidade());

            int penalizacao =
                    penalizacaoBase
                    + adicionalPorImpacto(impacto)
                    + (lesao.dorAtualmente() ? 10 : 0);

            String motivo =
                    "Lesão: "
                    + lesao.nomeLesao()
                    + "; registro: "
                    + lesao.id()
                    + "; status: "
                    + lesao.statusLesao()
                    + "; gravidade: "
                    + lesao.gravidade()
                    + "; lateralidade: "
                    + lesao.lateralidade()
                    + "; dor atual: "
                    + lesao.dorAtualmente()
                    + "; liberação médica registrada: "
                    + lesao.liberacaoMedica()
                    + "; impacto cadastrado: "
                    + impacto
                    + ". Avaliação da lesão em "
                    + lesao.dataAvaliacao()
                    + ".";

            if (bloqueioPorLesao) {
                motivo +=
                        " A política do MVP bloqueia a sugestão "
                        + "deste exercício até revisão profissional.";
            }

            DetalhePontuacaoResponse detalhe =
                    new DetalhePontuacaoResponse(
                            bloqueioPorLesao
                                    ? "LESAO_GRAVE_SEM_LIBERACAO_001"
                                    : "HISTORICO_LESAO_001",
                            lesao.articulacao(),
                            penalizacao,
                            motivo
                    );

            /*
             * Preserva todos os motivos de bloqueio.
             * Eles não podem desaparecer ao selecionar
             * a maior penalização de uma articulação.
             */
            if (bloqueioPorLesao) {
                bloqueios.add(detalhe);
                continue;
            }

            DetalhePontuacaoResponse anterior =
                    maioresPenalizacoes.get(
                            lesao.articulacao()
                    );

            if (anterior == null
                    || detalhe.risco() > anterior.risco()) {

                maioresPenalizacoes.put(
                        lesao.articulacao(),
                        detalhe
                );
            }
        }

        List<DetalhePontuacaoResponse> detalhes =
                new ArrayList<>(bloqueios);

        detalhes.addAll(maioresPenalizacoes.values());

        return new ResultadoRegraLesao(
                !bloqueios.isEmpty(),
                List.copyOf(detalhes)
        );
    }

    private List<AvaliacaoLesaoResponse> selecionarRegistrosMaisRecentes(
            Long alunoId,
            List<AvaliacaoLesaoResponse> historico) {

        Map<ChaveHistorico, AvaliacaoLesaoResponse> maisRecentes =
                new LinkedHashMap<>();

        Comparator<AvaliacaoLesaoResponse> ordem =
                Comparator
                        .comparing(
                                AvaliacaoLesaoResponse::dataAvaliacao
                        )
                        .thenComparing(
                                AvaliacaoLesaoResponse::id
                        );

        for (AvaliacaoLesaoResponse registro : historico) {

            validarRegistro(registro, alunoId);

            /*
             * Agrupamento provisório com os campos
             * disponíveis no modelo atual.
             *
             * A data de início deve ser mantida nas
             * reavaliações do mesmo episódio.
             */
            ChaveHistorico chave = new ChaveHistorico(
                    registro.lesaoId(),
                    registro.lateralidade(),
                    registro.dataInicio()
            );

            AvaliacaoLesaoResponse anterior =
                    maisRecentes.get(chave);

            if (anterior == null
                    || ordem.compare(registro, anterior) > 0) {

                maisRecentes.put(
                        chave,
                        registro
                );
            }
        }

        return List.copyOf(maisRecentes.values());
    }

    private void validarRegistro(
            AvaliacaoLesaoResponse registro,
            Long alunoId) {

        Objects.requireNonNull(
                registro,
                "Um registro de lesão não pode ser nulo"
        );

        if (!alunoId.equals(registro.alunoId())) {
            throw new IllegalArgumentException(
                    "O histórico contém registro de outro aluno"
            );
        }

        Objects.requireNonNull(
                registro.id(),
                "O ID da avaliação da lesão é obrigatório"
        );

        Objects.requireNonNull(
                registro.lesaoId(),
                "O ID da lesão é obrigatório"
        );

        Objects.requireNonNull(
                registro.articulacao(),
                "A articulação da lesão é obrigatória"
        );

        Objects.requireNonNull(
                registro.lateralidade(),
                "A lateralidade da lesão é obrigatória"
        );

        Objects.requireNonNull(
                registro.statusLesao(),
                "O status da lesão é obrigatório"
        );

        Objects.requireNonNull(
                registro.gravidade(),
                "A gravidade da lesão é obrigatória"
        );

        Objects.requireNonNull(
                registro.dataAvaliacao(),
                "A data da avaliação da lesão é obrigatória"
        );
    }

    private int penalizacaoPorGravidade(
            GravidadeLesao gravidade) {

        return switch (gravidade) {
            case LEVE -> 15;
            case MODERADA -> 30;
            case GRAVE -> 45;
        };
    }

    private int adicionalPorImpacto(
            Impacto impacto) {

        return switch (impacto) {
            case NENHUM, BAIXO -> 0;
            case MEDIO -> 5;
            case ALTO -> 10;
        };
    }

    private Impacto obterImpacto(
            ExercicioResponse exercicio,
            Articulacao articulacao) {

        Impacto impacto = switch (articulacao) {
            case CERVICAL -> exercicio.impactoCervical();
            case OMBRO -> exercicio.impactoOmbro();
            case COTOVELO -> exercicio.impactoCotovelo();
            case PUNHO -> exercicio.impactoPunho();
            case TORACICA -> exercicio.impactoToracica();
            case LOMBAR -> exercicio.impactoLombar();
            case QUADRIL -> exercicio.impactoQuadril();
            case JOELHO -> exercicio.impactoJoelho();
            case TORNOZELO -> exercicio.impactoTornozelo();
        };

        return Objects.requireNonNull(
                impacto,
                "O impacto do exercício não pode ser nulo"
        );
    }

    private record ChaveHistorico(

            Long lesaoId,

            Lateralidade lateralidade,

            LocalDate dataInicio

    ) {
    }

    public record ResultadoRegraLesao(

            boolean bloqueado,

            List<DetalhePontuacaoResponse> detalhes

    ) {
    }
}