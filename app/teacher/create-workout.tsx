import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialExercises = [
  {
    id: "1",
    name: "Supino Reto com Barra",
    sets: "4",
    reps: "10-12",
    rest: "60s",
  },
  {
    id: "2",
    name: "Supino Inclinado c/ Halteres",
    sets: "3",
    reps: "12",
    rest: "45s",
  },
  {
    id: "3",
    name: "Crossover na Polia Alta",
    sets: "4",
    reps: "15",
    rest: "45s",
  },
];

export default function CreateWorkoutScreen() {
  const router = useRouter();
  const [workoutTitle, setWorkoutTitle] = useState(
    "Treino A - Peito & Tríceps",
  );
  const [exercises, setExercises] = useState(initialExercises);

  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      {/* Header com Ação de Salvar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Montar Treino</Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* Identificação do Treino */}
        <Text style={styles.label}>NOME DO TREINO</Text>
        <TextInput
          style={styles.input}
          value={workoutTitle}
          onChangeText={setWorkoutTitle}
          placeholder="Ex: Treino A - Superior Focus"
          placeholderTextColor="#52525B"
        />

        <Text style={styles.label}>ORIENTAÇÕES / NOTAS PARA O ALUNO</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={3}
          placeholder="Ex: Aquecer 5 min na esteira antes de iniciar..."
          placeholderTextColor="#52525B"
        />

        {/* Lista de Exercícios Adicionados */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Exercícios ({exercises.length})
          </Text>
          <TouchableOpacity style={styles.addExBadge}>
            <Ionicons name="add" size={16} color="#FF5500" />
            <Text style={styles.addExText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {exercises.map((item, index) => (
          <View key={item.id} style={styles.exerciseCard}>
            <View style={styles.exCardHeader}>
              <Text style={styles.exIndex}>{index + 1}.</Text>
              <Text style={styles.exTitle}>{item.name}</Text>
              <TouchableOpacity onPress={() => removeExercise(item.id)}>
                <Feather name="trash-2" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>

            <View style={styles.exConfigGrid}>
              <View style={styles.configBox}>
                <Text style={styles.configLabel}>SÉRIES</Text>
                <TextInput
                  style={styles.configInput}
                  defaultValue={item.sets}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.configBox}>
                <Text style={styles.configLabel}>REPETIÇÕES</Text>
                <TextInput
                  style={styles.configInput}
                  defaultValue={item.reps}
                />
              </View>

              <View style={styles.configBox}>
                <Text style={styles.configLabel}>DESCANSO</Text>
                <TextInput
                  style={styles.configInput}
                  defaultValue={item.rest}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#18181B",
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#FF5500",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#71717A",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#18181B",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#27272A",
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  addExBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addExText: {
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
  exCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  exIndex: {
    color: "#FF5500",
    fontWeight: "bold",
    fontSize: 14,
  },
  exTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  exConfigGrid: {
    flexDirection: "row",
    gap: 8,
  },
  configBox: {
    flex: 1,
    backgroundColor: "#09090A",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  configLabel: {
    fontSize: 9,
    color: "#71717A",
    fontWeight: "bold",
  },
  configInput: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 2,
    padding: 0,
  },
});
