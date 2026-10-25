import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

export default function TeacherDashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [studentCount, setStudentCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Carrega a contagem de alunos vinculados ao professor
  const loadDashboardData = async () => {
    try {
      const response = await api.get("/professors/me/students");
      if (Array.isArray(response.data)) {
        setStudentCount(response.data.length);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const displayName = user?.nome ? `Prof. ${user.nome}` : "Professor";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView
        contentContainerStyle={styles.scrollPadding}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FF5500"
          />
        }
      >
        {/* Topo / Boas-vindas */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>
              Bem-vindo de volta, {displayName} 👋
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={20} color="#FFFFFF" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Resumo Principal: Alunos Ativos e Avaliações */}
        <View style={styles.mainMetricsRow}>
          <TouchableOpacity
            style={styles.mainMetricCard}
            onPress={() => router.push("/teacher/students")}
          >
            <View style={styles.metricIconBox}>
              <FontAwesome5 name="users" size={18} color="#FF5500" />
            </View>
            <View>
              <Text style={styles.metricSubLabel}>Alunos ativos</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#FF5500" />
              ) : (
                <Text style={styles.metricNumber}>{studentCount}</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainMetricCard}
            onPress={() => router.push("/teacher/evaluations")}
          >
            <View style={styles.metricIconBox}>
              <Feather name="camera" size={20} color="#FF5500" />
            </View>
            <View>
              <Text style={styles.metricSubLabel}>Avaliações</Text>
              <Text style={styles.metricNumber}>0</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Visão Geral & Seletor de Período */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Visão geral</Text>
          <TouchableOpacity style={styles.periodSelector}>
            <Text style={styles.periodText}>Últimos 7 dias</Text>
            <Feather name="chevron-down" size={14} color="#A1A1AA" />
          </TouchableOpacity>
        </View>

        {/* Cards Secundários (2x2) */}
        <View style={styles.gridContainer}>
          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>Adesão média</Text>
            <View style={styles.gridValueRow}>
              <Text style={styles.gridNumber}>100%</Text>
            </View>
          </View>

          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>Treinos concluídos</Text>
            <View style={styles.gridValueRow}>
              <Text style={styles.gridNumber}>0</Text>
            </View>
          </View>

          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>Novas avaliações</Text>
            <View style={styles.gridValueRow}>
              <Text style={styles.gridNumber}>0</Text>
            </View>
          </View>

          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>Feedbacks</Text>
            <View style={styles.gridValueRow}>
              <Text style={styles.gridNumber}>0</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Tab Bar Inferior Professor */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.replace("/teacher/dashboard")}
        >
          <Feather name="home" size={20} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/teacher/students")}
        >
          <FontAwesome5 name="users" size={18} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/teacher/workout-builder")}
        >
          <MaterialCommunityIcons name="dumbbell" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/teacher/evaluations")}
        >
          <Feather name="star" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Avaliações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090A" },
  scrollPadding: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#FFFFFF" },
  headerSubtitle: { fontSize: 13, color: "#71717A", marginTop: 2 },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#18181B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5500",
  },
  mainMetricsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  mainMetricCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  metricIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#261710",
    alignItems: "center",
    justifyContent: "center",
  },
  metricSubLabel: { fontSize: 12, color: "#71717A" },
  metricNumber: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
  periodSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  periodText: { fontSize: 12, color: "#A1A1AA" },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  gridCard: {
    width: "48%",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  gridLabel: { fontSize: 12, color: "#71717A", marginBottom: 8 },
  gridValueRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  gridNumber: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
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
  tabItem: { alignItems: "center", justifyContent: "center" },
  tabLabelActive: {
    fontSize: 11,
    color: "#FF5500",
    fontWeight: "600",
    marginTop: 3,
  },
  tabLabelInactive: { fontSize: 11, color: "#71717A", marginTop: 3 },
});
