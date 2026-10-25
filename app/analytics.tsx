import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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

const periods = ["1M", "3M", "6M", "1A"];

const weeklyProgress = [
  { day: "Sem 1", val: 60 },
  { day: "Sem 2", val: 75 },
  { day: "Sem 3", val: 90 },
  { day: "Sem 4", val: 100 },
];

export default function AnalyticsScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("1M");

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

        <Text style={styles.headerTitle}>Análise de Desempenho</Text>
        <Text style={styles.headerSubtitle}>
          Acompanhe sua progressão de carga e consistência
        </Text>

        {/* Seletor de Período */}
        <View style={styles.periodRow}>
          {periods.map((p) => {
            const isSelected = selectedPeriod === p;
            return (
              <TouchableOpacity
                key={p}
                style={[
                  styles.periodChip,
                  isSelected && styles.periodChipActive,
                ]}
                onPress={() => setSelectedPeriod(p)}
              >
                <Text
                  style={[
                    styles.periodChipText,
                    isSelected && styles.periodChipTextActive,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Card do Gráfico Visual (Volume de Carga acumulada) */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Volume de Carga Acumulada</Text>
              <Text style={styles.chartValue}>84.200 kg</Text>
            </View>
            <View style={styles.growthBadge}>
              <Feather name="trending-up" size={14} color="#22C55E" />
              <Text style={styles.growthText}>+14%</Text>
            </View>
          </View>

          {/* Renderização Visual em Barras */}
          <View style={styles.barsContainer}>
            {weeklyProgress.map((item) => (
              <View key={item.day} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${item.val}%` }]} />
                </View>
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recordes Pessoais (PRs) */}
        <Text style={styles.sectionTitle}>Recordes Pessoais (PRs)</Text>

        <View style={styles.prCard}>
          <View style={styles.prIconBox}>
            <MaterialCommunityIcons name="trophy" size={20} color="#FF5500" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.prExercise}>Supino Reto com Barra</Text>
            <Text style={styles.prDate}>Alcançado em 20 de Ago</Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.prWeight}>95 kg</Text>
            <Text style={styles.prReps}>6 reps</Text>
          </View>
        </View>

        <View style={styles.prCard}>
          <View style={styles.prIconBox}>
            <MaterialCommunityIcons name="trophy" size={20} color="#FF5500" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.prExercise}>Agachamento Livre</Text>
            <Text style={styles.prDate}>Alcançado em 15 de Ago</Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.prWeight}>120 kg</Text>
            <Text style={styles.prReps}>8 reps</Text>
          </View>
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
  periodRow: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  periodChip: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  periodChipActive: {
    backgroundColor: "#FF5500",
  },
  periodChipText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "600",
  },
  periodChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  chartCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  chartTitle: {
    color: "#71717A",
    fontSize: 12,
  },
  chartValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 2,
  },
  growthBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  growthText: {
    color: "#22C55E",
    fontSize: 12,
    fontWeight: "bold",
  },
  barsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 120,
    paddingTop: 10,
  },
  barCol: {
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
    width: 36,
  },
  barTrack: {
    width: 12,
    height: 90,
    backgroundColor: "#27272A",
    borderRadius: 6,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    backgroundColor: "#FF5500",
    borderRadius: 6,
  },
  barLabel: {
    color: "#71717A",
    fontSize: 10,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  prCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 10,
    gap: 12,
  },
  prIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  prExercise: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  prDate: {
    color: "#71717A",
    fontSize: 11,
    marginTop: 2,
  },
  prWeight: {
    color: "#FF5500",
    fontSize: 15,
    fontWeight: "bold",
  },
  prReps: {
    color: "#71717A",
    fontSize: 11,
  },
});
