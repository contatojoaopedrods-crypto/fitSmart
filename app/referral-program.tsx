import { Feather } from "@expo/vector-icons";
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

export default function ReferralProgramScreen() {
  const router = useRouter();
  const referralCode = "LUCASFIT2026";

  const copyCode = () => {
    Alert.alert("Copiado!", `O código ${referralCode} foi copiado.`);
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

        <Text style={styles.headerTitle}>Indique & Ganhe</Text>
        <Text style={styles.headerSubtitle}>
          Ganhe R$ 30,00 de desconto na sua mensalidade
        </Text>

        {/* Card do Código */}
        <View style={styles.codeCard}>
          <Text style={styles.codeTitle}>Seu Código Exclusivo</Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyBtn} onPress={copyCode}>
              <Feather name="copy" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.codeSub}>
            Compartilhe seu código com amigos. A cada amigo que se matricular,
            ambos ganham benefício na mensalidade.
          </Text>
        </View>

        {/* Estatísticas de Indicações */}
        <Text style={styles.sectionTitle}>Suas Indicações</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>3</Text>
            <Text style={styles.statLabel}>Amigos Indicados</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: "#22C55E" }]}>R$ 90,00</Text>
            <Text style={styles.statLabel}>Economizados</Text>
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
  codeCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FF5500",
    alignItems: "center",
    marginBottom: 24,
  },
  codeTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#09090A",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#27272A",
    gap: 12,
    marginBottom: 12,
  },
  codeText: {
    color: "#FF5500",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  copyBtn: {
    backgroundColor: "#27272A",
    padding: 6,
    borderRadius: 6,
  },
  codeSub: {
    color: "#A1A1AA",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    alignItems: "center",
  },
  statVal: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#71717A",
    fontSize: 11,
    marginTop: 4,
  },
});
