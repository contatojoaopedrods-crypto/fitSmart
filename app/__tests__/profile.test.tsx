import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import ProfileScreen from "../profile";

describe("Perfil do Aluno (profile.tsx)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve exibir os indicadores de progresso e tonelagem total", () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText(/Sequência/i)).toBeTruthy();
    expect(getByText(/Tonelagem/i)).toBeTruthy();
  });

  it("deve navegar para a tela de avaliações físicas", () => {
    const { push } = useRouter();
    const { getByText } = render(<ProfileScreen />);

    const evalsButton = getByText(/Avaliações/i);
    fireEvent.press(evalsButton);

    expect(push).toHaveBeenCalledWith("/evaluations");
  });
});
