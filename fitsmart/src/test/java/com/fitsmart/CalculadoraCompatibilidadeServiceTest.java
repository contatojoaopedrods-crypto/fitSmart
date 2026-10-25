package com.fitsmart;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.fitsmart.dto.DetalhePontuacaoResponse;
import com.fitsmart.model.enums.ClassificacaoRecomendacao;
import com.fitsmart.service.CalculadoraCompatibilidadeService;

class CalculadoraCompatibilidadeServiceTest {

    private final CalculadoraCompatibilidadeService calculadora =
            new CalculadoraCompatibilidadeService();

    @Test
    void calculaMediaDasPenalizacoesEArredondaResultado() {

        var resultado = calculadora.calcular(
                List.of(
                        detalhe(40),
                        detalhe(20),
                        detalhe(40),
                        detalhe(45)
                ),
                false
        );

        // Média: 145 / 4 = 36,25; arredondamento: 36.
        assertEquals(36, resultado.riscoCalculado());
        assertEquals(64, resultado.compatibilidade());

        assertEquals(
                ClassificacaoRecomendacao.RECOMENDADO_COM_ATENCAO,
                resultado.classificacao()
        );

        assertFalse(resultado.bloqueado());
        assertEquals(4, resultado.detalhes().size());
    }

    @Test
    void detalheInformativoNaoDiluiPenalizacao() {

        var resultado = calculadora.calcular(
                List.of(
                        detalhe(40),
                        detalhe(0)
                ),
                false
        );

        assertEquals(40, resultado.riscoCalculado());
        assertEquals(60, resultado.compatibilidade());

        // O detalhe informativo é preservado no retorno.
        assertEquals(2, resultado.detalhes().size());
    }

    @Test
    void bloqueioPrevaleceSobreMedia() {

        var resultado = calculadora.calcular(
                List.of(
                        detalhe(40),
                        detalhe(20)
                ),
                true
        );

        assertEquals(100, resultado.riscoCalculado());
        assertEquals(0, resultado.compatibilidade());

        assertEquals(
                ClassificacaoRecomendacao.NAO_RECOMENDADO,
                resultado.classificacao()
        );

        assertTrue(resultado.bloqueado());
        assertEquals(2, resultado.detalhes().size());
    }

    @Test
    void classificaLimiarDeAltoRisco() {

        var abaixoDoLimiar = calculadora.calcular(
                List.of(detalhe(49)),
                false
        );

        var noLimiar = calculadora.calcular(
                List.of(detalhe(50)),
                false
        );

        assertEquals(
                ClassificacaoRecomendacao.RECOMENDADO_COM_ATENCAO,
                abaixoDoLimiar.classificacao()
        );

        assertEquals(
                ClassificacaoRecomendacao.ALTO_RISCO,
                noLimiar.classificacao()
        );

        assertEquals(50, noLimiar.compatibilidade());
    }

    @Test
    void rejeitaPenalizacoesForaDoIntervalo() {

        assertThrows(
                IllegalArgumentException.class,
                () -> calculadora.calcular(
                        List.of(detalhe(-1)),
                        false
                )
        );

        assertThrows(
                IllegalArgumentException.class,
                () -> calculadora.calcular(
                        List.of(detalhe(101)),
                        false
                )
        );
    }

    private DetalhePontuacaoResponse detalhe(int penalizacao) {

        return new DetalhePontuacaoResponse(
                "CRITERIO_TESTE",
                null,
                penalizacao,
                "Dado fictício para teste da calculadora."
        );
    }
}
