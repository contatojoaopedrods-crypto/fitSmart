import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function TeacherStudentProfileScreen() {
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

        {/* Card do Perfil do Aluno */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
            }}
            style={styles.avatar}
          />
          <Text style={styles.studentName}>Ana Carolina Silva</Text>
          <Text style={styles.planBadge}>Plano Personal VIP</Text>

          {/* Ações Rápidas */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push("/teacher/chat")}
            >
              <Ionicons name="chatbubble-ellipses" size={16} color="#FFFFFF" />
              <Text style={styles.actionBtnText}>Chat Direct</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.secondaryActionBtn]}
              onPress={() => router.push("/evaluation")}
            >
              <Feather name="activity" size={16} color="#FFFFFF" />
              <Text style={styles.actionBtnText}>Avaliação</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fichas Ativas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fichas de Treino Ativas</Text>
          <TouchableOpacity
            onPress={() => router.push("/teacher/create-workout")}
          >
            <Text style={styles.addText}>+ Nova Ficha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.workoutCard}
          onPress={() => router.push("/teacher/create-workout")}
        >
          <View style={styles.workoutIconBox}>
            <MaterialCommunityIcons name="dumbbell" size={20} color="#FF5500" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.workoutTitle}>Treino A - Peito & Tríceps</Text>
            <Text style={styles.workoutMeta}>
              4 Exercícios • Atualizado em 10/08
            </Text>
          </View>
          <Feather name="edit-3" size={16} color="#71717A" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.workoutCard}
          onPress={() => router.push("/teacher/create-workout")}
        >
          <View style={styles.workoutIconBox}>
            <MaterialCommunityIcons name="dumbbell" size={20} color="#FF5500" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.workoutTitle}>Treino B - Costas & Bíceps</Text>
            <Text style={styles.workoutMeta}>
              5 Exercícios • Atualizado em 10/08
            </Text>
          </View>
          <Feather name="edit-3" size={16} color="#71717A" />
        </TouchableOpacity>

        {/* Histórico Recente */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
          Atividade Recente
        </Text>
        <View style={styles.activityBox}>
          <View style={styles.activityRow}>
            <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
            <Text style={styles.activityText}>
              Concluiu Treino A hoje às 08:30
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.activityRow}>
            <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
            <Text style={styles.activityText}>
              Concluiu Treino B em 26/08 às 09:15
            </Text>
          </View>
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
  profileHeader: {
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  planBadge: {
    fontSize: 12,
    color: "#FF5500",
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    width: "100%",
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5500",
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  secondaryActionBtn: {
    backgroundColor: "#27272A",
  },
  actionBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  addText: {
    color: "#FF5500",
    fontSize: 13,
    fontWeight: "600",
  },
  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 10,
    gap: 12,
  },
  workoutIconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
  },
  workoutTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  workoutMeta: {
    color: "#71717A",
    fontSize: 11,
    marginTop: 2,
  },
  activityBox: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    marginTop: 8,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },
  activityText: {
    color: "#D4D4D8",
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
  },
});
