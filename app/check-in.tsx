import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CheckinScreen() {
  const router = useRouter();
  const [checkedIn, setCheckedIn] = useState(false);

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

        <Text style={styles.headerTitle}>Access Check-in</Text>
        <Text style={styles.headerSubtitle}>
          Aproxime o QR Code do leitor na catraca
        </Text>

        {/* Card do QR Code */}
        <View style={styles.qrCard}>
          <View style={styles.gymHeader}>
            <View style={styles.gymLogoBox}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={20}
                color="#FF5500"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.gymName}>
                Pulse Fitness - Unidade Central
              </Text>
              <Text style={styles.gymAddress}>
                Av. Paulista, 1000 - São Paulo
              </Text>
            </View>
          </View>

          <View style={styles.qrContainer}>
            {/* Visual simulado de QR Code */}
            <View style={styles.qrCodeBox}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={180}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.qrTimerText}>
              Atualiza automaticamente em 45s
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.checkinBtn, checkedIn && styles.checkinBtnDone]}
            onPress={() => setCheckedIn(!checkedIn)}
          >
            <Ionicons
              name={checkedIn ? "checkmark-circle" : "location-outline"}
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.checkinBtnText}>
              {checkedIn ? "Check-in Confirmado!" : "Simular Check-in Manual"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Status de Frequência */}
        <Text style={styles.sectionTitle}>Frequência Semanal</Text>
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <MaterialCommunityIcons name="fire" size={22} color="#FF5500" />
            <Text style={styles.streakTitle}>4 Dias Seguidos</Text>
          </View>
          <Text style={styles.streakSub}>
            Sua meta é treinar 5 dias por semana.
          </Text>

          <View style={styles.daysRow}>
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(
              (day, idx) => {
                const isDone = idx < 4;
                return (
                  <View key={day} style={styles.dayCol}>
                    <View
                      style={[styles.dayCircle, isDone && styles.dayCircleDone]}
                    >
                      <Text
                        style={[
                          styles.dayCircleText,
                          isDone && styles.dayCircleTextDone,
                        ]}
                      >
                        {day[0]}
                      </Text>
                    </View>
                    <Text style={styles.dayLabel}>{day}</Text>
                  </View>
                );
              },
            )}
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
  qrCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
    alignItems: "center",
  },
  gymHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    marginBottom: 20,
  },
  gymLogoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  gymName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  gymAddress: {
    color: "#71717A",
    fontSize: 11,
    marginTop: 2,
  },
  qrContainer: {
    alignItems: "center",
    backgroundColor: "#09090A",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    width: "100%",
    marginBottom: 20,
  },
  qrCodeBox: {
    padding: 10,
    backgroundColor: "#18181B",
    borderRadius: 12,
  },
  qrTimerText: {
    color: "#71717A",
    fontSize: 11,
    marginTop: 12,
  },
  checkinBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5500",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  checkinBtnDone: {
    backgroundColor: "#22C55E",
  },
  checkinBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  streakCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  streakHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  streakTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  streakSub: {
    color: "#71717A",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 16,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCol: {
    alignItems: "center",
    gap: 6,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircleDone: {
    backgroundColor: "#FF5500",
  },
  dayCircleText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "bold",
  },
  dayCircleTextDone: {
    color: "#FFFFFF",
  },
  dayLabel: {
    color: "#71717A",
    fontSize: 10,
  },
});
