import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const classCategories = ["Hoje", "Amanhã", "Sexta", "Sábado"];

const classesList = [
  {
    id: "1",
    title: "Spinning Extreme",
    instructor: "Prof. Ricardo Santos",
    time: "18:30 - 19:15",
    room: "Sala de Ciclismo",
    availableSlots: 4,
    totalSlots: 20,
    reserved: false,
  },
  {
    id: "2",
    title: "Cross Training",
    instructor: "Profa. Mariana Costa",
    time: "19:30 - 20:30",
    room: "Box Arena",
    availableSlots: 2,
    totalSlots: 15,
    reserved: true,
  },
  {
    id: "3",
    title: "Yoga & Mindfulness",
    instructor: "Profa. Juliana Paes",
    time: "20:30 - 21:15",
    room: "Sala Zen",
    availableSlots: 8,
    totalSlots: 12,
    reserved: false,
  },
];

export default function GymClassesScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("Hoje");
  const [classes, setClasses] = useState(classesList);

  const toggleReservation = (id: string) => {
    setClasses((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newReserved = !item.reserved;
          Alert.alert(
            newReserved ? "Vaga Reservada!" : "Reserva Cancelada",
            newReserved
              ? `Sua vaga para ${item.title} foi confirmada.`
              : `Você cancelou sua reserva para ${item.title}.`,
          );
          return {
            ...item,
            reserved: newReserved,
            availableSlots: newReserved
              ? item.availableSlots - 1
              : item.availableSlots + 1,
          };
        }
        return item;
      }),
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

        <Text style={styles.headerTitle}>Aulas Coletivas</Text>
        <Text style={styles.headerSubtitle}>
          Garanta sua vaga nas modalidades em grupo
        </Text>

        {/* Seletor de Dias */}
        <View style={styles.daysRow}>
          {classCategories.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayChip, isSelected && styles.dayChipActive]}
                onPress={() => setSelectedDay(day)}
              >
                <Text
                  style={[
                    styles.dayChipText,
                    isSelected && styles.dayChipTextActive,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Lista de Aulas */}
        <Text style={styles.sectionTitle}>Programação ({selectedDay})</Text>

        {classes.map((item) => (
          <View key={item.id} style={styles.classCard}>
            <View style={styles.classHeader}>
              <View>
                <Text style={styles.classTitle}>{item.title}</Text>
                <Text style={styles.instructorText}>{item.instructor}</Text>
              </View>

              <View style={styles.slotsBadge}>
                <Text style={styles.slotsText}>
                  {item.availableSlots} vagas restantes
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Feather name="clock" size={14} color="#FF5500" />
                <Text style={styles.infoText}>{item.time}</Text>
              </View>

              <View style={styles.infoItem}>
                <Feather name="map-pin" size={14} color="#FF5500" />
                <Text style={styles.infoText}>{item.room}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.reserveBtn,
                item.reserved && styles.reserveBtnCancel,
              ]}
              onPress={() => toggleReservation(item.id)}
            >
              <Text style={styles.reserveBtnText}>
                {item.reserved ? "Cancelar Reserva" : "Reservar Vaga"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
  daysRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  dayChip: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#18181B",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  dayChipActive: {
    backgroundColor: "#FF5500",
    borderColor: "#FF5500",
  },
  dayChipText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "600",
  },
  dayChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  classCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 14,
  },
  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  classTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  instructorText: {
    color: "#71717A",
    fontSize: 12,
    marginTop: 2,
  },
  slotsBadge: {
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  slotsText: {
    color: "#FF5500",
    fontSize: 10,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    backgroundColor: "#09090A",
    padding: 10,
    borderRadius: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    color: "#D4D4D8",
    fontSize: 11,
  },
  reserveBtn: {
    backgroundColor: "#FF5500",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  reserveBtnCancel: {
    backgroundColor: "#27272A",
    borderWidth: 1,
    borderColor: "#3F3F46",
  },
  reserveBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
});
