import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import ExploreFeedbackScreen from "../explore";

describe("Tela de Feedback pós-treino (explore.tsx)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve permitir registrar observações para o personal trainer", () => {
    const { getByPlaceholderText } = render(<ExploreFeedbackScreen />);

    const notesInput = getByPlaceholderText(/deixe um comentário/i);
    fireEvent.changeText(
      notesInput,
      "Treino excelente, aumentei a carga na última série!",
    );

    expect(notesInput.props.value).toBe(
      "Treino excelente, aumentei a carga na última série!",
    );
  });

  it("deve enviar o feedback e redirecionar o aluno", () => {
    const { replace } = useRouter();
    const { getByTestId } = render(<ExploreFeedbackScreen />);

    const submitBtn = getByTestId("submit-feedback-button");
    fireEvent.press(submitBtn);

    expect(replace).toHaveBeenCalledWith("/profile");
  });
});
