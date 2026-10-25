import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import MoreScreen from "../more";

describe("Menu Mais e Modelos (more.tsx)", () => {
  it("deve navegar para a biblioteca de modelos de treino", () => {
    const { push } = useRouter();
    const { getByText } = render(<MoreScreen />);

    const templatesOption = getByText(/Biblioteca de Modelos/i);
    fireEvent.press(templatesOption);

    expect(push).toHaveBeenCalledWith("/workout-builder");
  });
});
