import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import DashboardScreen from "../dashboard";

describe("Dashboard do Personal Trainer (dashboard.tsx)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar as estatísticas dos alunos e a taxa de adesão", () => {
    const { getByText } = render(<DashboardScreen />);

    expect(getByText(/Alunos Ativos/i)).toBeTruthy();
    expect(getByText(/\+12%/i)).toBeTruthy();
  });

  it("deve navegar para o perfil individual do aluno selecionado", () => {
    const { push } = useRouter();
    const { getByTestId } = render(<DashboardScreen />);

    const studentItem = getByTestId("student-card-1");
    fireEvent.press(studentItem);

    expect(push).toHaveBeenCalledWith("/student-profile");
  });
});
