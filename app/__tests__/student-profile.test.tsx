import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import StudentProfileScreen from "../student-profile";

describe("Detalhes do Aluno - Visão do Personal (student-profile.tsx)", () => {
  it("deve navegar para a montagem de treino ao clicar em Criar Novo Treino", () => {
    const { push } = useRouter();
    const { getByText } = render(<StudentProfileScreen />);

    const buildWorkoutBtn = getByText(/Criar Novo Treino/i);
    fireEvent.press(buildWorkoutBtn);

    expect(push).toHaveBeenCalledWith("/workout-builder");
  });
});
