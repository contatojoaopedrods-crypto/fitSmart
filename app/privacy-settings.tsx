import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PrivacySettingsScreen() {
  const router = useRouter();

  const [pushNotifs, setPushNotifs] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [rankingVisible, setRankingVisible] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

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

        <Text style={styles.headerTitle}>Privacidade & Ajustes</Text>
        <Text style={styles.headerSubtitle}>
          Controle suas preferências e acesso
        </Text>

        {/* Notificações */}
        <Text style={styles.sectionHeader}>NOTIFICAÇÕES</Text>

        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Notificações Push</Text>

              <Text style={styles.settingSub}>
                Avisos sobre novidades e comunicados
              </Text>
            </View>
            <Switch
              value={pushNotifs}
              onValueChange={setPushNotifs}
              trackColor={{ false: "#27272A", true: "#FF5500" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Lembretes de Treino</Text>

              <Text style={styles.settingSub}>
                Notificar no horário agendado do treino
              </Text>
            </View>
            <Switch
              value={workoutReminders}
              onValueChange={setWorkoutReminders}
              trackColor={{ false: "#27272A", true: "#FF5500" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Privacidade */}
        <Text style={styles.sectionHeader}>PRIVACIDADE & SEGURANÇA</Text>

        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Exibir no Ranking Geral</Text>

              <Text style={styles.settingSub}>
                Permitir que outros alunos vejam sua pontuação
              </Text>
            </View>
            <Switch
              value={rankingVisible}
              onValueChange={setRankingVisible}
              trackColor={{ false: "#27272A", true: "#FF5500" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>
                Login por Biometria / Face ID
              </Text>

              <Text style={styles.settingSub}>
                Acessar o aplicativo sem digitar senha
              </Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: "#27272A", true: "#FF5500" }}
              thumbColor="#FFFFFF"
            />
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
    color: "#FF5500",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 8,
  },
  settingCard: {
    backgroundColor: "#18181B",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  settingTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  settingSub: {
    color: "#71717A",
    fontSize: 11,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
  },
});
