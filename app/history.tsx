import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

const historyData = [
  {
    id: "1",
    title: "Treino A - Peito & Tríceps",
    date: "Hoje, 28 de Ago",
    duration: "48 min",
    exercisesCount: "5 exercícios",
    volume: "4.250 kg",
  },
  {
    id: "2",
    title: "Treino B - Costas & Bíceps",
    date: "Ontem, 27 de Ago",
    duration: "52 min",
    exercisesCount: "6 exercícios",
    volume: "5.100 kg",
  },
  {
    id: "3",
    title: "Treino C - Pernas & Ombros",
    date: "25 de Ago",
    duration: "60 min",
    exercisesCount: "6 exercícios",
    volume: "7.800 kg",
  },
];

export default function HistoryScreen() {
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

        <Text style={styles.headerTitle}>Histórico de Treinos</Text>
        <Text style={styles.headerSubtitle}>Resumo das sessões concluídas</Text>

        {/* Card de Resumo do Mês */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>18</Text>
            <Text style={styles.summaryLabel}>Concluídos em Ago</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>15h 20m</Text>
            <Text style={styles.summaryLabel}>Tempo Total</Text>
          </View>
        </View>

        {/* Lista de Treinos Passados */}
        {historyData.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={18}
                  color="#22C55E"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <Ionicons
                name="checkmark-done-circle"
                size={22}
                color="#22C55E"
              />
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.badge}>
                <Feather name="clock" size={12} color="#A1A1AA" />
                <Text style={styles.badgeText}>{item.duration}</Text>
              </View>

              <View style={styles.badge}>
                <Feather name="list" size={12} color="#A1A1AA" />
                <Text style={styles.badgeText}>{item.exercisesCount}</Text>
              </View>

              <View style={styles.badge}>
                <MaterialCommunityIcons
                  name="weight-kilogram"
                  size={12}
                  color="#A1A1AA"
                />
                <Text style={styles.badgeText}>{item.volume}</Text>
              </View>
            </View>
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
  summaryCard: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 20,
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5500",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#71717A",
    marginTop: 2,
  },
  verticalLine: {
    width: 1,
    height: 30,
    backgroundColor: "#27272A",
  },
  historyCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardDate: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: "row",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#27272A",
    paddingTop: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#09090A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#A1A1AA",
    fontSize: 11,
  },
});
