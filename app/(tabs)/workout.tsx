import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const initialWorkout = [
  {
    id: "1",
    title: "Supino reto com barra",
    sets: "4x 8-12",
    rest: "90s",
    completed: true,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Supino inclinado halteres",
    sets: "3x 8-12",
    rest: "90s",
    completed: true,
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Desenvolvimento militar",
    sets: "3x 8-12",
    rest: "90s",
    completed: true,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Elevação lateral",
    sets: "3x 12-15",
    rest: "60s",
    completed: false,
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Tríceps pulley",
    sets: "3x 12-15",
    rest: "60s",
    completed: false,
    image:
      "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=300&auto=format&fit=crop",
  },
];

export default function WorkoutScreen() {
  const router = useRouter();
  const [workout, setWorkout] = useState(initialWorkout);

  const completedCount = workout.filter((item) => item.completed).length;
  const progressPercentage = Math.round(
    (completedCount / workout.length) * 100,
  );

  const toggleExercise = (id: string) => {
    setWorkout((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 100,
        }}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.headerTitle}>Meu treino</Text>
            <Text style={styles.headerSubtitle}>Segunda-feira • Push</Text>
          </View>

          {/* Porcentagem Circular */}
          <View style={styles.circularProgressContainer}>
            <View style={styles.circularProgressBorder}>
              <Text style={styles.circularProgressText}>
                {progressPercentage}%
              </Text>
            </View>
          </View>
        </View>

        {/* Lista de Exercícios */}
        <View style={{ marginTop: 20 }}>
          {workout.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.exerciseCard,
                item.completed && styles.exerciseCardCompleted,
              ]}
              onPress={() => toggleExercise(item.id)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.exerciseImage}
              />

              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{item.title}</Text>
                <View style={styles.exerciseMetaRow}>
                  <Text style={styles.exerciseMetaText}>{item.sets}</Text>
                  <View style={styles.metaDot} />
                  <Feather name="clock" size={12} color="#A1A1AA" />
                  <Text style={styles.exerciseMetaText}> {item.rest}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.checkCircle,
                  item.completed && styles.checkCircleChecked,
                ]}
              >
                {item.completed && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 24 }]}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.primaryButtonText}>Finalizar treino</Text>
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#71717A",
    marginTop: 4,
  },
  circularProgressContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 3,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgressBorder: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: "#FF5500",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09090A",
  },
  circularProgressText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  exerciseCard: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  exerciseCardCompleted: {
    borderColor: "#3F3F46",
    opacity: 0.85,
  },
  exerciseImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#27272A",
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  exerciseTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  exerciseMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseMetaText: {
    color: "#A1A1AA",
    fontSize: 13,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#71717A",
    marginHorizontal: 8,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#52525B",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  checkCircleChecked: {
    backgroundColor: "#FF5500",
    borderColor: "#FF5500",
  },
  primaryButton: {
    backgroundColor: "#FF5500",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
