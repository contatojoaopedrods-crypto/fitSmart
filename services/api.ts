import axios from "axios";
import { getToken, removeToken } from "./storage";

// Exportação nomeada e default para compatibilidade total de imports
export const api = axios.create({
  baseURL: "http://localhost:8082", // Emulador Android: 10.0.2.2 | Dispositivo físico: IP local
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Requisição: adiciona o token JWT em cada chamada
api.interceptors.request.use(
  async (config) => {
    if (config.url?.includes("/login") || config.url?.includes("/register")) {
      return config;
    }
    const token = await getToken();
    console.log("🔑 [DEBUG] Token no Storage:", token);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn(
        "⚠️ [DEBUG] Nenhum token encontrado ou headers não definidos.",
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de Resposta: trata tokens expirados ou inválidos (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn(
        "⚠️ [DEBUG] Sessão expirada ou não autorizada. Limpando token...",
      );
      await removeToken();
    }
    return Promise.reject(error);
  },
);

export default api;
