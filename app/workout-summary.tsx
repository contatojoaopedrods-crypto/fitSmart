import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

export default function WorkoutSummaryScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);

  const handleShare = () => {
    Alert.alert(
      "Compartilhar",
      "Resumo do treino copiado para a área de transferência!",
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* Banner de Celebração */}
        <View style={styles.headerBox}>
          <View style={styles.trophyIconBox}>
            <MaterialCommunityIcons
              name="trophy-award"
              size={42}
              color="#FF5500"
            />
          </View>
          <Text style={styles.congratsTitle}>Treino Finalizado!</Text>
          <Text style={styles.congratsSubtitle}>
            Excelente trabalho! Você concluiu o{" "}
            <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
              Treino A — Peito e Tríceps
            </Text>
            .
          </Text>
        </View>

        {/* Métricas do Treino */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Feather name="clock" size={20} color="#FF5500" />
            <Text style={styles.statVal}>48 min</Text>
            <Text style={styles.statLabel}>Duração</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={20}
              color="#EAB308"
            />
            <Text style={styles.statVal}>410 kcal</Text>
            <Text style={styles.statLabel}>Calorias</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="weight-kilogram"
              size={20}
              color="#3B82F6"
            />
            <Text style={styles.statVal}>4.850 kg</Text>
            <Text style={styles.statLabel}>Volume Total</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="checkmark-done-circle" size={20} color="#22C55E" />
            <Text style={styles.statVal}>6 / 6</Text>
            <Text style={styles.statLabel}>Exercícios</Text>
          </View>
        </View>

        {/* Avaliação da Intensidade */}
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>Como foi o nível de esforço?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={28}
                  color={star <= rating ? "#FF5500" : "#52525B"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ações */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Feather name="share-2" size={18} color="#FFFFFF" />
            <Text style={styles.shareBtnText}>Compartilhar Conquista</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.push("/")}
          >
            <Text style={styles.homeBtnText}>Voltar ao Início</Text>
          </TouchableOpacity>
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
    paddingTop: 30,
    paddingBottom: 40,
  },
  headerBox: {
    alignItems: "center",
    marginBottom: 28,
  },
  trophyIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 85, 0, 0.3)",
  },
  congratsTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  congratsSubtitle: {
    fontSize: 13,
    color: "#A1A1AA",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    alignItems: "flex-start",
  },
  statVal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  statLabel: {
    fontSize: 11,
    color: "#71717A",
    marginTop: 2,
  },
  feedbackCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#27272A",
    alignItems: "center",
    marginBottom: 28,
  },
  feedbackTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionsContainer: {
    gap: 12,
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5500",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  shareBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  homeBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18181B",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  homeBtnText: {
    color: "#D4D4D8",
    fontSize: 14,
    fontWeight: "600",
  },
});
