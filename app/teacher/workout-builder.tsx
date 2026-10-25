import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createWorkoutDraft,
  getExercises,
  publishWorkout,
  updateWorkout,
} from "../../services/workoutService";
import {
  ExercicioResponseDTO,
  ItemTreinoInputDTO,
  SaveTreinoDTO,
} from "../../types/workout";

interface ExerciseItemState {
  exercicioId: number;
  name: string;
  series: string;
  reps: string;
  carga: string;
  rest: string;
}

export default function WorkoutBuilderScreen() {
  const router = useRouter();
  const { studentId, workoutId: initialWorkoutId } = useLocalSearchParams<{
    studentId: string;
    workoutId?: string;
  }>();

  const parsedStudentId = Number(studentId) || 1;
  const [workoutId, setWorkoutId] = useState<number | null>(
    initialWorkoutId ? Number(initialWorkoutId) : null,
  );

  const [workoutTitle, setWorkoutTitle] = useState("Treino A - Peito e Ombros");
  const [exercises, setExercises] = useState<ExerciseItemState[]>([]);

  // Estados do Modal do Catálogo e Loading
  const [modalVisible, setModalVisible] = useState(false);
  const [catalog, setCatalog] = useState<ExercicioResponseDTO[]>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [saving, setSaving] = useState(false);

  // Carrega os exercícios do backend Spring Boot ao abrir o modal
  useEffect(() => {
    if (modalVisible && catalog.length === 0) {
      loadCatalog();
    }
  }, [modalVisible]);

  async function loadCatalog() {
    try {
      setLoadingCatalog(true);
      const data = await getExercises();
      setCatalog(data);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar o catálogo de exercícios.",
      );
    } finally {
      setLoadingCatalog(false);
    }
  }

  // Adiciona o exercício escolhido no modal à lista do treino
  function handleSelectExercise(item: ExercicioResponseDTO) {
    const newExercise: ExerciseItemState = {
      exercicioId: item.id,
      name: item.nome,
      series: "4",
      reps: "10",
      carga: "0",
      rest: "90",
    };
    setExercises((prev) => [...prev, newExercise]);
    setModalVisible(false);
  }

  // Atualiza os parâmetros (séries, reps, carga, descanso)
  function updateExerciseParam(
    index: number,
    field: keyof ExerciseItemState,
    value: string,
  ) {
    setExercises((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  const removeExercise = (index: number) => {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  // Monta o DTO esperado pelo Java Spring Boot
  function buildPayload(): SaveTreinoDTO {
    const itens: ItemTreinoInputDTO[] = exercises.map((item, index) => ({
      exercicioId: item.exercicioId,
      ordem: index + 1,
      series: Number(item.series) || 1,
      repeticoes: Number(item.reps) || 1,
      carga: Number(item.carga) || 0,
      tempoSegundos: Number(item.rest) || 0,
      observacoes: item.name,
    }));

    return {
      observacoes: workoutTitle,
      itens,
    };
  }

  // Salvar como Rascunho (status: RASCUNHO)
  async function handleSaveDraft() {
    if (exercises.length === 0) {
      Alert.alert("Aviso", "Adicione pelo menos um exercício ao treino.");
      return;
    }

    try {
      setSaving(true);
      const payload = buildPayload();
      if (workoutId) {
        await updateWorkout(parsedStudentId, workoutId, payload);
        Alert.alert("Rascunho", "Rascunho do treino atualizado com sucesso!");
      } else {
        const created = await createWorkoutDraft(parsedStudentId, payload);
        setWorkoutId(created.id);
        Alert.alert("Rascunho", "Rascunho do treino criado com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar o rascunho do treino.");
    } finally {
      setSaving(false);
    }
  }

  // Publicar Treino para o Aluno (status: PUBLICADO)
  async function handlePublish() {
    if (exercises.length === 0) {
      Alert.alert("Aviso", "Adicione pelo menos um exercício ao treino.");
      return;
    }

    try {
      setSaving(true);
      const payload = buildPayload();
      let activeWorkoutId = workoutId;

      // Se ainda não foi salvo como rascunho no banco, salva primeiro
      if (!activeWorkoutId) {
        const created = await createWorkoutDraft(parsedStudentId, payload);
        activeWorkoutId = created.id;
        setWorkoutId(created.id);
      } else {
        await updateWorkout(parsedStudentId, activeWorkoutId, payload);
      }

      // Altera o status para PUBLICADO na API
      await publishWorkout(parsedStudentId, activeWorkoutId);

      Alert.alert("Sucesso!", "Treino publicado e enviado para o aluno.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao publicar o treino para o aluno.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.aiButton}>
            <Ionicons name="sparkles" size={14} color="#FF5500" />
            <Text style={styles.aiButtonText}>Sugerir com IA</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Montar Treino</Text>
        <Text style={styles.headerSubtitle}>Aluno ID: {parsedStudentId}</Text>

        {/* Nome do Treino */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Título da ficha</Text>
          <TextInput
            style={styles.input}
            value={workoutTitle}
            onChangeText={setWorkoutTitle}
            placeholderTextColor="#52525B"
          />
        </View>

        {/* Lista de Exercícios Adicionados */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Exercícios ({exercises.length})
          </Text>
          <TouchableOpacity
            style={styles.addInlineButton}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="plus" size={14} color="#FF5500" />
            <Text style={styles.addInlineText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {exercises.map((item, index) => (
          <View
            key={`${item.exercicioId}-${index}`}
            style={styles.exerciseCard}
          >
            <View style={styles.exerciseHeaderRow}>
              <Text style={styles.exerciseIndex}>#{index + 1}</Text>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <TouchableOpacity onPress={() => removeExercise(index)}>
                <Feather name="trash-2" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>

            <View style={styles.paramsRow}>
              <View style={styles.paramItem}>
                <Text style={styles.paramLabel}>Séries</Text>
                <TextInput
                  style={styles.paramInput}
                  value={item.series}
                  onChangeText={(val) =>
                    updateExerciseParam(index, "series", val)
                  }
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.paramItem}>
                <Text style={styles.paramLabel}>Reps</Text>
                <TextInput
                  style={styles.paramInput}
                  value={item.reps}
                  onChangeText={(val) =>
                    updateExerciseParam(index, "reps", val)
                  }
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.paramItem}>
                <Text style={styles.paramLabel}>Carga (kg)</Text>
                <TextInput
                  style={styles.paramInput}
                  value={item.carga}
                  onChangeText={(val) =>
                    updateExerciseParam(index, "carga", val)
                  }
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.paramItem}>
                <Text style={styles.paramLabel}>Desc. (s)</Text>
                <TextInput
                  style={styles.paramInput}
                  value={item.rest}
                  onChangeText={(val) =>
                    updateExerciseParam(index, "rest", val)
                  }
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        ))}

        {/* Botões de Ação: Salvar Rascunho / Publicar */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSaveDraft}
            disabled={saving}
          >
            <Text style={styles.secondaryButtonText}>
              {saving ? "A salvar..." : "Salvar Rascunho"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handlePublish}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Publicar Treino</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Catálogo de Exercícios (com dados vindos do data.sql) */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Catálogo de Exercícios</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Feather name="x" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {loadingCatalog ? (
            <ActivityIndicator
              size="large"
              color="#FF5500"
              style={{ marginTop: 40 }}
            />
          ) : (
            <FlatList
              data={catalog}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingVertical: 12 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.catalogCard}
                  onPress={() => handleSelectExercise(item)}
                >
                  <Text style={styles.catalogName}>{item.nome}</Text>
                  <Text style={styles.catalogSub}>
                    {item.objetivo} • {item.dificuldade}
                  </Text>
                  <Text style={styles.catalogDesc}>{item.descricao}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Tab Bar Inferior Professor */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/teacher/dashboard")}
        >
          <Feather name="home" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/teacher/students")}
        >
          <FontAwesome5 name="users" size={18} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="dumbbell" size={20} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Feather name="star" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Avaliações</Text>
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
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  aiButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#261710",
    borderWidth: 1,
    borderColor: "#FF5500",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  aiButtonText: {
    color: "#FF5500",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#18181B",
    color: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#27272A",
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
  addInlineButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addInlineText: {
    color: "#FF5500",
    fontSize: 13,
    fontWeight: "600",
  },
  exerciseCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 12,
  },
  exerciseHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseIndex: {
    color: "#FF5500",
    fontWeight: "bold",
    fontSize: 13,
    marginRight: 8,
  },
  exerciseName: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  paramsRow: {
    flexDirection: "row",
    gap: 8,
  },
  paramItem: {
    flex: 1,
  },
  paramLabel: {
    fontSize: 11,
    color: "#71717A",
    marginBottom: 4,
  },
  paramInput: {
    backgroundColor: "#09090A",
    color: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#27272A",
    textAlign: "center",
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#FF5500",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#09090A",
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#18181B",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  catalogCard: {
    backgroundColor: "#18181B",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  catalogName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  catalogSub: {
    color: "#FF5500",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  catalogDesc: {
    color: "#71717A",
    fontSize: 12,
    marginTop: 4,
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
