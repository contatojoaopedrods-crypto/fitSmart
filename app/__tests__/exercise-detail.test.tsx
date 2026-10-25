import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import ExerciseDetailScreen from "../exercise-detail";

describe("Tela de Detalhes do Exercício (exercise-detail.tsx)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve exibir o músculo-alvo e os avisos de segurança", () => {
    const { getByText } = render(<ExerciseDetailScreen />);

    expect(getByText(/Peitoral Maior/i)).toBeTruthy();
    expect(getByText(/Instruções/i)).toBeTruthy();
  });

  it("deve permitir voltar para a tela anterior ao clicar no botão de retorno", () => {
    const { back } = useRouter();
    const { getByTestId } = render(<ExerciseDetailScreen />);

    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    expect(back).toHaveBeenCalled();
  });
});
