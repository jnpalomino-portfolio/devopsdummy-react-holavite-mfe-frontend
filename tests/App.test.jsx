import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from '../src/App.jsx';

describe("App Component", () => {
  test("renders the initial UI correctly", () => {
    render(<App />);
    // Verificar que el título "Hola Mundo" está presente
    expect(screen.getByText(/Hola Mundo EQUIPO DE APLICACIONES/i)).toBeInTheDocument();

    // Verificar que el botón de contador está presente y comienza en 0
    expect(screen.getByRole("button", { name: /count is 0/i })).toBeInTheDocument();

    // Verificar que el botón "Guardar" está presente
    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  test("increments the counter when the button is clicked", () => {
    render(<App />);
    const countButton = screen.getByRole("button", { name: /count is 0/i });

    // Simular clic en el botón
    fireEvent.click(countButton);

    // Verificar que el contador incrementa
    expect(countButton).toHaveTextContent("count is 1");
  });

  test("updates the username on input change", () => {
    render(<App />);
    const input = screen.getByRole("textbox");

    // Simular entrada de texto
    fireEvent.change(input, { target: { value: "TestUser" } });

    // Verificar que el valor del input cambió
    expect(input.value).toBe("TestUser");
  });

  test("calls reqApi and resets state when 'Guardar' button is clicked", async () => {
    // Mock de fetch para simular la llamada API
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    render(<App />);
    const input = screen.getByRole("textbox");
    const saveButton = screen.getByText("Guardar");

    // Simular cambio en el input
    fireEvent.change(input, { target: { value: "TestUser" } });

    // Simular clic en el botón de incrementar contador
    fireEvent.click(screen.getByRole("button", { name: /count is 0/i }));

    // Simular clic en el botón "Guardar"
    fireEvent.click(saveButton);

    // Verificar que fetch fue llamado con los datos correctos
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:9001/api/app_dummy",
      expect.objectContaining({
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: "TestUser", numeroClicks: 1 }),
      })
    );

    // Verificar que el estado fue reiniciado
    expect(input.value).toBe("");
    expect(screen.getByRole("button", { name: /count is 0/i })).toBeInTheDocument();

    // Restaurar mock de fetch
    global.fetch.mockRestore();
  });
});
