import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import api from "../services/api";

export default function RegisterScreen() {
  const router = useRouter();

  // Estados do formulário
  const [role, setRole] = useState<"student" | "teacher">("teacher");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState(""); // Formato YYYY-MM-DD
  const [sexo, setSexo] = useState<"M" | "F" | "O">("M");
  const [cref, setCref] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estado para guardar os erros de cada campo
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Função de validação local dos campos
  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!nome.trim()) {
      newErrors.nome = "O nome é obrigatório";
    } else if (nome.trim().length < 2) {
      newErrors.nome = "O nome deve ter no mínimo 2 caracteres";
    }

    if (!sobrenome.trim()) {
      newErrors.sobrenome = "O sobrenome é obrigatório";
    } else if (sobrenome.trim().length < 2) {
      newErrors.sobrenome = "O sobrenome deve ter no mínimo 2 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "O e-mail é obrigatório";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Informe um e-mail válido";
    }

    const phoneDigits = telefone.replace(/\D/g, "");
    if (!telefone.trim()) {
      newErrors.telefone = "O telefone é obrigatório";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      newErrors.telefone = "Informe 10 ou 11 números com DDD";
    }

    if (role === "teacher") {
      const crefRegex = /^\d{6}-[GP]\/[A-Z]{2}$/;
      if (!cref.trim()) {
        newErrors.cref = "O CREF é obrigatório";
      } else if (!crefRegex.test(cref.trim().toUpperCase())) {
        newErrors.cref = "Formato inválido. Ex: 123456-G/RJ";
      }
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataNascimento.trim()) {
      newErrors.dataNascimento = "A data de nascimento é obrigatória";
    } else if (!dateRegex.test(dataNascimento.trim())) {
      newErrors.dataNascimento = "Use o formato YYYY-MM-DD";
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória";
    } else if (password.length < 8) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "A confirmação é obrigatória";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      return;
    }

    setLoading(true);

    const userPayload = {
      nome: nome.trim(),
      sobrenome: sobrenome.trim(),
      email: email.trim().toLowerCase(),
      senha: password,
      telefone: telefone.replace(/\D/g, ""),
      data_nascimento: dataNascimento.trim(),
      sexo: sexo,
    };

    try {
      if (role === "teacher") {
        const payload = {
          cref: cref.trim().toUpperCase(),
          user: userPayload,
        };
        await api.post("/professors", payload);
      } else {
        const payload = {
          user: userPayload,
        };
        await api.post("/students", payload);
      }

      const roleLabel = role === "teacher" ? "Personal" : "Aluno";

      // Alerta nativo de confirmação
      Alert.alert(
        "Sucesso!",
        `Conta de ${roleLabel} criada com sucesso. Faça login para continuar.`,
        [
          {
            text: "OK",
            onPress: () => router.replace("/login"),
          },
        ],
      );

      // Redirecionamento direto para garantir navegação imediata (principalmente em browsers/Web)
      router.replace("/login");
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      Alert.alert(
        "Erro ao cadastrar",
        error.response?.data?.message ||
          "Ocorreu um erro ao realizar o cadastro. Verifique os dados.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView
        contentContainerStyle={styles.screenPadding}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Criar Conta</Text>
        <Text style={styles.headerSubtitle}>
          Escolha seu perfil e preencha seus dados abaixo
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
            activeOpacity={0.8}
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
            activeOpacity={0.8}
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

        {/* Nome e Sobrenome */}
        <View style={styles.rowGroup}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Nome *</Text>
            <TextInput
              style={[styles.input, errors.nome && styles.inputError]}
              placeholder="Carlos"
              placeholderTextColor="#52525B"
              value={nome}
              onChangeText={(text) => {
                setNome(text);
                if (errors.nome) setErrors((prev) => ({ ...prev, nome: "" }));
              }}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Sobrenome *</Text>
            <TextInput
              style={[styles.input, errors.sobrenome && styles.inputError]}
              placeholder="Silva"
              placeholderTextColor="#52525B"
              value={sobrenome}
              onChangeText={(text) => {
                setSobrenome(text);
                if (errors.sobrenome)
                  setErrors((prev) => ({ ...prev, sobrenome: "" }));
              }}
            />
            {errors.sobrenome && (
              <Text style={styles.errorText}>{errors.sobrenome}</Text>
            )}
          </View>
        </View>

        {/* CREF (Apenas Personal) */}
        {role === "teacher" && (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CREF *</Text>
            <TextInput
              style={[styles.input, errors.cref && styles.inputError]}
              placeholder="Ex: 123456-G/RJ"
              placeholderTextColor="#52525B"
              autoCapitalize="characters"
              value={cref}
              onChangeText={(text) => {
                setCref(text);
                if (errors.cref) setErrors((prev) => ({ ...prev, cref: "" }));
              }}
            />
            {errors.cref && <Text style={styles.errorText}>{errors.cref}</Text>}
          </View>
        )}

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

        {/* Data de Nascimento e Telefone */}
        <View style={styles.rowGroup}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Nascimento *</Text>
            <TextInput
              style={[styles.input, errors.dataNascimento && styles.inputError]}
              placeholder="1995-08-20"
              placeholderTextColor="#52525B"
              value={dataNascimento}
              onChangeText={(text) => {
                setDataNascimento(text);
                if (errors.dataNascimento)
                  setErrors((prev) => ({ ...prev, dataNascimento: "" }));
              }}
            />
            {errors.dataNascimento && (
              <Text style={styles.errorText}>{errors.dataNascimento}</Text>
            )}
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Telefone *</Text>
            <TextInput
              style={[styles.input, errors.telefone && styles.inputError]}
              placeholder="21999998888"
              placeholderTextColor="#52525B"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={(text) => {
                setTelefone(text);
                if (errors.telefone)
                  setErrors((prev) => ({ ...prev, telefone: "" }));
              }}
            />
            {errors.telefone && (
              <Text style={styles.errorText}>{errors.telefone}</Text>
            )}
          </View>
        </View>

        {/* Sexo */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Sexo *</Text>
          <View style={styles.sexoContainer}>
            <TouchableOpacity
              style={[
                styles.sexoOption,
                sexo === "M" && styles.sexoOptionActive,
              ]}
              onPress={() => setSexo("M")}
            >
              <Text
                style={[styles.sexoText, sexo === "M" && styles.sexoTextActive]}
              >
                Masculino
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sexoOption,
                sexo === "F" && styles.sexoOptionActive,
              ]}
              onPress={() => setSexo("F")}
            >
              <Text
                style={[styles.sexoText, sexo === "F" && styles.sexoTextActive]}
              >
                Feminino
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sexoOption,
                sexo === "O" && styles.sexoOptionActive,
              ]}
              onPress={() => setSexo("O")}
            >
              <Text
                style={[styles.sexoText, sexo === "O" && styles.sexoTextActive]}
              >
                Outro
              </Text>
            </TouchableOpacity>
          </View>
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
              style={styles.passwordInput}
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
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        {/* Confirmar Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirmar Senha *</Text>
          <View
            style={[
              styles.passwordWrapper,
              errors.confirmPassword && styles.inputError,
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#52525B"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={18}
                color="#71717A"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {/* Botão de Registro */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>
              Criar conta como {role === "teacher" ? "Personal" : "Aluno"}
            </Text>
          )}
        </TouchableOpacity>

        {/* Link para Login */}
        <View style={styles.footerRow}>
          <Text style={styles.subtleText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.orangeText}>Entrar</Text>
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
    marginBottom: 20,
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
    marginBottom: 20,
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
  rowGroup: {
    flexDirection: "row",
    gap: 12,
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
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    color: "#FFFFFF",
    paddingVertical: 14,
    fontSize: 15,
  },
  sexoContainer: {
    flexDirection: "row",
    gap: 8,
  },
  sexoOption: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#18181B",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  sexoOptionActive: {
    borderColor: "#FF5500",
    backgroundColor: "#261710",
  },
  sexoText: {
    color: "#71717A",
    fontSize: 13,
    fontWeight: "600",
  },
  sexoTextActive: {
    color: "#FFFFFF",
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
  subtleText: {
    color: "#71717A",
    fontSize: 14,
  },
  orangeText: {
    color: "#FF5500",
    fontSize: 14,
    fontWeight: "700",
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
