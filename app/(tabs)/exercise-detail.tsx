import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

export default function ExerciseDetailScreen() {
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

        {/* Thumbnail / Demonstrativo em Vídeo */}
        <View style={styles.videoContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
            }}
            style={styles.videoCover}
          />
          <TouchableOpacity style={styles.playOverlay}>
            <Ionicons name="play-circle" size={54} color="#FF5500" />
          </TouchableOpacity>
        </View>

        {/* Título e Músculo Alvo */}
        <Text style={styles.exerciseTitle}>Supino Reto com Barra</Text>
        <View style={styles.tagRow}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>Peitoral Maior</Text>
          </View>
          <View style={[styles.tagBadge, styles.secondaryBadge]}>
            <Text style={styles.secondaryTagText}>Tríceps e Deltóide</Text>
          </View>
        </View>

        {/* Execução Passo a Passo */}
        <Text style={styles.sectionTitle}>Como executar</Text>

        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>
            Deite-se no banco com os pés bem firmes no chão e mantenha a
            curvatura natural da coluna.
          </Text>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>
            Segure a barra com uma pegada um pouco mais larga que a largura dos
            ombros e aduza as escápulas.
          </Text>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>
            Desça a barra de forma controlada até a linha média do peitoral e
            empurre até a extensão quase completa dos braços.
          </Text>
        </View>

        {/* Dicas de Segurança */}
        <Text style={styles.sectionTitle}>Erros comuns a evitar</Text>
        <View style={styles.warningBox}>
          <Feather
            name="alert-circle"
            size={18}
            color="#EF4444"
            style={{ marginTop: 2 }}
          />
          <Text style={styles.warningText}>
            Não afaste cotovelos em um ângulo de 90° em relação ao tronco.
            Mantenha-os em aproximadamente 45° para proteger a articulação do
            ombro.
          </Text>
        </View>
      </ScrollView>

      {/* Tab Bar Inferior Aluno */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(tabs)/workout")}
        >
          <MaterialCommunityIcons name="dumbbell" size={20} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Treino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <Feather name="message-square" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <FontAwesome5 name="user-alt" size={18} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Perfil</Text>
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
  videoContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    marginBottom: 20,
  },
  videoCover: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  tagBadge: {
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    color: "#FF5500",
    fontSize: 12,
    fontWeight: "bold",
  },
  secondaryBadge: {
    backgroundColor: "#27272A",
  },
  secondaryTagText: {
    color: "#A1A1AA",
    fontSize: 12,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    marginTop: 8,
  },
  stepCard: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 10,
    alignItems: "center",
    gap: 12,
  },
  stepNumber: {
    color: "#FF5500",
    fontSize: 16,
    fontWeight: "bold",
    width: 20,
    textAlign: "center",
  },
  stepText: {
    flex: 1,
    color: "#D4D4D8",
    fontSize: 13,
    lineHeight: 18,
  },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#1F1315",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#451A1D",
    gap: 10,
  },
  warningText: {
    flex: 1,
    color: "#FCA5A5",
    fontSize: 12,
    lineHeight: 18,
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
