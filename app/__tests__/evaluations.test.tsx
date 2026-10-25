import { render } from "@testing-library/react-native";
import EvaluationsScreen from "../evaluations";

describe("Histórico de Avaliações (evaluations.tsx)", () => {
  it("deve renderizar o histórico de peso e gordura corporal", () => {
    const { getByText } = render(<EvaluationsScreen />);

    expect(getByText(/Gordura Corporal/i)).toBeTruthy();
    expect(getByText(/Massa Magra/i)).toBeTruthy();
  });
});
