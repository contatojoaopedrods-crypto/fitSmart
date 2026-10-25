import { Feather, Ionicons } from "@expo/vector-icons";
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

const meals = [
  {
    id: "1",
    title: "Café da Manhã",
    time: "07:30",
    calories: 420,
    completed: true,
    items: [
      "3 Ovos mexidos",
      "2 Fatias de pão integral",
      "100g de Mamão Papaia",
      "Café preto sem açúcar",
    ],
  },
  {
    id: "2",
    title: "Almoço",
    time: "12:30",
    calories: 650,
    completed: true,
    items: [
      "150g Peito de frango grelhado",
      "150g Arroz integral",
      "80g Feijão preto",
      "Salada verde à vontade",
    ],
  },
  {
    id: "3",
    title: "Lanche da Tarde (Pré-Treino)",
    time: "16:00",
    calories: 320,
    completed: false,
    items: ["1 Banana prata", "30g Whey Protein", "15g Pasta de amendoim"],
  },
  {
    id: "4",
    title: "Jantar",
    time: "20:00",
    calories: 510,
    completed: false,
    items: [
      "160g Patinho moído",
      "180g Batata doce assada",
      "Legumes no vapor",
    ],
  },
];

export default function NutritionPlanScreen() {
  const router = useRouter();
  const [mealList, setMealList] = useState(meals);

  const toggleMeal = (id: string) => {
    setMealList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
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

        <Text style={styles.headerTitle}>Plano Alimentar</Text>
        <Text style={styles.headerSubtitle}>
          Prescrição nutricional por Nutri. Camila Rocha
        </Text>

        {/* Resumo de Macronutrientes */}
        <View style={styles.macrosCard}>
          <View style={styles.macrosHeader}>
            <Text style={styles.macrosTitle}>Metas Diárias</Text>
            <Text style={styles.macrosKcal}>1.900 kcal</Text>
          </View>

          <View style={styles.macroRow}>
            <View style={styles.macroCol}>
              <Text style={styles.macroVal}>140g</Text>
              <Text style={styles.macroLabel}>Proteínas</Text>
              <View style={[styles.macroBar, { backgroundColor: "#FF5500" }]} />
            </View>

            <View style={styles.macroCol}>
              <Text style={styles.macroVal}>210g</Text>
              <Text style={styles.macroLabel}>Carbos</Text>
              <View style={[styles.macroBar, { backgroundColor: "#3B82F6" }]} />
            </View>

            <View style={styles.macroCol}>
              <Text style={styles.macroVal}>55g</Text>
              <Text style={styles.macroLabel}>Gorduras</Text>
              <View style={[styles.macroBar, { backgroundColor: "#EAB308" }]} />
            </View>
          </View>
        </View>

        {/* Lista de Refeições */}
        <Text style={styles.sectionTitle}>Refeições de Hoje</Text>

        {mealList.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <TouchableOpacity
              style={styles.mealHeader}
              activeOpacity={0.7}
              onPress={() => toggleMeal(meal.id)}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.mealTitleRow}>
                  <Text style={styles.mealTitle}>{meal.title}</Text>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </View>
                <Text style={styles.mealKcal}>{meal.calories} kcal</Text>
              </View>

              <View
                style={[
                  styles.checkCircle,
                  meal.completed && styles.checkCircleDone,
                ]}
              >
                {meal.completed && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.itemsList}>
              {meal.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
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
  macrosCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  macrosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  macrosTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  macrosKcal: {
    color: "#FF5500",
    fontSize: 16,
    fontWeight: "bold",
  },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  macroCol: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#09090A",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  macroVal: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  macroLabel: {
    color: "#71717A",
    fontSize: 10,
    marginTop: 2,
    marginBottom: 8,
  },
  macroBar: {
    height: 3,
    width: 24,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  mealCard: {
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 14,
  },
  mealHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mealTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mealTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  mealTime: {
    color: "#71717A",
    fontSize: 11,
  },
  mealKcal: {
    color: "#FF5500",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#52525B",
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleDone: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
    marginVertical: 12,
  },
  itemsList: {
    gap: 6,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FF5500",
  },
  itemText: {
    color: "#D4D4D8",
    fontSize: 13,
  },
});
