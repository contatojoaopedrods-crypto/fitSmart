import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import {
    getToken,
    getUserData,
    removeToken,
    saveToken,
    saveUserData,
} from "../services/storage";

export interface UserAuthData {
  nome: string;
  email: string;
  tipo_usuario: "PROFESSOR" | "ALUNO";
}

interface AuthContextData {
  signed: boolean;
  user: UserAuthData | null;
  loading: boolean;
  signIn: (token: string, userData: UserAuthData) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedToken = await getToken();
        const storedUser = await getUserData();

        if (storedToken && storedUser) {
          api.defaults.headers.common["Authorization"] =
            `Bearer ${storedToken}`;
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Erro ao carregar dados de autenticação:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  const signIn = async (token: string, userData: UserAuthData) => {
    await saveToken(token);
    await saveUserData(userData);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const signOut = async () => {
    await removeToken();
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
