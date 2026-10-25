import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EvaluationScreen() {
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

        <Text style={styles.headerTitle}>Avaliação Física</Text>
        <Text style={styles.headerSubtitle}>
          Última atualização: 15 de Agosto de 2026
        </Text>

        {/* Resumo de Composição Corporal */}
        <View style={styles.grid2x2}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>PESO ATUAL</Text>
            <Text style={styles.metricValue}>78,4 kg</Text>
            <Text style={styles.metricSub}>-1,8 kg vs anterior</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>% GORDURA (BF)</Text>
            <Text style={[styles.metricValue, { color: "#FF5500" }]}>
              14,2%
            </Text>
            <Text style={styles.metricSub}>-1,5% vs anterior</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>MASSA MAGRA</Text>
            <Text style={styles.metricValue}>62,1 kg</Text>
            <Text style={styles.metricSub}>+0,6 kg vs anterior</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>IMC</Text>
            <Text style={styles.metricValue}>23,8</Text>
            <Text style={styles.metricSub}>Saudável</Text>
          </View>
        </View>

        {/* Medidas Perimétricas */}
        <Text style={styles.sectionTitle}>Perímetros (cm)</Text>
        <View style={styles.cardBox}>
          <View style={styles.measureRow}>
            <Text style={styles.measureName}>Tórax / Peitoral</Text>
            <Text style={styles.measureValue}>102 cm</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.measureRow}>
            <Text style={styles.measureName}>Cintura</Text>
            <Text style={styles.measureValue}>81 cm</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.measureRow}>
            <Text style={styles.measureName}>Abdômen</Text>
            <Text style={styles.measureValue}>84 cm</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.measureRow}>
            <Text style={styles.measureName}>Braço Relaxado (Dir/Esq)</Text>
            <Text style={styles.measureValue}>37,5 / 37,2 cm</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.measureRow}>
            <Text style={styles.measureName}>Coxa (Dir/Esq)</Text>
            <Text style={styles.measureValue}>58,0 / 58,0 cm</Text>
          </View>
        </View>

        {/* Observações do Avaliador */}
        <Text style={styles.sectionTitle}>Parecer Técnico</Text>
        <View style={styles.notesCard}>
          <FontAwesome5
            name="notes-medical"
            size={18}
            color="#FF5500"
            style={{ marginTop: 2 }}
          />
          <Text style={styles.notesText}>
            Excelente evolução no último bimestre. Redução expressiva no
            percentual de gordura abdominal mantendo massa magra. Manter o
            superávit proteico no plano alimentar.
          </Text>
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
  grid2x2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#71717A",
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 6,
  },
  metricSub: {
    fontSize: 11,
    color: "#22C55E",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  cardBox: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  measureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  measureName: {
    color: "#A1A1AA",
    fontSize: 13,
  },
  measureValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
  },
  notesCard: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    gap: 12,
  },
  notesText: {
    flex: 1,
    color: "#D4D4D8",
    fontSize: 13,
    lineHeight: 18,
  },
});
