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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const exercisesList = [
  {
    id: "1",
    name: "Supino Reto com Barra",
    category: "Peito",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Puxada Frontal Pulley",
    category: "Costas",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Agachamento Livre",
    category: "Pernas",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Desenvolvimento c/ Halteres",
    category: "Ombros",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=200&auto=format&fit=crop",
  },
];

const categories = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Braços"];

export default function ExerciseLibraryScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      {/* Header com Ação de Criar Novo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Biblioteca de Exercícios</Text>

        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-sharp" size={22} color="#FF5500" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* Barra de Busca */}
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#71717A" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar exercício..."
            placeholderTextColor="#52525B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categorias Horizontais */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesRow}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Lista de Exercícios */}
        {exercisesList.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.exerciseCard}
            onPress={() => router.push("/(tabs)/exercise-detail")}
          >
            <Image source={{ uri: item.image }} style={styles.thumbnail} />

            <View style={{ flex: 1 }}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.categoryBadge}>{item.category}</Text>
            </View>

            <Feather name="chevron-right" size={18} color="#52525B" />
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#18181B",
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  addBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#27272A",
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },
  categoriesRow: {
    marginBottom: 20,
    flexDirection: "row",
  },
  categoryChip: {
    backgroundColor: "#18181B",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#27272A",
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: "#FF5500",
    borderColor: "#FF5500",
  },
  categoryChipText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "500",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 10,
    gap: 12,
  },
  thumbnail: {
    width: 54,
    height: 54,
    borderRadius: 8,
  },
  exerciseName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryBadge: {
    color: "#FF5500",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
  },
});
