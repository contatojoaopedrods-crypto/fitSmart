import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

const measurements = [
  { label: "Tórax", current: "102 cm", prev: "98 cm", diff: "+4 cm" },
  {
    label: "Braço Direito",
    current: "39 cm",
    prev: "37.5 cm",
    diff: "+1.5 cm",
  },
  { label: "Cintura", current: "81 cm", prev: "84 cm", diff: "-3 cm" },
  { label: "Quadril", current: "96 cm", prev: "97 cm", diff: "-1 cm" },
  { label: "Coxa Direita", current: "60 cm", prev: "58 cm", diff: "+2 cm" },
];

export default function EvaluationHistoryScreen() {
  const router = useRouter();

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

        <Text style={styles.headerTitle}>Avaliações Físicas</Text>
        <Text style={styles.headerSubtitle}>
          Última bioimpedância realizada em 05/08/2026
        </Text>

        {/* Resumo Corporal Destaque */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>14.2%</Text>
              <Text style={styles.summaryLabel}>Gordura Corporal</Text>
              <View style={styles.badgeSuccess}>
                <Text style={styles.badgeText}>-2.1%</Text>
              </View>
            </View>

            <View style={styles.dividerVertical} />

            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>41.8 kg</Text>
              <Text style={styles.summaryLabel}>Massa Magra</Text>
              <View style={styles.badgeSuccess}>
                <Text style={styles.badgeText}>+1.4 kg</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Perímetros e Medidas */}
        <Text style={styles.sectionTitle}>Evolução de Perímetros</Text>

        <View style={styles.measurementsList}>
          {measurements.map((item, index) => (
            <View key={index} style={styles.measureCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.measureLabel}>{item.label}</Text>

                <View style={styles.measureValuesRow}>
                  <Text style={styles.currentVal}>{item.current}</Text>
                  <Text style={styles.prevVal}>Anterior: {item.prev}</Text>
                </View>
              </View>

              <View style={styles.diffBadge}>
                <Text style={styles.diffText}>{item.diff}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Botão para Agendar Nova Avaliação */}
        <TouchableOpacity
          style={styles.requestBtn}
          onPress={() =>
            Alert.alert(
              "Solicitação enviada!",
              "O setor de avaliação física entrará em contato para agendar seu horário.",
            )
          }
        >
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.requestBtnText}>Solicitar Nova Avaliação</Text>
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
  summaryCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#71717A",
    marginTop: 4,
    marginBottom: 8,
  },
  badgeSuccess: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: "#22C55E",
    fontSize: 10,
    fontWeight: "bold",
  },
  dividerVertical: {
    width: 1,
    height: "80%",
    backgroundColor: "#27272A",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  measurementsList: {
    gap: 10,
    marginBottom: 28,
  },
  measureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  measureLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  measureValuesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  currentVal: {
    color: "#FF5500",
    fontSize: 13,
    fontWeight: "bold",
  },
  prevVal: {
    color: "#71717A",
    fontSize: 11,
  },
  diffBadge: {
    backgroundColor: "#27272A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  diffText: {
    color: "#D4D4D8",
    fontSize: 11,
    fontWeight: "bold",
  },
  requestBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5500",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  requestBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
