import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import api from "../../services/api";
import { getStudentWorkouts } from "../../services/workoutService";
import { TreinoResponseDTO } from "../../types/workout";

interface UserResponse {
  id: number;
  nome: string;
  sobrenome?: string;
  email: string;
  telefone?: string;
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

export default function StudentDetailScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    studentId?: string;
    id?: string;
  }>();

  const activeStudentId = params.studentId || params.id;

  const [student, setStudent] = useState<AlunoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Estados dos treinos do aluno
  const [workouts, setWorkouts] = useState<TreinoResponseDTO[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<
    "Resumo" | "Avaliações" | "Treinos" | "Histórico"
  >("Resumo");

  // Carrega os dados do aluno e a lista de treinos
  const fetchData = async () => {
    if (!activeStudentId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // 1. Procura perfil do aluno
      const studentRes = await api.get(
        `/professors/me/students/${activeStudentId}`,
      );
      setStudent(studentRes.data);

      // 2. Procura os treinos associados ao aluno
      setLoadingWorkouts(true);
      const workoutsData = await getStudentWorkouts(Number(activeStudentId));
      setWorkouts(workoutsData);
    } catch (error: any) {
      console.error("Erro ao carregar dados do aluno:", error);
      notify("Erro", "Não foi possível carregar as informações do aluno.");
    } finally {
      setLoading(false);
      setLoadingWorkouts(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeStudentId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#09090A" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF5500" />
        </View>
      </SafeAreaView>
    );
  }

  const studentName = student
    ? `${student.user?.nome || ""} ${student.user?.sobrenome || ""}`.trim()
    : "Aluno";

  const avatarInitial = student?.user?.nome
    ? student.user.nome.charAt(0).toUpperCase()
    : "A";

  const latestWorkout = workouts.length > 0 ? workouts[0] : null;

  const handleOpenWorkoutBuilder = (workoutId?: number) => {
    router.push({
      pathname: "/teacher/workout-builder",
      params: {
        studentId: activeStudentId,
        studentName,
        workoutId: workoutId ? String(workoutId) : undefined,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* Topo com Voltar e Opções */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="more-horizontal" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Perfil Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarInitialText}>{avatarInitial}</Text>
          </View>
          <Text style={styles.studentName}>{studentName}</Text>
          <Text style={styles.studentMeta}>
            {student?.user?.email || "Sem e-mail"}
          </Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Ativo</Text>
          </View>
        </View>

        {/* NAVEGAÇÃO DE ABAS */}
        <View style={styles.tabsRow}>
          {(["Resumo", "Avaliações", "Treinos", "Histórico"] as const).map(
            (tab) => {
              const isSelected = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabButton,
                    isSelected && styles.tabButtonActive,
                  ]}
                  onPress={() => {
                    setActiveTab(tab);
                    if (tab === "Avaliações") {
                      router.push({
                        pathname: "/teacher/evaluations",
                        params: { studentId: activeStudentId },
                      });
                    }
                  }}
                >
                  <Text
                    style={[styles.tabText, isSelected && styles.tabTextActive]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            },
          )}
        </View>

        {/* CONTEÚDO DA ABA: RESUMO */}
        {activeTab === "Resumo" && (
          <>
            <Text style={styles.sectionTitle}>Informações</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>E-mail</Text>
                <Text style={styles.infoValue}>
                  {student?.user?.email || "N/A"}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <Text style={styles.infoValue}>
                  {student?.user?.telefone || "Não informado"}
                </Text>
              </View>
            </View>

            {/* Resumo Ficha de Treino Atual */}
            <View style={styles.actionCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionCardTitle}>Ficha de Treino</Text>
                <Text style={styles.actionCardSubtitle}>
                  {latestWorkout
                    ? `${latestWorkout.observacoes || "Treino Ativo"} (${latestWorkout.status})`
                    : "Nenhum treino ativo montado"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.outlineOrangeButton}
                onPress={() => handleOpenWorkoutBuilder(latestWorkout?.id)}
              >
                <Text style={styles.outlineOrangeText}>
                  {latestWorkout ? "Editar Treino" : "Montar Treino"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* CONTEÚDO DA ABA: TREINOS */}
        {activeTab === "Treinos" && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Treinos ({workouts.length})
              </Text>
              <TouchableOpacity
                style={styles.createWorkoutBtn}
                onPress={() => handleOpenWorkoutBuilder()}
              >
                <Feather name="plus" size={14} color="#FFFFFF" />
                <Text style={styles.createWorkoutBtnText}>Novo Treino</Text>
              </TouchableOpacity>
            </View>

            {loadingWorkouts ? (
              <ActivityIndicator
                size="small"
                color="#FF5500"
                style={{ marginVertical: 20 }}
              />
            ) : workouts.length === 0 ? (
              <View style={styles.emptyCard}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={32}
                  color="#3F3F46"
                />
                <Text style={styles.emptyText}>
                  Nenhum treino registado para este aluno.
                </Text>
              </View>
            ) : (
              workouts.map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  style={styles.workoutCard}
                  onPress={() => handleOpenWorkoutBuilder(workout.id)}
                >
                  <View style={styles.workoutHeaderRow}>
                    <Text style={styles.workoutCardTitle}>
                      {workout.observacoes || `Treino #${workout.id}`}
                    </Text>
                    <View
                      style={[
                        styles.badge,
                        workout.status === "ATIVO"
                          ? styles.badgeActive
                          : styles.badgeDraft,
                      ]}
                    >
                      <Text style={styles.badgeText}>{workout.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.workoutCardSub}>
                    {workout.itens?.length || 0} exercícios cadastrados
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </>
        )}
      </ScrollView>

      {/* Tab Bar Inferior */}
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
          onPress={() => handleOpenWorkoutBuilder()}
        >
          <MaterialCommunityIcons name="dumbbell" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#261710",
    borderWidth: 2,
    borderColor: "#FF5500",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarInitialText: {
    color: "#FF5500",
    fontSize: 32,
    fontWeight: "bold",
  },
  studentName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  studentMeta: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#22C55E",
    fontSize: 12,
    fontWeight: "600",
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#27272A",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF5500",
  },
  tabText: {
    fontSize: 13,
    color: "#71717A",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  createWorkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5500",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  createWorkoutBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#71717A",
  },
  infoValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
  },
  actionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 12,
  },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
  },
  outlineOrangeButton: {
    borderWidth: 1,
    borderColor: "#FF5500",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  outlineOrangeText: {
    color: "#FF5500",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  emptyText: {
    color: "#71717A",
    marginTop: 8,
    fontSize: 13,
  },
  workoutCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 10,
  },
  workoutHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutCardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  workoutCardSub: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeActive: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
  },
  badgeDraft: {
    backgroundColor: "rgba(234, 179, 8, 0.15)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
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
