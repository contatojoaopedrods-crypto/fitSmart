import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const availableTimes = ["08:00", "10:00", "14:30", "17:00", "19:00"];
const days = [
  { day: "Seg", date: "12" },
  { day: "Ter", date: "13" },
  { day: "Qua", date: "14" },
  { day: "Qui", date: "15" },
  { day: "Sex", date: "16" },
];

export default function PersonalBookingScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("14");
  const [selectedTime, setSelectedTime] = useState("17:00");

  const handleBooking = () => {
    Alert.alert(
      "Sessão Confirmada!",
      `Sua sessão com o Prof. Lucas Andrade foi agendada para o dia ${selectedDay} às ${selectedTime}.`,
    );
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

        <Text style={styles.headerTitle}>Agendar Personal</Text>
        <Text style={styles.headerSubtitle}>
          Sessão de acompanhamento presencial individual
        </Text>

        {/* Card do Personal Trainer */}
        <View style={styles.trainerCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300",
            }}
            style={styles.trainerAvatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.trainerName}>Prof. Lucas Andrade</Text>
            <Text style={styles.trainerSpec}>
              Especialista em Hipertrofia & Biomecânica
            </Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#EAB308" />
              <Text style={styles.ratingText}>4.9 (48 avaliações)</Text>
            </View>
          </View>
        </View>

        {/* Seleção de Dia */}
        <Text style={styles.sectionTitle}>Escolha a Data</Text>
        <View style={styles.daysRow}>
          {days.map((item) => {
            const active = selectedDay === item.date;
            return (
              <TouchableOpacity
                key={item.date}
                style={[styles.dayCard, active && styles.dayCardActive]}
                onPress={() => setSelectedDay(item.date)}
              >
                <Text style={[styles.dayName, active && styles.dayTextActive]}>
                  {item.day}
                </Text>
                <Text style={[styles.dayNum, active && styles.dayTextActive]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Seleção de Horário */}
        <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
        <View style={styles.timesGrid}>
          {availableTimes.map((time) => {
            const active = selectedTime === time;
            return (
              <TouchableOpacity
                key={time}
                style={[styles.timeChip, active && styles.timeChipActive]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[styles.timeText, active && styles.timeTextActive]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botão de Agendar */}
        <TouchableOpacity style={styles.confirmBtn} onPress={handleBooking}>
          <Text style={styles.confirmBtnText}>Confirmar Agendamento</Text>
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
  trainerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    gap: 14,
    marginBottom: 24,
  },
  trainerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  trainerName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  trainerSpec: {
    color: "#FF5500",
    fontSize: 11,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  ratingText: {
    color: "#A1A1AA",
    fontSize: 11,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dayCard: {
    width: 58,
    paddingVertical: 12,
    backgroundColor: "#18181B",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  dayCardActive: {
    backgroundColor: "#FF5500",
    borderColor: "#FF5500",
  },
  dayName: {
    color: "#71717A",
    fontSize: 11,
  },
  dayNum: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  dayTextActive: {
    color: "#FFFFFF",
  },
  timesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 32,
  },
  timeChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#18181B",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  timeChipActive: {
    backgroundColor: "#FF5500",
    borderColor: "#FF5500",
  },
  timeText: {
    color: "#D4D4D8",
    fontSize: 13,
    fontWeight: "600",
  },
  timeTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  confirmBtn: {
    backgroundColor: "#FF5500",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
