import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

export default function TermsAboutScreen() {
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

        {/* Branding do App */}
        <View style={styles.appBrandContainer}>
          <View style={styles.logoBox}>
            <MaterialCommunityIcons name="dumbbell" size={32} color="#FF5500" />
          </View>
          <Text style={styles.appName}>GYM APEX</Text>
          <Text style={styles.appVersion}>Versão 2.4.0 (Build 2026)</Text>
        </View>

        {/* Links de Documentos */}
        <View style={styles.linksCard}>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() =>
              Alert.alert(
                "Termos de Uso",
                "Exibindo Termos de Uso completos...",
              )
            }
          >
            <Text style={styles.linkText}>Termos de Uso</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() =>
              Alert.alert(
                "Política de Privacidade",
                "Exibindo Política de Privacidade...",
              )
            }
          >
            <Text style={styles.linkText}>Política de Privacidade</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() =>
              Alert.alert("Licenças", "Softwares de código aberto utilizados.")
            }
          >
            <Text style={styles.linkText}>Licenças de Código Aberto</Text>
            <Feather name="chevron-right" size={18} color="#71717A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.copyrightText}>
          © 2026 Gym Apex Inc. Todos os direitos reservados.
        </Text>
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
  appBrandContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#FF5500",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  appVersion: {
    color: "#71717A",
    fontSize: 12,
    marginTop: 4,
  },
  linksCard: {
    backgroundColor: "#18181B",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
  },
  copyrightText: {
    color: "#52525B",
    fontSize: 11,
    textAlign: "center",
  },
});
