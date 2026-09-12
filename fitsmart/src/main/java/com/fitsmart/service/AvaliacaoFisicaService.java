package com.fitsmart.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fitsmart.dto.AvaliacaoFisicaResponse;
import com.fitsmart.dto.CircunferenciaResponse;
import com.fitsmart.dto.CreateAvaliacaoFisicaRequest;
import com.fitsmart.dto.CreateCircunferenciaRequest;
import com.fitsmart.dto.CreateDobraCutaneaRequest;
import com.fitsmart.dto.CreateFotoAvaliacaoRequest;
import com.fitsmart.dto.DobraCutaneaResponse;
import com.fitsmart.dto.FotoAvaliacaoResponse;
import com.fitsmart.dto.ResultadoComposicaoCorporal;
import com.fitsmart.dto.UpdateAvaliacaoFisicaRequest;
import com.fitsmart.exception.ResourceNotFoundException;
import com.fitsmart.model.Aluno;
import com.fitsmart.model.AvaliacaoFisica;
import com.fitsmart.model.CircunferenciaCorporal;
import com.fitsmart.model.DobraCutanea;
import com.fitsmart.model.FotoAvaliacao;
import com.fitsmart.repository.AlunoRepository;
import com.fitsmart.repository.AvaliacaoFisicaRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AvaliacaoFisicaService {

        private final AvaliacaoFisicaRepository avaliacaoFisicaRepository;
        private final AlunoRepository alunoRepository;
        private final CalculoComposicaoCorporalService calculoService;

        public AvaliacaoFisicaService(
                        AvaliacaoFisicaRepository avaliacaoFisicaRepository,
                        AlunoRepository alunoRepository,
                        CalculoComposicaoCorporalService calculoService) {

                this.avaliacaoFisicaRepository = avaliacaoFisicaRepository;
                this.alunoRepository = alunoRepository;
                this.calculoService = calculoService;
        }

        private Aluno findAlunoDoProfessor(
                        Long alunoId,
                        Long professorUserId) {

                return alunoRepository
                                .findByIdAndProfessor_User_Id(
                                                alunoId,
                                                professorUserId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Aluno não encontrado"));
        }

        private int calcularIdade(Aluno aluno) {

                LocalDate dataNascimento = aluno.getUser().getData_nascimento();

                return Period.between(
                                dataNascimento,
                                LocalDate.now())
                                .getYears();
        }

        private AvaliacaoFisica montarAvaliacaoFisica(
                        Aluno aluno,
                        CreateAvaliacaoFisicaRequest request,
                        ResultadoComposicaoCorporal resultado) {

                AvaliacaoFisica avaliacao = new AvaliacaoFisica();

                avaliacao.setAluno(aluno);
                avaliacao.setProfessor(aluno.getProfessor());

                avaliacao.setPeso(request.peso());
                avaliacao.setAltura(request.altura());
                avaliacao.setObjetivo(request.objetivo());
                avaliacao.setObservacoes(request.observacoes());
                avaliacao.setApto(request.apto());

                avaliacao.setImc(resultado.imc());
                avaliacao.setPercentualGordura(
                                resultado.percentualGordura());
                avaliacao.setMassaGorda(resultado.massaGorda());
                avaliacao.setMassaMagra(resultado.massaMagra());
                avaliacao.setProtocoloCalculo(
                                resultado.protocoloCalculo());

                return avaliacao;
        }

        private void adicionarDobrasCutaneas(
                        AvaliacaoFisica avaliacao,
                        List<CreateDobraCutaneaRequest> dobrasCutaneas) {

                for (CreateDobraCutaneaRequest dobraRequest : dobrasCutaneas) {

                        DobraCutanea dobra = new DobraCutanea();

                        dobra.setTipo(dobraRequest.tipo());
                        dobra.setLateralidade(
                                        dobraRequest.lateralidade());
                        dobra.setValorMm(dobraRequest.valorMm());

                        avaliacao.addDobraCutanea(dobra);
                }
        }

        private void adicionarCircunferencias(
                        AvaliacaoFisica avaliacao,
                        List<CreateCircunferenciaRequest> circunferencias) {

                for (CreateCircunferenciaRequest circunferenciaRequest : circunferencias) {

                        CircunferenciaCorporal circunferencia = new CircunferenciaCorporal();

                        circunferencia.setTipo(
                                        circunferenciaRequest.tipo());

                        circunferencia.setLateralidade(
                                        circunferenciaRequest.lateralidade());

                        circunferencia.setValorCm(
                                        circunferenciaRequest.valorCm());

                        avaliacao.addCircunferencia(circunferencia);
                }
        }

        private void adicionarFotos(
                        AvaliacaoFisica avaliacao,
                        List<CreateFotoAvaliacaoRequest> fotos) {

                for (CreateFotoAvaliacaoRequest fotoRequest : fotos) {

                        FotoAvaliacao foto = new FotoAvaliacao();

                        foto.setTipo(fotoRequest.tipo());
                        foto.setCaminhoArquivo(
                                        fotoRequest.caminhoArquivo());

                        avaliacao.addFoto(foto);
                }
        }

        private DobraCutaneaResponse convertDobraToResponse(
                        DobraCutanea dobra) {

                return new DobraCutaneaResponse(
                                dobra.getId(),
                                dobra.getTipo(),
                                dobra.getLateralidade(),
                                dobra.getValorMm());
        }

        private CircunferenciaResponse convertCircunferenciaToResponse(
                        CircunferenciaCorporal circunferencia) {

                return new CircunferenciaResponse(
                                circunferencia.getId(),
                                circunferencia.getTipo(),
                                circunferencia.getLateralidade(),
                                circunferencia.getValorCm());
        }

        private FotoAvaliacaoResponse convertFotoToResponse(
                        FotoAvaliacao foto) {

                return new FotoAvaliacaoResponse(
                                foto.getId(),
                                foto.getTipo(),
                                foto.getCaminhoArquivo(),
                                foto.getDataUpload());
        }

        private AvaliacaoFisicaResponse convertToResponse(
                        AvaliacaoFisica avaliacao) {

                return new AvaliacaoFisicaResponse(
                                avaliacao.getId(),
                                avaliacao.getAluno().getId(),
                                avaliacao.getProfessor().getId(),
                                avaliacao.getDataAvaliacao(),
                                avaliacao.getPeso(),
                                avaliacao.getAltura(),
                                avaliacao.getImc(),
                                avaliacao.getPercentualGordura(),
                                avaliacao.getMassaGorda(),
                                avaliacao.getMassaMagra(),
                                avaliacao.getObjetivo(),
                                avaliacao.getObservacoes(),
                                avaliacao.getProtocoloCalculo(),
                                avaliacao.isApto(),
                                avaliacao.getDataUltimaAlteracao(),

                                avaliacao.getDobrasCutaneas()
                                                .stream()
                                                .map(this::convertDobraToResponse)
                                                .toList(),

                                avaliacao.getCircunferencias()
                                                .stream()
                                                .map(this::convertCircunferenciaToResponse)
                                                .toList(),

                                avaliacao.getFotos()
                                                .stream()
                                                .map(this::convertFotoToResponse)
                                                .toList());
        }

        @Transactional
        public AvaliacaoFisicaResponse createAvaliacao(
                        Long professorUserId,
                        Long alunoId,
                        CreateAvaliacaoFisicaRequest request) {

                Aluno aluno = findAlunoDoProfessor(
                                alunoId,
                                professorUserId);

                int idade = calcularIdade(aluno);

                ResultadoComposicaoCorporal resultado = calculoService.calcular(
                                request.peso(),
                                request.altura(),
                                request.dobrasCutaneas(),
                                idade,
                                aluno.getUser().getSexo());

                AvaliacaoFisica avaliacao = montarAvaliacaoFisica(
                                aluno,
                                request,
                                resultado);

                adicionarDobrasCutaneas(
                                avaliacao,
                                request.dobrasCutaneas());
                adicionarCircunferencias(
                                avaliacao,
                                request.circunferencias());
                adicionarFotos(
                                avaliacao,
                                request.fotos());

                AvaliacaoFisica avaliacaoSalva = avaliacaoFisicaRepository.save(avaliacao);

                return convertToResponse(avaliacaoSalva);
        }

        @Transactional(readOnly = true)
        public List<AvaliacaoFisicaResponse> listAvaliacoes(
                        Long professorUserId,
                        Long alunoId) {

                findAlunoDoProfessor(alunoId, professorUserId);

                return avaliacaoFisicaRepository
                                .findAllByAluno_IdAndProfessor_User_IdOrderByDataAvaliacaoDesc(
                                                alunoId,
                                                professorUserId)
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        @Transactional(readOnly = true)
        public AvaliacaoFisicaResponse getAvaliacao(
                        Long professorUserId,
                        Long alunoId,
                        Long avaliacaoId) {

                AvaliacaoFisica avaliacao = findAvaliacaoDoProfessor(
                                professorUserId,
                                alunoId,
                                avaliacaoId);

                return convertToResponse(avaliacao);
        }

        private AvaliacaoFisica findAvaliacaoDoProfessor(
                        Long professorUserId,
                        Long alunoId,
                        Long avaliacaoId) {

                return avaliacaoFisicaRepository
                                .findByIdAndAluno_IdAndProfessor_User_Id(
                                                avaliacaoId,
                                                alunoId,
                                                professorUserId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Avaliação física não encontrada"));
        }

        private void atualizarDadosPrincipais(
                        AvaliacaoFisica avaliacao,
                        UpdateAvaliacaoFisicaRequest request,
                        ResultadoComposicaoCorporal resultado) {

                avaliacao.setPeso(request.peso());
                avaliacao.setAltura(request.altura());
                avaliacao.setObjetivo(request.objetivo());
                avaliacao.setObservacoes(request.observacoes());
                avaliacao.setApto(request.apto());

                avaliacao.setImc(resultado.imc());
                avaliacao.setPercentualGordura(
                                resultado.percentualGordura());
                avaliacao.setMassaGorda(resultado.massaGorda());
                avaliacao.setMassaMagra(resultado.massaMagra());
                avaliacao.setProtocoloCalculo(
                                resultado.protocoloCalculo());
        }

        @Transactional
        public AvaliacaoFisicaResponse updateAvaliacao(
                        Long professorUserId,
                        Long alunoId,
                        Long avaliacaoId,
                        UpdateAvaliacaoFisicaRequest request) {

                AvaliacaoFisica avaliacao = findAvaliacaoDoProfessor(
                                professorUserId,
                                alunoId,
                                avaliacaoId);

                int idade = calcularIdade(avaliacao.getAluno());

                ResultadoComposicaoCorporal resultado = calculoService.calcular(
                                request.peso(),
                                request.altura(),
                                request.dobrasCutaneas(),
                                idade,
                                avaliacao.getAluno().getUser().getSexo());

                avaliacao.getDobrasCutaneas().clear();
                avaliacao.getCircunferencias().clear();
                avaliacao.getFotos().clear();

                avaliacaoFisicaRepository.flush();

                atualizarDadosPrincipais(
                                avaliacao,
                                request,
                                resultado);

                adicionarDobrasCutaneas(
                                avaliacao,
                                request.dobrasCutaneas());

                adicionarCircunferencias(
                                avaliacao,
                                request.circunferencias());

                adicionarFotos(
                                avaliacao,
                                request.fotos());

                AvaliacaoFisica avaliacaoAtualizada = avaliacaoFisicaRepository.saveAndFlush(avaliacao);

                return convertToResponse(avaliacaoAtualizada);
        }

        private Aluno findAlunoByUserId(Long alunoUserId) {

                return alunoRepository
                                .findByUser_Id(alunoUserId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Aluno não encontrado"));
        }

        @Transactional(readOnly = true)
        public List<AvaliacaoFisicaResponse> listMinhasAvaliacoes(
                        Long alunoUserId) {

                findAlunoByUserId(alunoUserId);

                return avaliacaoFisicaRepository
                                .findAllByAluno_User_IdOrderByDataAvaliacaoDesc(
                                                alunoUserId)
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        @Transactional(readOnly = true)
        public AvaliacaoFisicaResponse getMinhaAvaliacao(
                        Long alunoUserId,
                        Long avaliacaoId) {

                AvaliacaoFisica avaliacao = avaliacaoFisicaRepository
                                .findByIdAndAluno_User_Id(
                                                avaliacaoId,
                                                alunoUserId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Avaliação física não encontrada"));

                return convertToResponse(avaliacao);
        }
}