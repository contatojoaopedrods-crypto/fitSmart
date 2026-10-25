import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const topThree = [
  {
    rank: 2,
    name: "Carlos M.",
    checkins: "24 treinos",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    color: "#C0C0C0",
  },
  {
    rank: 1,
    name: "Beatriz L.",
    checkins: "28 treinos",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    color: "#EAB308",
  },
  {
    rank: 3,
    name: "Gabriel S.",
    checkins: "22 treinos",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
    color: "#CD7F32",
  },
];

const rankingsList = [
  {
    rank: 4,
    name: "Fernanda R.",
    checkins: "20 treinos",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  {
    rank: 5,
    name: "Lucas Silva (Você)",
    checkins: "18 treinos",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    isUser: true,
  },
  {
    rank: 6,
    name: "Rodrigo A.",
    checkins: "17 treinos",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
  },
  {
    rank: 7,
    name: "Juliana P.",
    checkins: "15 treinos",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
  },
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<"month" | "all">("month");

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

        <Text style={styles.headerTitle}>Ranking da Academia</Text>
        <Text style={styles.headerSubtitle}>
          Frequência de treinos neste mês
        </Text>

        {/* Filtros */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              filter === "month" && styles.filterBtnActive,
            ]}
            onPress={() => setFilter("month")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "month" && styles.filterTextActive,
              ]}
            >
              Agosto 2026
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              filter === "all" && styles.filterBtnActive,
            ]}
            onPress={() => setFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "all" && styles.filterTextActive,
              ]}
            >
              Geral Geral
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pódio (Top 3) */}
        <View style={styles.podiumContainer}>
          {/* 2º Lugar */}
          <View style={[styles.podiumItem, { marginTop: 24 }]}>
            <View
              style={[styles.avatarBorder, { borderColor: topThree[0].color }]}
            >
              <Image
                source={{ uri: topThree[0].avatar }}
                style={styles.podiumAvatar}
              />
              <View
                style={[
                  styles.rankBadge,
                  { backgroundColor: topThree[0].color },
                ]}
              >
                <Text style={styles.rankBadgeText}>2</Text>
              </View>
            </View>
            <Text style={styles.podiumName}>{topThree[0].name}</Text>
            <Text style={styles.podiumScore}>{topThree[0].checkins}</Text>
          </View>

          {/* 1º Lugar */}
          <View style={styles.podiumItem}>
            <FontAwesome5
              name="crown"
              size={18}
              color="#EAB308"
              style={{ marginBottom: 4 }}
            />
            <View
              style={[
                styles.avatarBorder,
                {
                  borderColor: topThree[1].color,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                },
              ]}
            >
              <Image
                source={{ uri: topThree[1].avatar }}
                style={[
                  styles.podiumAvatar,
                  { width: 64, height: 64, borderRadius: 32 },
                ]}
              />
              <View
                style={[
                  styles.rankBadge,
                  { backgroundColor: topThree[1].color },
                ]}
              >
                <Text style={styles.rankBadgeText}>1</Text>
              </View>
            </View>
            <Text style={[styles.podiumName, { fontWeight: "bold" }]}>
              {topThree[1].name}
            </Text>
            <Text style={[styles.podiumScore, { color: "#FF5500" }]}>
              {topThree[1].checkins}
            </Text>
          </View>

          {/* 3º Lugar */}
          <View style={[styles.podiumItem, { marginTop: 32 }]}>
            <View
              style={[styles.avatarBorder, { borderColor: topThree[2].color }]}
            >
              <Image
                source={{ uri: topThree[2].avatar }}
                style={styles.podiumAvatar}
              />
              <View
                style={[
                  styles.rankBadge,
                  { backgroundColor: topThree[2].color },
                ]}
              >
                <Text style={styles.rankBadgeText}>3</Text>
              </View>
            </View>
            <Text style={styles.podiumName}>{topThree[2].name}</Text>
            <Text style={styles.podiumScore}>{topThree[2].checkins}</Text>
          </View>
        </View>

        {/* Lista do Ranking */}
        <Text style={styles.sectionTitle}>Sua Posição & Outros Alunos</Text>

        {rankingsList.map((user) => (
          <View
            key={user.rank}
            style={[styles.rankRowCard, user.isUser && styles.userRowCard]}
          >
            <Text
              style={[styles.rankNumber, user.isUser && { color: "#FF5500" }]}
            >
              #{user.rank}
            </Text>

            <Image source={{ uri: user.avatar }} style={styles.rowAvatar} />

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.rowName,
                  user.isUser && { color: "#FF5500", fontWeight: "bold" },
                ]}
              >
                {user.name}
              </Text>
              <Text style={styles.rowSub}>{user.checkins}</Text>
            </View>

            {user.isUser && (
              <View style={styles.youBadge}>
                <Text style={styles.youBadgeText}>VOCÊ</Text>
              </View>
            )}
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
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  filterBtnActive: {
    backgroundColor: "#27272A",
  },
  filterText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 32,
  },
  podiumItem: {
    alignItems: "center",
    flex: 1,
  },
  avatarBorder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 8,
  },
  podiumAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rankBadge: {
    position: "absolute",
    bottom: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  rankBadgeText: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "bold",
  },
  podiumName: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
  },
  podiumScore: {
    color: "#71717A",
    fontSize: 10,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  rankRowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 10,
    gap: 12,
  },
  userRowCard: {
    borderColor: "#FF5500",
    backgroundColor: "#15110F",
  },
  rankNumber: {
    color: "#71717A",
    fontSize: 14,
    fontWeight: "bold",
    width: 28,
    textAlign: "center",
  },
  rowAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rowName: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  rowSub: {
    color: "#71717A",
    fontSize: 10,
    marginTop: 1,
  },
  youBadge: {
    backgroundColor: "#FF5500",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  youBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
});
