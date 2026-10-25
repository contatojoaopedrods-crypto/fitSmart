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

export default function TeacherMoreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* Título da Tela */}
        <Text style={styles.screenTitle}>Mais Opções</Text>

        {/* Card de Perfil do Professor */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Prof. Lucas Andrade</Text>
            <Text style={styles.profileRole}>
              Personal Trainer • CREF 012345-G/RJ
            </Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção 1: Gestão & Biblioteca */}
        <Text style={styles.sectionHeader}>Gestão & Biblioteca</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <MaterialCommunityIcons
                name="dumbbell"
                size={20}
                color="#FF5500"
              />
            </View>
            <Text style={styles.menuItemText}>Biblioteca de Exercícios</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Feather name="file-text" size={20} color="#FF5500" />
            </View>
            <Text style={styles.menuItemText}>Modelos de Treino</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Feather name="clipboard" size={20} color="#FF5500" />
            </View>
            <Text style={styles.menuItemText}>Formulários de Anamnese</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>
        </View>

        {/* Seção 2: Conta & Configurações */}
        <Text style={styles.sectionHeader}>Conta & Configurações</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Feather name="award" size={20} color="#FF5500" />
            </View>
            <Text style={styles.menuItemText}>Meu Plano / Assinatura</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Feather name="bell" size={20} color="#FF5500" />
            </View>
            <Text style={styles.menuItemText}>Notificações</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Feather name="lock" size={20} color="#FF5500" />
            </View>
            <Text style={styles.menuItemText}>Segurança e Senha</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>
        </View>

        {/* Seção 3: Suporte */}
        <Text style={styles.sectionHeader}>Suporte & Informações</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Feather name="help-circle" size={20} color="#FF5500" />
            </View>
            <Text style={styles.menuItemText}>Central de Ajuda</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Feather name="info" size={20} color="#FF5500" />
            </View>
            <Text style={styles.menuItemText}>Sobre o Aplicativo</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/")}
        >
          <Feather name="log-out" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versão 1.0.0</Text>
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

        <TouchableOpacity style={styles.tabItem}>
          <Feather name="menu" size={20} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Mais</Text>
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
    paddingBottom: 110,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
    gap: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileRole: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
    marginBottom: 8,
  },
  editProfileButton: {
    alignSelf: "flex-start",
    backgroundColor: "#27272A",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  editProfileText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#71717A",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  menuGroup: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#261710",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    flex: 1,
    fontSize: 14,
    color: "#FFFFFF",
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
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#52525B",
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
