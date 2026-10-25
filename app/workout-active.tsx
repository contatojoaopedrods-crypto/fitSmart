import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const initialSets = [
  { set: 1, prev: "80kg × 10", weight: "80kg", reps: "10", completed: true },
  { set: 2, prev: "85kg × 8", weight: "85kg", reps: "8", completed: true },
  { set: 3, prev: "85kg × 8", weight: "85kg", reps: "8", completed: false },
  { set: 4, prev: "90kg × 6", weight: "90kg", reps: "6", completed: false },
];

export default function ActiveWorkoutScreen() {
  const router = useRouter();
  const [sets, setSets] = useState(initialSets);
  const [restTimer, setRestTimer] = useState("00:45");

  const toggleSet = (index: number) => {
    setSets((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleFinishWorkout = () => {
    Alert.alert(
      "Treino Concluído!",
      "Parabéns por registrar mais um treino hoje!",
      [{ text: "OK", onPress: () => router.push("/") }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      {/* Header do Treino */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="x" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.timerBadge}>
          <Feather name="clock" size={14} color="#FF5500" />
          <Text style={styles.timerText}>24:12</Text>
        </View>

        <TouchableOpacity
          style={styles.finishHeaderBtn}
          onPress={handleFinishWorkout}
        >
          <Text style={styles.finishHeaderText}>Concluir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* Exercício Atual */}
        <Text style={styles.exerciseCategory}>PEITORAL</Text>
        <Text style={styles.exerciseTitle}>Supino Reto com Barra</Text>

        {/* Caixas de Séries */}
        <View style={styles.setsHeaderRow}>
          <Text style={[styles.setColTitle, { width: 40 }]}>SÉRIE</Text>
          <Text style={[styles.setColTitle, { flex: 1 }]}>ANTERIOR</Text>
          <Text style={[styles.setColTitle, { flex: 1 }]}>CARGA</Text>
          <Text style={[styles.setColTitle, { flex: 1 }]}>REPS</Text>
          <Text
            style={[styles.setColTitle, { width: 40, textAlign: "center" }]}
          >
            FEITO
          </Text>
        </View>

        {sets.map((item, index) => (
          <View
            key={item.set}
            style={[styles.setRow, item.completed && styles.setRowDone]}
          >
            <Text style={styles.setNumber}>{item.set}</Text>
            <Text style={styles.setPrev}>{item.prev}</Text>

            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{item.weight}</Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{item.reps}</Text>
            </View>

            <TouchableOpacity
              style={[styles.checkBtn, item.completed && styles.checkBtnDone]}
              onPress={() => toggleSet(index)}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Cronômetro de Descanso Fixo/Em Destaque */}
        <View style={styles.restCard}>
          <View style={styles.restInfo}>
            <MaterialCommunityIcons
              name="timer-sand"
              size={20}
              color="#FF5500"
            />
            <Text style={styles.restTitle}>Tempo de Descanso</Text>
          </View>

          <Text style={styles.restTimerText}>{restTimer}</Text>

          <TouchableOpacity style={styles.addTimeBtn}>
            <Text style={styles.addTimeText}>+30s</Text>
          </TouchableOpacity>
        </View>

        {/* Ações Inferiores */}
        <TouchableOpacity style={styles.nextExerciseBtn}>
          <Text style={styles.nextExerciseText}>Próximo Exercício</Text>
          <Feather name="arrow-right" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090A",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#18181B",
  },
  timerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#18181B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  timerText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  finishHeaderBtn: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  finishHeaderText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  exerciseCategory: {
    color: "#FF5500",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  exerciseTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 20,
  },
  setsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  setColTitle: {
    color: "#71717A",
    fontSize: 10,
    fontWeight: "bold",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#27272A",
    gap: 8,
  },
  setRowDone: {
    backgroundColor: "#121814",
    borderColor: "#15803D",
  },
  setNumber: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    width: 32,
  },
  setPrev: {
    color: "#71717A",
    fontSize: 12,
    flex: 1,
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#09090A",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  inputText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  checkBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBtnDone: {
    backgroundColor: "#22C55E",
  },
  restCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 14,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FF5500",
  },
  restInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  restTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  restTimerText: {
    color: "#FF5500",
    fontSize: 18,
    fontWeight: "bold",
  },
  addTimeBtn: {
    backgroundColor: "#27272A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addTimeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  nextExerciseBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5500",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 24,
    gap: 8,
  },
  nextExerciseText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
