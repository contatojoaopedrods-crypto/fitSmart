import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const initialLogs = [
  { id: "1", amount: 250, time: "08:15" },
  { id: "2", amount: 500, time: "10:30" },
  { id: "3", amount: 350, time: "13:00" },
  { id: "4", amount: 500, time: "16:45" },
];

export default function HydrationScreen() {
  const router = useRouter();
  const targetWater = 3000; // 3 Litros
  const [logs, setLogs] = useState(initialLogs);

  const currentWater = logs.reduce((acc, curr) => acc + curr.amount, 0);
  const progressPercent = Math.min(
    Math.round((currentWater / targetWater) * 100),
    100,
  );

  const addWater = (amount: number) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const newEntry = {
      id: Date.now().toString(),
      amount,
      time: timeStr,
    };
    setLogs([newEntry, ...logs]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Hidratação Diária</Text>
        <Text style={styles.headerSubtitle}>
          Mantenha-se hidratado para otimizar seus treinos
        </Text>

        {/* Card do Progresso Principal */}
        <View style={styles.progressCard}>
          <View style={styles.waterIconCircle}>
            <Ionicons name="water-sharp" size={36} color="#3B82F6" />
          </View>

          <Text style={styles.currentValue}>{currentWater} ml</Text>
          <Text style={styles.targetLabel}>
            Meta de hoje: {targetWater} ml ({progressPercent}%)
          </Text>

          {/* Barra de Progresso */}
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
          </View>
        </View>

        {/* Botões de Adição Rápida */}
        <Text style={styles.sectionTitle}>Adicionar Água</Text>
        <View style={styles.quickAddRow}>
          {[200, 300, 500, 750].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.quickAddBtn}
              onPress={() => addWater(amount)}
            >
              <MaterialCommunityIcons
                name="cup-water"
                size={20}
                color="#FF5500"
              />
              <Text style={styles.quickAddText}>+{amount}ml</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Histórico do Dia */}
        <Text style={styles.sectionTitle}>Registros de Hoje</Text>
        {logs.map((item) => (
          <View key={item.id} style={styles.logCard}>
            <View style={styles.logIconBox}>
              <Ionicons name="water" size={18} color="#3B82F6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.logAmount}>+{item.amount} ml</Text>
              <Text style={styles.logTime}>Registrado às {item.time}</Text>
            </View>
            <Feather name="check" size={16} color="#22C55E" />
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
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 16,
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  waterIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  currentValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  targetLabel: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 4,
    marginBottom: 20,
  },
  progressTrack: {
    width: "100%",
    height: 10,
    backgroundColor: "#27272A",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  quickAddRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  quickAddBtn: {
    flex: 1,
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
    gap: 6,
  },
  quickAddText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  logCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 8,
    gap: 12,
  },
  logIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  logAmount: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  logTime: {
    color: "#71717A",
    fontSize: 11,
    marginTop: 2,
  },
});
