import { fireEvent, render } from "@testing-library/react-native";
import WorkoutBuilderScreen from "../workout-builder";

describe("Montador de Treinos (workout-builder.tsx)", () => {
  it("deve permitir alterar repetições e séries de um exercício", () => {
    const { getByPlaceholderText } = render(<WorkoutBuilderScreen />);

    const repsInput = getByPlaceholderText(/rep/i);
    fireEvent.changeText(repsInput, "12");

    expect(repsInput.props.value).toBe("12");
  });

  it("deve disparar o gerador de IA ao clicar no botão correspondente", () => {
    const { getByTestId, getByText } = render(<WorkoutBuilderScreen />);

    const aiButton = getByTestId("ai-generate-button");
    fireEvent.press(aiButton);

    expect(getByText(/Gerando sugestões/i)).toBeTruthy();
  });
});
