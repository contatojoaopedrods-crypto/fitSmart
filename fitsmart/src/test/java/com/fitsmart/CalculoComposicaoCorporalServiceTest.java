package com.fitsmart;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;

import com.fitsmart.service.CalculoComposicaoCorporalService;
import java.util.List;

import com.fitsmart.dto.CreateDobraCutaneaRequest;
import com.fitsmart.dto.ResultadoComposicaoCorporal;
import com.fitsmart.model.enums.Lateralidade;
import com.fitsmart.model.enums.TipoDobraCutanea;

class CalculoComposicaoCorporalServiceTest {

        private final CalculoComposicaoCorporalService service = new CalculoComposicaoCorporalService();

        @Test
        void deveCalcularImc() {

                BigDecimal resultado = service.calcularImc(
                                new BigDecimal("70"),
                                new BigDecimal("1.75"));

                assertEquals(
                                new BigDecimal("22.86"),
                                resultado);
        }

        @Test
        void deveCalcularPercentualGordura() {

                BigDecimal resultado = service.calcularPercentualGordura(
                                new BigDecimal("1.0755979"));

                assertEquals(
                                new BigDecimal("10.21"),
                                resultado);
        }

        @Test
        void deveCalcularComposicaoCorporalCompleta() {

                List<CreateDobraCutaneaRequest> dobras = List.of(
                                new CreateDobraCutaneaRequest(
                                                TipoDobraCutanea.PEITORAL,
                                                Lateralidade.DIREITO,
                                                new BigDecimal("10")),

                                new CreateDobraCutaneaRequest(
                                                TipoDobraCutanea.AXILAR_MEDIA,
                                                Lateralidade.DIREITO,
                                                new BigDecimal("10")),

                                new CreateDobraCutaneaRequest(
                                                TipoDobraCutanea.TRICIPITAL,
                                                Lateralidade.DIREITO,
                                                new BigDecimal("10")),

                                new CreateDobraCutaneaRequest(
                                                TipoDobraCutanea.SUBESCAPULAR,
                                                Lateralidade.DIREITO,
                                                new BigDecimal("10")),

                                new CreateDobraCutaneaRequest(
                                                TipoDobraCutanea.ABDOMINAL,
                                                Lateralidade.DIREITO,
                                                new BigDecimal("10")),

                                new CreateDobraCutaneaRequest(
                                                TipoDobraCutanea.SUPRAILIACA,
                                                Lateralidade.DIREITO,
                                                new BigDecimal("10")),

                                new CreateDobraCutaneaRequest(
                                                TipoDobraCutanea.COXA,
                                                Lateralidade.DIREITO,
                                                new BigDecimal("10")));

                ResultadoComposicaoCorporal resultado = service.calcular(
                                new BigDecimal("70"),
                                new BigDecimal("1.75"),
                                dobras,
                                30,
                                "M");

                assertEquals(new BigDecimal("22.86"), resultado.imc());
                assertEquals(new BigDecimal("10.21"), resultado.percentualGordura());
                assertEquals(new BigDecimal("7.15"), resultado.massaGorda());
                assertEquals(new BigDecimal("62.85"), resultado.massaMagra());
                assertEquals("JACKSON_POLLOCK_7", resultado.protocoloCalculo());
        }
}