import {
  Feather,
  FontAwesome5,
  Ionicons,
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

export default function TeacherMetricsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.headerTitle}>Métricas & Analytics</Text>
        <Text style={styles.headerSubtitle}>Visão geral do mês de Agosto</Text>

        {/* Mosaico de Indicadores */}
        <View style={styles.grid2x2}>
          <View style={styles.metricCard}>
            <View style={styles.iconBox}>
              <FontAwesome5 name="users" size={16} color="#FF5500" />
            </View>
            <Text style={styles.metricValue}>32</Text>
            <Text style={styles.metricLabel}>Alunos Ativos</Text>
            <Text style={styles.metricTrend}>+4 este mês</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.iconBox}>
              <Ionicons
                name="checkmark-done-circle"
                size={18}
                color="#22C55E"
              />
            </View>
            <Text style={styles.metricValue}>88%</Text>
            <Text style={styles.metricLabel}>Frequência Média</Text>
            <Text style={styles.metricTrend}>+2% vs julho</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="dumbbell"
                size={18}
                color="#3B82F6"
              />
            </View>
            <Text style={styles.metricValue}>142</Text>
            <Text style={styles.metricLabel}>Treinos Feitos</Text>
            <Text style={styles.metricTrend}>Últimos 30 dias</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.iconBox}>
              <Feather name="star" size={18} color="#EAB308" />
            </View>
            <Text style={styles.metricValue}>18</Text>
            <Text style={styles.metricLabel}>Avaliações</Text>
            <Text style={styles.metricTrend}>Concluídas</Text>
          </View>
        </View>

        {/* Alerta de Retenção */}
        <Text style={styles.sectionTitle}>Atenção requerida</Text>
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Ionicons name="warning-outline" size={20} color="#EF4444" />
            <Text style={styles.alertTitle}>Alunos inativos (+5 dias)</Text>
          </View>
          <Text style={styles.alertDescription}>
            3 alunos não registraram treinos esta semana. Envie um lembrete para
            manter o engajamento.
          </Text>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Notificar alunos</Text>
          </TouchableOpacity>
        </View>

        {/* Distribuição por Objetivo */}
        <Text style={styles.sectionTitle}>Distribuição dos Alunos</Text>
        <View style={styles.cardBox}>
          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Hipertrofia</Text>
              <Text style={styles.progressValue}>60% (19 alunos)</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: "60%", backgroundColor: "#FF5500" },
                ]}
              />
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Emagrecimento</Text>
              <Text style={styles.progressValue}>25% (8 alunos)</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: "25%", backgroundColor: "#3B82F6" },
                ]}
              />
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Reabilitação / Saúde</Text>
              <Text style={styles.progressValue}>15% (5 alunos)</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: "15%", backgroundColor: "#22C55E" },
                ]}
              />
            </View>
          </View>
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
          <Feather name="bar-chart-2" size={20} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Métricas</Text>
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
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
    marginBottom: 20,
  },
  grid2x2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  metricLabel: {
    fontSize: 12,
    color: "#A1A1AA",
    marginTop: 2,
  },
  metricTrend: {
    fontSize: 10,
    color: "#22C55E",
    marginTop: 6,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: "#1F1315",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#451A1D",
    marginBottom: 20,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  alertTitle: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 14,
  },
  alertDescription: {
    color: "#D4D4D8",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  alertButton: {
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  alertButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardBox: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    gap: 16,
  },
  progressRow: {},
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  progressValue: {
    color: "#71717A",
    fontSize: 12,
  },
  track: {
    height: 8,
    backgroundColor: "#27272A",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 4,
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
