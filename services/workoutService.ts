import {
  ExercicioResponseDTO,
  SaveTreinoDTO,
  TreinoResponseDTO,
} from "../types/workout";
import api from "./api";

// Procura o catálogo completo de exercícios
export async function getExercises(): Promise<ExercicioResponseDTO[]> {
  const response = await api.get<ExercicioResponseDTO[]>("/exercises");
  return response.data;
}

// Cria um rascunho de treino para o aluno
export async function createWorkoutDraft(
  studentId: number,
  dto: SaveTreinoDTO,
): Promise<TreinoResponseDTO> {
  const response = await api.post<TreinoResponseDTO>(
    `/professors/me/students/${studentId}/workouts`,
    dto,
  );
  return response.data;
}

// Atualiza um treino existente
export async function updateWorkout(
  studentId: number,
  workoutId: number,
  dto: SaveTreinoDTO,
): Promise<TreinoResponseDTO> {
  const response = await api.put<TreinoResponseDTO>(
    `/professors/me/students/${studentId}/workouts/${workoutId}`,
    dto,
  );
  return response.data;
}

// Publica o treino para o aluno (muda o status para ATIVO)
export async function publishWorkout(
  studentId: number,
  workoutId: number,
): Promise<TreinoResponseDTO> {
  const response = await api.post<TreinoResponseDTO>(
    `/professors/me/students/${studentId}/workouts/${workoutId}/publish`,
  );
  return response.data;
}

// Lista todos os treinos do aluno
export async function getStudentWorkouts(
  studentId: number,
): Promise<TreinoResponseDTO[]> {
  const response = await api.get<TreinoResponseDTO[]>(
    `/professors/me/students/${studentId}/workouts`,
  );
  return response.data;
}

// Busca os detalhes de um treino específico
export async function getWorkoutById(
  studentId: number,
  workoutId: number,
): Promise<TreinoResponseDTO> {
  const response = await api.get<TreinoResponseDTO>(
    `/professors/me/students/${studentId}/workouts/${workoutId}`,
  );
  return response.data;
}
