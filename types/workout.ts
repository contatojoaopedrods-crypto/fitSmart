export interface ExercicioResponseDTO {
  id: number;
  nome: string;
  descricao?: string;
  dificuldade?: string;
  impacto?: string;
  objetivo?: string;
  acoesArticulares?: string[];
  restricoesLimitacoes?: string[];
  restricoesLesoes?: string[];
}

export interface ItemTreinoInputDTO {
  exercicioId: number;
  ordem: number;
  series: number;
  repeticoes: number;
  carga: number;
  tempoSegundos: number;
  observacoes?: string;
}

export interface SaveTreinoDTO {
  observacoes: string;
  itens: ItemTreinoInputDTO[];
}

export interface ItemTreinoResponseDTO {
  id: number;
  exercicioId: number;
  exercicioNome: string;
  ordem: number;
  series: number;
  repeticoes: number;
  carga: number;
  tempoSegundos: number;
  observacoes?: string;
}

export interface TreinoResponseDTO {
  id: number;
  status: "RASCUNHO" | "ATIVO";
  dataCriacao: string;
  dataPublicacao?: string;
  observacoes: string;
  alunoId: number;
  professorId: number;
  itens: ItemTreinoResponseDTO[];
}
