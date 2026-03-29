import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./page";
import "@testing-library/jest-dom";

const pushMock = jest.fn();
const replaceMock = jest.fn();
const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
    refresh: refreshMock,
  }),
}));

const setAuthMock = jest.fn();

jest.mock("@/features/auth/store/auth.store", () => ({
  useAuthStore: () => ({
    setAuth: setAuthMock,
  }),
}));

global.fetch = jest.fn();

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el formulario correctamente", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("muestra errores de validación", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText(/email valido/i)).toBeInTheDocument();
    expect(await screen.findByText(/contrasena es requerida/i)).toBeInTheDocument();
  });

  it("hace login exitoso y redirige", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: "fake-token",
        expiresAt: 123456,
      }),
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/auth/login", expect.any(Object));
    });

    expect(setAuthMock).toHaveBeenCalledWith(
      expect.objectContaining({
        accessToken: "fake-token",
      })
    );

    expect(replaceMock).toHaveBeenCalledWith("/users");
    expect(refreshMock).toHaveBeenCalled();
  });

  it("muestra error cuando falla login", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: "Credenciales inválidas",
      }),
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText(/credenciales inválidas/i)).toBeInTheDocument();
  });
});