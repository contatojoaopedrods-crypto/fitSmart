import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import RegisterScreen from "./register";

const mockReplace = jest.fn();
const mockPush = jest.fn();

jest.mocked(useRouter).mockReturnValue({
  replace: mockReplace,
  push: mockPush,
  back: jest.fn(),
} as any);

describe("RegisterScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve alternar o papel do usuário para Personal e atualizar o texto do botão", () => {
    const { getByText } = render(<RegisterScreen />);

    // Por padrão o perfil ativo é Aluno
    expect(getByText("Criar conta como Aluno")).toBeTruthy();

    // Altera a seleção para Personal
    fireEvent.press(getByText("Sou Personal"));

    // O texto do botão deve mudar dinamicamente
    expect(getByText("Criar conta como Personal")).toBeTruthy();
  });

  it("deve redirecionar o Aluno para a tela de treinos após o cadastro", () => {
    const { getByText } = render(<RegisterScreen />);

    // Clica no botão de registro de Aluno
    fireEvent.press(getByText("Criar conta como Aluno"));

    // Garante que o redirecionamento foi chamado para a rota correta
    expect(mockReplace).toHaveBeenCalledWith("/(tabs)/workout");
  });

  it("deve redirecionar o Personal para o dashboard do professor após o cadastro", () => {
    const { getByText } = render(<RegisterScreen />);

    // Seleciona perfil Personal e confirma
    fireEvent.press(getByText("Sou Personal"));
    fireEvent.press(getByText("Criar conta como Personal"));

    // Garante que o redirecionamento foi chamado para o dashboard
    expect(mockReplace).toHaveBeenCalledWith("/teacher/dashboard");
  });

  it("deve navegar para a tela de login ao clicar no link do rodapé", () => {
    const { getByText } = render(<RegisterScreen />);

    // Clica no link "Entrar" no footer
    fireEvent.press(getByText("Entrar"));

    // Verifica se a rota /login foi chamada
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
