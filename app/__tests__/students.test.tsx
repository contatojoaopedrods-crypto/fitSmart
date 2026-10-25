import { fireEvent, render } from "@testing-library/react-native";
import StudentsScreen from "../students";

describe("Lista de Alunos (students.tsx)", () => {
  it("deve filtrar a lista de alunos ao digitar na busca", () => {
    const { getByPlaceholderText, queryByText, getByText } = render(
      <StudentsScreen />,
    );

    const searchInput = getByPlaceholderText(/buscar aluno/i);
    fireEvent.changeText(searchInput, "Maria");

    expect(getByText(/Maria/i)).toBeTruthy();
    expect(queryByText(/João/i)).toBeNull();
  });
});
