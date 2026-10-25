import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleLogout = () => {
    Alert.alert("Sair da Conta", "Tem certeza que deseja encerrar a sessão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => router.replace("/"),
      },
    ]);
  };

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

        <Text style={styles.headerTitle}>Configurações</Text>
        <Text style={styles.headerSubtitle}>
          Personalize suas notificações e preferências do app
        </Text>

        {/* Seção: Notificações */}
        <Text style={styles.sectionHeader}>NOTIFICAÇÕES & LEMBRETES</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#FF5500"
              />
              <View>
                <Text style={styles.settingTitle}>Notificações Push</Text>
                <Text style={styles.settingSub}>
                  Avisos sobre treinos, mensagens e planos
                </Text>
              </View>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: "#27272A", true: "#FF5500" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="#FF5500"
              />
              <View>
                <Text style={styles.settingTitle}>Lembretes de Treino</Text>
                <Text style={styles.settingSub}>
                  Alertas para não perder o horário agendado
                </Text>
              </View>
            </View>
            <Switch
              value={workoutReminders}
              onValueChange={setWorkoutReminders}
              trackColor={{ false: "#27272A", true: "#FF5500" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Seção: Segurança & Acesso */}
        <Text style={styles.sectionHeader}>SEGURANÇA & ACESSO</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="shield" size={20} color="#FF5500" />
              <View>
                <Text style={styles.settingTitle}>Biometria / Face ID</Text>
                <Text style={styles.settingSub}>
                  Entrar no aplicativo usando biometria
                </Text>
              </View>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: "#27272A", true: "#FF5500" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => Alert.alert("Alterar Senha")}
          >
            <View style={styles.settingInfo}>
              <Feather name="lock" size={20} color="#FF5500" />
              <View>
                <Text style={styles.settingTitle}>Alterar Senha</Text>
                <Text style={styles.settingSub}>
                  Atualize sua senha de acesso
                </Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>
        </View>

        {/* Seção: App & Outros */}
        <Text style={styles.sectionHeader}>PREFERÊNCIAS DO APP</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="volume-2" size={20} color="#FF5500" />
              <View>
                <Text style={styles.settingTitle}>Efeitos Sonoros</Text>
                <Text style={styles.settingSub}>
                  Sons de cronômetro e finalização de séries
                </Text>
              </View>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: "#27272A", true: "#FF5500" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
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
  sectionHeader: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#71717A",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 8,
  },
  settingsGroup: {
    backgroundColor: "#18181B",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 16,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  settingSub: {
    fontSize: 11,
    color: "#71717A",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
    marginLeft: 46,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "bold",
  },
});
