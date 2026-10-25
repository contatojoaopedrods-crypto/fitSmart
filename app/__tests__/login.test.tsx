import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import LoginScreen from "./login";

const mockReplace = jest.fn();
jest.mocked(useRouter).mockReturnValue({ replace: mockReplace } as any);

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve alternar entre o perfil de Aluno e Personal ao clicar nos seletores", () => {
    const { getByText } = render(<LoginScreen />);

    // Por padrão o botão deve indicar entrada como Aluno
    expect(getByText("Entrar como Aluno")).toBeTruthy();

    // Clica na opção "Sou Personal"
    fireEvent.press(getByText("Sou Personal"));

    // O texto do botão de submissão deve mudar para "Entrar como Personal"
    expect(getByText("Entrar como Personal")).toBeTruthy();
  });

  it("deve realizar o login de Aluno e redirecionar para a área de treinos", () => {
    const { getByText } = render(<LoginScreen />);

    // Garante que o perfil Aluno está selecionado e clica no botão
    fireEvent.press(getByText("Entrar como Aluno"));

    // Verifica se o redirecionamento foi efetuado para a aba correta
    expect(mockReplace).toHaveBeenCalledWith("/(tabs)/workout");
  });

  it("deve realizar o login de Personal e formatar o nome extraído do e-mail", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // 1. Seleciona o perfil de Personal
    fireEvent.press(getByText("Sou Personal"));

    // 2. Preenche o e-mail do professor
    const inputEmail = getByPlaceholderText("seu@email.com");
    fireEvent.changeText(inputEmail, "carlos@gym.com");

    // 3. Clica para entrar
    fireEvent.press(getByText("Entrar como Personal"));

    // 4. Verifica se redirecionou para a dashboard do professor enviando o nome "Prof. Carlos"
    expect(mockReplace).toHaveBeenCalledWith({
      pathname: "/teacher/dashboard",
      params: { teacherName: "Prof. Carlos" },
    });
  });
});
