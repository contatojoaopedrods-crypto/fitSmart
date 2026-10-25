import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import api from "../../services/api";

interface UserResponse {
  id: number;
  nome: string;
  sobrenome?: string;
  email: string;
}

interface AlunoResponse {
  id: number;
  user: UserResponse;
  professorId: number;
}

const notify = (title: string, message: string) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    const { Alert } = require("react-native");
    Alert.alert(title, message);
  }
};

export default function StudentsListScreen() {
  const router = useRouter();

  const [students, setStudents] = useState<AlunoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  // Estados do Modal para vincular aluno pelo e-mail
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Busca a lista de alunos vinculados ao professor autenticado
  const fetchStudents = async () => {
    try {
      const response = await api.get("/professors/me/students");
      setStudents(response.data);
    } catch (error: any) {
      console.error("Erro ao carregar alunos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStudents();
  };

  // Envia o e-mail do aluno cadastrado para associá-lo ao professor
  const handleLinkStudent = async () => {
    if (!email.trim()) {
      notify("Atenção", "Por favor, informe o e-mail do aluno.");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/professors/me/students/link", {
        email: email.trim().toLowerCase(),
      });

      notify("Sucesso", "Aluno vinculado com sucesso!");
      setModalVisible(false);
      setEmail("");
      fetchStudents();
    } catch (error: any) {
      console.error("Erro ao vincular aluno:", error);

      const msg =
        error.response?.data?.message ||
        "Não foi possível encontrar um aluno com este e-mail.";

      notify("Erro", msg);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    const fullName =
      `${s.user?.nome || ""} ${s.user?.sobrenome || ""}`.toLowerCase();
    const userEmail = (s.user?.email || "").toLowerCase();
    const term = search.toLowerCase();
    return fullName.includes(term) || userEmail.includes(term);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView
        contentContainerStyle={styles.scrollPadding}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FF5500"
          />
        }
      >
        <Text style={styles.headerTitle}>Meus alunos</Text>

        {/* Campo de Busca + Filtro */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Feather
              name="search"
              size={18}
              color="#71717A"
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nome ou e-mail"
              placeholderTextColor="#52525B"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#FF5500" />
          </TouchableOpacity>
        </View>

        {/* Botão Vincular Aluno */}
        <TouchableOpacity
          style={styles.addStudentButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Feather name="user-plus" size={18} color="#FFFFFF" />
          <Text style={styles.addStudentText}>Vincular aluno existente</Text>
        </TouchableOpacity>

        {/* Lista de Alunos vinda da API */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF5500" />
          </View>
        ) : (
          <View style={{ marginTop: 16 }}>
            {filteredStudents.length === 0 ? (
              <View style={styles.emptyContainer}>
                <FontAwesome5 name="user-slash" size={32} color="#52525B" />
                <Text style={styles.emptyTitle}>Nenhum aluno encontrado</Text>
                <Text style={styles.emptySubtitle}>
                  Clique em "Vincular aluno existente" para associar um aluno
                  pelo e-mail.
                </Text>
              </View>
            ) : (
              filteredStudents.map((student) => {
                const initial = student.user?.nome
                  ? student.user.nome.charAt(0).toUpperCase()
                  : "A";
                const fullName =
                  `${student.user?.nome || ""} ${student.user?.sobrenome || ""}`.trim();

                return (
                  <TouchableOpacity
                    key={student.id}
                    style={styles.studentCard}
                    onPress={() =>
                      router.push({
                        pathname: "/teacher/student-detail",
                        params: { studentId: student.id },
                      })
                    }
                    activeOpacity={0.8}
                  >
                    <View style={styles.avatarBox}>
                      <Text style={styles.avatarText}>{initial}</Text>
                    </View>

                    <View style={styles.studentInfo}>
                      <Text style={styles.studentName}>{fullName}</Text>
                      <Text style={styles.studentSubtext}>
                        E-mail:{" "}
                        <Text style={{ color: "#D4D4D8" }}>
                          {student.user?.email}
                        </Text>
                      </Text>
                    </View>

                    <Feather name="chevron-right" size={20} color="#71717A" />
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        )}
      </ScrollView>

      {/* Modal para Vincular Aluno Existente */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Vincular Aluno Existente</Text>
            <Text style={styles.modalSubTitle}>
              Digite o e-mail cadastrado do aluno no aplicativo para adicioná-lo
              à sua lista.
            </Text>

            <Text style={styles.inputLabel}>E-mail do Aluno *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="aluno@email.com"
              placeholderTextColor="#52525B"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
                disabled={submitting}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleLinkStudent}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.saveButtonText}>Vincular</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Tab Bar Inferior Professor */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.replace("/teacher/dashboard")}
        >
          <Feather name="home" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.replace("/teacher/students")}
        >
          <FontAwesome5 name="users" size={18} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.replace("/teacher/workout-builder")}
        >
          <MaterialCommunityIcons name="dumbbell" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.replace("/teacher/evaluations")}
        >
          <Feather name="star" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Avaliações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.replace("/teacher/more")}
        >
          <Feather name="menu" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Mais</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090A",
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    height: 46,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#18181B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  addStudentButton: {
    flexDirection: "row",
    backgroundColor: "#FF5500",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addStudentText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  loadingContainer: {
    paddingVertical: 50,
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    gap: 8,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  emptySubtitle: {
    color: "#71717A",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#261710",
    borderWidth: 1,
    borderColor: "#FF5500",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FF5500",
    fontSize: 18,
    fontWeight: "bold",
  },
  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  studentName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  studentSubtext: {
    fontSize: 12,
    color: "#71717A",
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  modalSubTitle: {
    fontSize: 13,
    color: "#71717A",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: "#A1A1AA",
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: "#09090A",
    borderWidth: 1,
    borderColor: "#27272A",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 14,
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#27272A",
  },
  cancelButtonText: {
    color: "#A1A1AA",
    fontWeight: "600",
    fontSize: 14,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#FF5500",
    minWidth: 90,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#09090A",
    borderTopWidth: 1,
    borderTopColor: "#18181B",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabelActive: {
    fontSize: 11,
    color: "#FF5500",
    fontWeight: "600",
    marginTop: 3,
  },
  tabLabelInactive: {
    fontSize: 11,
    color: "#71717A",
    marginTop: 3,
  },
});
