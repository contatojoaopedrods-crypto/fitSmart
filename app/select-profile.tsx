import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SelectProfileScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<"teacher" | "student" | null>(null);

  const handleSelect = (profile: "teacher" | "student") => {
    setSelected(profile);
    if (profile === "teacher") {
      router.push("/teacher/dashboard");
    } else {
      router.push("/(tabs)/workout");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Qual seu perfil?</Text>
        <Text style={styles.headerSubtitle}>
          Selecione uma opção para continuar
        </Text>

        <View style={styles.cardsContainer}>
          {/* Opção Professor */}
          <TouchableOpacity
            style={[
              styles.profileCard,
              selected === "teacher" && styles.profileCardSelected,
            ]}
            onPress={() => handleSelect("teacher")}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <FontAwesome5 name="user-graduate" size={24} color="#FF5500" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Professor</Text>
              <Text style={styles.cardDescription}>
                Gerencie alunos, avaliações e monte treinos
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#71717A" />
          </TouchableOpacity>

          {/* Opção Aluno */}
          <TouchableOpacity
            style={[
              styles.profileCard,
              selected === "student" && styles.profileCardSelected,
            ]}
            onPress={() => handleSelect("student")}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <FontAwesome5 name="user-alt" size={22} color="#FF5500" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Aluno</Text>
              <Text style={styles.cardDescription}>
                Acesse seus treinos, registre feedbacks e evolua
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#71717A" />
          </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 24,
    width: 40,
    height: 40,
    justifyContent: "center",
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
  cardsContainer: {
    marginTop: 36,
    gap: 16,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  profileCardSelected: {
    borderColor: "#FF5500",
    backgroundColor: "#1F1713",
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#261710",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "#A1A1AA",
    lineHeight: 18,
  },
});
