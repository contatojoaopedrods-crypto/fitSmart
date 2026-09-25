package com.fitsmart.dto;

import java.util.List;

import com.fitsmart.model.enums.AmplitudeMovimento;
import com.fitsmart.model.enums.CargaAxial;
import com.fitsmart.model.enums.DificuldadeExercicio;
import com.fitsmart.model.enums.Estabilidade;
import com.fitsmart.model.enums.GrupoMuscular;
import com.fitsmart.model.enums.Impacto;
import com.fitsmart.model.enums.NivelAtivacao;
import com.fitsmart.model.enums.NivelExperiencia;
import com.fitsmart.model.enums.PlanoMovimento;
import com.fitsmart.model.enums.PressaoAbdominal;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SalvarExercicioRequest(

        @NotBlank(message = "O nome é obrigatório")
        String nome,

        String descricao,

        String caminhoImagem,

        String urlVideo,

        @NotNull(message = "O plano de movimento é obrigatório")
        PlanoMovimento planoMovimento,

        @NotNull(message = "A carga axial é obrigatória")
        CargaAxial cargaAxial,

        @NotNull(message = "A pressão abdominal é obrigatória")
        PressaoAbdominal pressaoAbdominal,

        @NotNull(message = "A estabilidade exigida é obrigatória")
        Estabilidade estabilidadeExigida,

        @NotNull(message = "O nível de experiência é obrigatório")
        NivelExperiencia nivelExperiencia,

        @NotNull(message = "A dificuldade é obrigatória")
        DificuldadeExercicio dificuldade,

        @NotNull(message = "O impacto cervical é obrigatório")
        Impacto impactoCervical,

        @NotNull(message = "O impacto no ombro é obrigatório")
        Impacto impactoOmbro,

        @NotNull(message = "O impacto no cotovelo é obrigatório")
        Impacto impactoCotovelo,

        @NotNull(message = "O impacto no punho é obrigatório")
        Impacto impactoPunho,

        @NotNull(message = "O impacto torácico é obrigatório")
        Impacto impactoToracica,

        @NotNull(message = "O impacto lombar é obrigatório")
        Impacto impactoLombar,

        @NotNull(message = "O impacto no quadril é obrigatório")
        Impacto impactoQuadril,

        @NotNull(message = "O impacto no joelho é obrigatório")
        Impacto impactoJoelho,

        @NotNull(message = "O impacto no tornozelo é obrigatório")
        Impacto impactoTornozelo,

        @NotNull(message = "A lista de equipamentos é obrigatória")
        List<@Valid EquipamentoItem> equipamentos,

        @NotNull(message = "A lista de grupos musculares é obrigatória")
        List<@Valid GrupoMuscularItem> gruposMusculares,

        @NotNull(message = "A lista de ações articulares é obrigatória")
        List<@Valid AcaoArticularItem> acoesArticulares

) {

    public record EquipamentoItem(

            @NotNull(message = "O equipamento é obrigatório")
            Long equipamentoId

    ) {
    }

    public record GrupoMuscularItem(

            @NotNull(message = "O grupo muscular é obrigatório")
            GrupoMuscular grupoMuscular,

            @NotNull(message = "O nível de ativação é obrigatório")
            NivelAtivacao nivelAtivacao

    ) {
    }

    public record AcaoArticularItem(

            @NotNull(message = "A ação articular é obrigatória")
            Long acaoArticularId,

            @NotNull(message = "A amplitude de movimento é obrigatória")
            AmplitudeMovimento amplitudeMovimento

    ) {
    }
}