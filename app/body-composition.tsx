import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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

const circumferences = [
  { label: "Tórax / Peitoral", val: "98 cm", diff: "+1.5 cm" },
  { label: "Cintura", val: "74 cm", diff: "-2.0 cm" },
  { label: "Quadril", val: "96 cm", diff: "0.0 cm" },
  { label: "Braço Direito", val: "33 cm", diff: "+0.8 cm" },
  { label: "Braço Esquerdo", val: "32.8 cm", diff: "+0.8 cm" },
  { label: "Coxa Direita", val: "56 cm", diff: "+1.0 cm" },
];

export default function BodyCompositionScreen() {
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

        <Text style={styles.headerTitle}>Composição Corporal</Text>
        <Text style={styles.headerSubtitle}>
          Última avaliação realizada em 10/08/2026
        </Text>

        {/* Resumo em Destaque */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Gordura Corporal</Text>
            <Text style={styles.summaryValue}>18.2%</Text>
            <View style={styles.badgeGood}>
              <Text style={styles.badgeTextGood}>-1.4% este mês</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Massa Magra</Text>
            <Text style={styles.summaryValue}>52.7 kg</Text>
            <View style={styles.badgeGood}>
              <Text style={styles.badgeTextGood}>+0.9 kg este mês</Text>
            </View>
          </View>
        </View>

        {/* Card de Peso & IMC */}
        <View style={styles.infoRowCard}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>PESO ATUAL</Text>
            <Text style={styles.infoVal}>64.5 kg</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>IMC</Text>
            <Text style={styles.infoVal}>22.8 kg/m²</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>STATUS</Text>
            <Text style={[styles.infoVal, { color: "#22C55E" }]}>
              Eutrófico
            </Text>
          </View>
        </View>

        {/* Perímetros e Circunferências */}
        <Text style={styles.sectionTitle}>Circunferências (cm)</Text>
        <View style={styles.listCard}>
          {circumferences.map((item, idx) => (
            <React.Fragment key={item.label}>
              <View style={styles.measureRow}>
                <Text style={styles.measureLabel}>{item.label}</Text>
                <View style={styles.measureValues}>
                  <Text style={styles.measureVal}>{item.val}</Text>
                  <Text
                    style={[
                      styles.measureDiff,
                      item.diff.startsWith("-") && { color: "#22C55E" },
                    ]}
                  >
                    {item.diff}
                  </Text>
                </View>
              </View>
              {idx < circumferences.length - 1 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Botão Agendar Nova Avaliação */}
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.actionBtnText}>
            Agendar Nova Avaliação Física
          </Text>
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
  summaryGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#71717A",
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF5500",
    marginVertical: 6,
  },
  badgeGood: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  badgeTextGood: {
    color: "#22C55E",
    fontSize: 10,
    fontWeight: "bold",
  },
  infoRowCard: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    alignItems: "center",
    marginBottom: 24,
  },
  infoCol: {
    flex: 1,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 9,
    color: "#71717A",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  infoVal: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  verticalDivider: {
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
  listCard: {
    backgroundColor: "#18181B",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 20,
  },
  measureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  measureLabel: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  measureValues: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  measureVal: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  measureDiff: {
    color: "#FF5500",
    fontSize: 11,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5500",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  actionBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
