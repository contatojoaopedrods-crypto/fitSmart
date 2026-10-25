import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import SplashScreen from "./index";

// Obtém a função mockada do roteador para verificar se foi chamada
const mockPush = jest.fn();
jest.mocked(useRouter).mockReturnValue({ push: mockPush } as any);

describe("SplashScreen (Index)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o nome da marca e o slogan corretamente", () => {
    const { getByText } = render(<SplashScreen />);

    // Verifica se os elementos visuais principais estão na tela
    expect(getByText("LÚDICO")).toBeTruthy();
    expect(getByText("HEALTHTECH")).toBeTruthy();
  });

  it('deve navegar para a tela de registro ao clicar em "Começar agora"', () => {
    const { getByText } = render(<SplashScreen />);

    // Simula o clique no botão "Começar agora"
    fireEvent.press(getByText("Começar agora"));

    // Verifica se a navegação disparou a rota /register
    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  it('deve navegar para o login ao clicar em "Sou aluno"', () => {
    const { getByText } = render(<SplashScreen />);

    fireEvent.press(getByText("Sou aluno"));

    // Verifica se a navegação disparou a rota /login
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
