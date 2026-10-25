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

export default function EvaluationDetailScreen() {
  const router = useRouter();

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
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="more-horizontal" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Avaliação Física</Text>
        <Text style={styles.headerSubtitle}>14/05/2026</Text>

        {/* Composição Corporal */}
        <Text style={styles.sectionTitle}>Composição corporal</Text>
        <View style={styles.grid2x2}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Peso</Text>
            <Text style={styles.metricValue}>
              62,5 <Text style={styles.metricUnit}>kg</Text>
            </Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>% Gordura</Text>
            <Text style={styles.metricValue}>
              23<Text style={styles.metricUnit}>%</Text>
            </Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Massa Magra</Text>
            <Text style={styles.metricValue}>
              48,1 <Text style={styles.metricUnit}>kg</Text>
            </Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>IMC</Text>
            <Text style={styles.metricValue}>22,1</Text>
          </View>
        </View>

        {/* Medidas */}
        <Text style={styles.sectionTitle}>Medidas</Text>
        <View style={styles.grid2x2}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Cintura</Text>
            <Text style={styles.metricValue}>
              72 <Text style={styles.metricUnit}>cm</Text>
            </Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Quadril</Text>
            <Text style={styles.metricValue}>
              98 <Text style={styles.metricUnit}>cm</Text>
            </Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Braço</Text>
            <Text style={styles.metricValue}>
              28 <Text style={styles.metricUnit}>cm</Text>
            </Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Coxa</Text>
            <Text style={styles.metricValue}>
              56 <Text style={styles.metricUnit}>cm</Text>
            </Text>
          </View>
        </View>

        {/* Observações */}
        <Text style={styles.sectionTitle}>Observações</Text>
        <View style={styles.cardBox}>
          <Text style={styles.bodyText}>
            Aluno relata dor leve no ombro direito ao realizar movimentos acima
            da cabeça.
          </Text>
        </View>

        {/* Lesões e Limitações */}
        <Text style={styles.sectionTitle}>Lesões e limitações</Text>
        <View style={styles.cardBox}>
          <View style={styles.orangeBadge}>
            <Text style={styles.orangeBadgeText}>Ombro direito</Text>
          </View>
          <Text style={[styles.bodyText, { marginTop: 8 }]}>
            Dor ao elevar o braço acima da cabeça
          </Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
    marginTop: 8,
  },
  grid2x2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  metricBox: {
    width: "48%",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  metricLabel: {
    fontSize: 12,
    color: "#71717A",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  metricUnit: {
    fontSize: 13,
    fontWeight: "normal",
    color: "#A1A1AA",
  },
  cardBox: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 16,
  },
  bodyText: {
    color: "#D4D4D8",
    fontSize: 13,
    lineHeight: 18,
  },
  orangeBadge: {
    backgroundColor: "#FF5500",
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  orangeBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
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
