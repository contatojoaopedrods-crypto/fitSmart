package com.fitsmart.dto;

import java.util.List;

import com.fitsmart.model.enums.AmplitudeMovimento;
import com.fitsmart.model.enums.Articulacao;
import com.fitsmart.model.enums.CargaAxial;
import com.fitsmart.model.enums.DificuldadeExercicio;
import com.fitsmart.model.enums.Estabilidade;
import com.fitsmart.model.enums.GrupoMuscular;
import com.fitsmart.model.enums.Impacto;
import com.fitsmart.model.enums.NivelAtivacao;
import com.fitsmart.model.enums.NivelExperiencia;
import com.fitsmart.model.enums.PlanoMovimento;
import com.fitsmart.model.enums.PressaoAbdominal;
import com.fitsmart.model.enums.TipoEquipamento;

public record ExercicioResponse(

        Long id,
        String nome,
        String descricao,
        String caminhoImagem,
        String urlVideo,
        PlanoMovimento planoMovimento,
        CargaAxial cargaAxial,
        PressaoAbdominal pressaoAbdominal,
        Estabilidade estabilidadeExigida,
        NivelExperiencia nivelExperiencia,
        DificuldadeExercicio dificuldade,
        Impacto impactoCervical,
        Impacto impactoOmbro,
        Impacto impactoCotovelo,
        Impacto impactoPunho,
        Impacto impactoToracica,
        Impacto impactoLombar,
        Impacto impactoQuadril,
        Impacto impactoJoelho,
        Impacto impactoTornozelo,
        boolean ativo,
        List<EquipamentoVinculadoResponse> equipamentos,
        List<GrupoMuscularVinculadoResponse> gruposMusculares,
        List<AcaoArticularVinculadaResponse> acoesArticulares

) {

    public record EquipamentoVinculadoResponse(

            Long vinculoId,
            Long equipamentoId,
            String nome,
            TipoEquipamento tipo

    ) {
    }

    public record GrupoMuscularVinculadoResponse(

            Long vinculoId,
            GrupoMuscular grupoMuscular,
            NivelAtivacao nivelAtivacao

    ) {
    }

    public record AcaoArticularVinculadaResponse(

            Long vinculoId,
            Long acaoArticularId,
            String nome,
            Articulacao articulacao,
            PlanoMovimento planoMovimento,
            AmplitudeMovimento amplitudeMovimento

    ) {
    }
}