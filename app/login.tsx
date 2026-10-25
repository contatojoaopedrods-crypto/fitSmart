import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Imports da API e do Contexto de Autenticação
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

// Helper para disparar alertas compatíveis com Web e Mobile
const notify = (title: string, message: string) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();
  const { signIn } = useAuth(); // Hook de autenticação global

  const [role, setRole] = useState<"student" | "teacher">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estado para armazenar os erros de validação local
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (params.role === "teacher") {
      setRole("teacher");
    } else {
      setRole("student");
    }
  }, [params.role]);

  // Função para validar e-mail e senha antes do envio
  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "O e-mail é obrigatório";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Informe um e-mail válido";
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória";
    } else if (password.length < 8) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      // 1. Faz a requisição de login para o Spring Boot
      const response = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        senha: password,
      });

      const { token, nome, tipo_usuario } = response.data;

      const isTeacherUser = tipo_usuario === "PROFESSOR";
      const isStudentUser = tipo_usuario === "ALUNO";

      // 2. Valida o perfil ANTES de registrar a sessão no Storage
      if (role === "teacher" && !isTeacherUser) {
        notify(
          "Acesso Negado",
          "Esta conta pertence a um Aluno. Por favor, mude a opção para 'Sou Aluno'.",
        );
        return;
      }

      if (role === "student" && !isStudentUser) {
        notify(
          "Acesso Negado",
          "Esta conta pertence a um Personal. Por favor, mude a opção para 'Sou Personal'.",
        );
        return;
      }

      // 3. Registra o login no estado global SOMENTE se a opção for compatível
      if (token) {
        await signIn(token, {
          nome,
          email: email.trim().toLowerCase(),
          tipo_usuario,
        });
      }

      // 4. Redireciona para o painel correto
      if (isTeacherUser) {
        router.replace({
          pathname: "/teacher/dashboard",
          params: { teacherName: `Prof. ${nome}` },
        });
      } else {
        router.replace("/(tabs)/workout");
      }
    } catch (error: any) {
      console.error(
        "Erro na autenticação:",
        error.response?.status,
        error.response?.data ?? error.message,
      );

      let errorMessage = "Não foi possível entrar. Tente novamente.";
      if (!error.response) {
        errorMessage =
          "Sem conexão com o servidor. Verifique se o backend está rodando.";
      } else if (error.response.status === 401) {
        errorMessage =
          error.response.data?.message || "E-mail ou senha incorretos.";
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      }

      notify("Falha ao entrar", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView contentContainerStyle={styles.screenPadding}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bem-vindo de volta!</Text>
        <Text style={styles.headerSubtitle}>
          Digite suas credenciais para entrar na sua conta
        </Text>

        {/* Seletor de Perfil */}
        <View style={styles.roleSelector}>
          <TouchableOpacity
            style={[
              styles.roleOption,
              role === "student" && styles.roleOptionActive,
            ]}
            onPress={() => {
              setRole("student");
              setErrors({});
            }}
          >
            <FontAwesome5
              name="user-graduate"
              size={16}
              color={role === "student" ? "#FF5500" : "#71717A"}
            />
            <Text
              style={[
                styles.roleText,
                role === "student" && styles.roleTextActive,
              ]}
            >
              Sou Aluno
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleOption,
              role === "teacher" && styles.roleOptionActive,
            ]}
            onPress={() => {
              setRole("teacher");
              setErrors({});
            }}
          >
            <FontAwesome5
              name="user-ninja"
              size={16}
              color={role === "teacher" ? "#FF5500" : "#71717A"}
            />
            <Text
              style={[
                styles.roleText,
                role === "teacher" && styles.roleTextActive,
              ]}
            >
              Sou Personal
            </Text>
          </TouchableOpacity>
        </View>

        {/* E-mail */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>E-mail *</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="seu@email.com"
            placeholderTextColor="#52525B"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Senha *</Text>
          <View
            style={[
              styles.passwordWrapper,
              errors.password && styles.inputError,
            ]}
          >
            <TextInput
              style={[
                styles.input,
                { flex: 1, marginBottom: 0, borderWidth: 0 },
              ]}
              placeholder="••••••••"
              placeholderTextColor="#52525B"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="#71717A"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>
              Entrar como {role === "teacher" ? "Personal" : "Aluno"}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.subtleText}>Ainda não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.orangeText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090A",
  },
  screenPadding: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#71717A",
    marginTop: 4,
    marginBottom: 24,
  },
  roleSelector: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 20,
    gap: 8,
  },
  roleOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  roleOptionActive: {
    backgroundColor: "#261710",
    borderWidth: 1,
    borderColor: "#FF5500",
  },
  roleText: {
    color: "#71717A",
    fontSize: 14,
    fontWeight: "600",
  },
  roleTextActive: {
    color: "#FFFFFF",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#18181B",
    color: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#27272A",
    paddingRight: 14,
  },
  orangeText: {
    color: "#FF5500",
    fontSize: 14,
    fontWeight: "bold",
  },
  subtleText: {
    color: "#71717A",
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#FF5500",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  inputError: {
    borderColor: "#EF4444",
    borderWidth: 1.5,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});
