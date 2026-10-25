import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function GymAccessQRScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acesso à Catraca</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        {/* Cartão de Acesso */}
        <View style={styles.accessCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.unitName}>Unidade Barra da Tijuca</Text>
              <Text style={styles.userName}>Lucas Silva</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>ATIVO</Text>
            </View>
          </View>

          {/* QR Code Container */}
          <View style={styles.qrContainer}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={180}
              color="#000000"
            />
          </View>

          {/* Contador de Validação Dinâmica */}
          <View style={styles.timerRow}>
            <Feather name="refresh-cw" size={14} color="#71717A" />
            <Text style={styles.timerText}>
              O código atualiza em{" "}
              <Text style={{ color: "#FF5500", fontWeight: "bold" }}>
                {seconds}s
              </Text>
            </Text>
          </View>

          <Text style={styles.instructions}>
            Aproxime este QR Code do leitor da catraca para liberar sua entrada.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  accessCard: {
    backgroundColor: "#18181B",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 24,
  },
  unitName: {
    color: "#71717A",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
  },
  statusText: {
    color: "#22C55E",
    fontSize: 10,
    fontWeight: "bold",
  },
  qrContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  timerText: {
    color: "#A1A1AA",
    fontSize: 12,
  },
  instructions: {
    color: "#71717A",
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 10,
    lineHeight: 16,
  },
});
