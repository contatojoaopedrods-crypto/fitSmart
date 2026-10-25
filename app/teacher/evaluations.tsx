import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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

const evaluationsHistory = [
  { id: "1", date: "14/05/2026", weight: "62,5 kg", bodyFat: "23%" },
  { id: "2", date: "10/03/2026", weight: "63,2 kg", bodyFat: "24%" },
  { id: "3", date: "12/01/2026", weight: "64,0 kg", bodyFat: "25%" },
  { id: "4", date: "15/11/2025", weight: "65,1 kg", bodyFat: "26%" },
];

export default function EvaluationsScreen() {
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

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Avaliações</Text>
            <Text style={styles.studentName}>Ana Carolina</Text>
          </View>

          <TouchableOpacity style={styles.addEvaluationButton}>
            <Feather name="plus" size={16} color="#FFFFFF" />
            <Text style={styles.addEvaluationText}>Nova avaliação</Text>
          </TouchableOpacity>
        </View>

        {/* Lista Cronológica */}
        <View style={{ marginTop: 20 }}>
          {evaluationsHistory.map((item) => (
            <View key={item.id} style={styles.evaluationCard}>
              <View>
                <Text style={styles.evalDate}>{item.date}</Text>
                <Text style={styles.evalMeta}>
                  Peso: {item.weight} • % Gordura: {item.bodyFat}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.outlineOrangeButton}
                onPress={() => router.push("/teacher/evaluation-detail")}
              >
                <Text style={styles.outlineOrangeText}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

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
          <MaterialCommunityIcons name="dumbbell" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Feather name="star" size={20} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Avaliações</Text>
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
  backButton: {
    marginBottom: 16,
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  studentName: {
    fontSize: 14,
    color: "#71717A",
    marginTop: 2,
  },
  addEvaluationButton: {
    flexDirection: "row",
    backgroundColor: "#FF5500",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    gap: 6,
  },
  addEvaluationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  evaluationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  evalDate: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  evalMeta: {
    fontSize: 12,
    color: "#71717A",
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
