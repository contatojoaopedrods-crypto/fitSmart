import {
  Feather,
  FontAwesome5,
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

export default function StudentProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* Cabeçalho com Foto e Nome */}
        <View style={styles.headerBox}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Beatriz Lima</Text>
          <Text style={styles.userEmail}>beatriz.lima@email.com</Text>

          <View style={styles.goalBadge}>
            <Text style={styles.goalBadgeText}>Objetivo: Hipertrofia</Text>
          </View>
        </View>

        {/* Resumo de Conquistas do Mês */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Treinos no Mês</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Dias Seguidos</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statValue}>84,2 t</Text>
            <Text style={styles.statLabel}>Carga Total</Text>
          </View>
        </View>

        {/* Menu de Navegação do Usuário */}
        <Text style={styles.sectionTitle}>Minha Conta</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/evaluation")}
          >
            <View style={styles.menuIconBox}>
              <Feather name="activity" size={18} color="#FF5500" />
            </View>
            <Text style={styles.menuText}>Minhas Avaliações Físicas</Text>
            <Feather name="chevron-right" size={18} color="#52525B" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/history")}
          >
            <View style={styles.menuIconBox}>
              <Feather name="clock" size={18} color="#FF5500" />
            </View>
            <Text style={styles.menuText}>Histórico de Treinos</Text>
            <Feather name="chevron-right" size={18} color="#52525B" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/settings")}
          >
            <View style={styles.menuIconBox}>
              <Feather name="settings" size={18} color="#FF5500" />
            </View>
            <Text style={styles.menuText}>Configurações</Text>
            <Feather name="chevron-right" size={18} color="#52525B" />
          </TouchableOpacity>
        </View>

        {/* Botão Sair */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/login")}
        >
          <Feather name="log-out" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Tab Bar Inferior Aluno */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(tabs)/workout")}
        >
          <MaterialCommunityIcons name="dumbbell" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Treino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <Feather name="message-square" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome5 name="user-alt" size={18} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Perfil</Text>
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
    paddingTop: 20,
    paddingBottom: 100,
  },
  headerBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#FF5500",
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userEmail: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
  },
  goalBadge: {
    backgroundColor: "#18181B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginTop: 10,
  },
  goalBadgeText: {
    color: "#FF5500",
    fontSize: 12,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
    alignItems: "center",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 11,
    color: "#71717A",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#27272A",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#71717A",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  menuContainer: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#3F1D1D",
    gap: 8,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 14,
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
