import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateEvaluationScreen() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [arm, setArm] = useState("");
  const [thigh, setThigh] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    Alert.alert("Sucesso!", "Avaliação física registrada.", [
      { text: "OK", onPress: () => router.back() },
    ]);
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

        <Text style={styles.headerTitle}>Nova Avaliação Física</Text>
        <Text style={styles.headerSubtitle}>Aluno: Ana Carolina</Text>

        {/* Composição Corporal */}
        <Text style={styles.sectionTitle}>Composição corporal</Text>
        <View style={styles.formRow}>
          <View style={styles.inputFlex}>
            <Text style={styles.inputLabel}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 62.5"
              placeholderTextColor="#52525B"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>

          <View style={styles.inputFlex}>
            <Text style={styles.inputLabel}>% Gordura</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 23"
              placeholderTextColor="#52525B"
              keyboardType="numeric"
              value={bodyFat}
              onChangeText={setBodyFat}
            />
          </View>
        </View>

        {/* Perímetros e Medidas */}
        <Text style={styles.sectionTitle}>Perímetros (cm)</Text>
        <View style={styles.formRow}>
          <View style={styles.inputFlex}>
            <Text style={styles.inputLabel}>Cintura</Text>
            <TextInput
              style={styles.input}
              placeholder="72"
              placeholderTextColor="#52525B"
              keyboardType="numeric"
              value={waist}
              onChangeText={setWaist}
            />
          </View>

          <View style={styles.inputFlex}>
            <Text style={styles.inputLabel}>Quadril</Text>
            <TextInput
              style={styles.input}
              placeholder="98"
              placeholderTextColor="#52525B"
              keyboardType="numeric"
              value={hip}
              onChangeText={setHip}
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputFlex}>
            <Text style={styles.inputLabel}>Braço</Text>
            <TextInput
              style={styles.input}
              placeholder="28"
              placeholderTextColor="#52525B"
              keyboardType="numeric"
              value={arm}
              onChangeText={setArm}
            />
          </View>

          <View style={styles.inputFlex}>
            <Text style={styles.inputLabel}>Coxa</Text>
            <TextInput
              style={styles.input}
              placeholder="56"
              placeholderTextColor="#52525B"
              keyboardType="numeric"
              value={thigh}
              onChangeText={setThigh}
            />
          </View>
        </View>

        {/* Anamnese / Observações */}
        <Text style={styles.sectionTitle}>Anamnese e Queixas</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Registre lesões, dores ou queixas do aluno..."
          placeholderTextColor="#52525B"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Salvar Avaliação</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Tab Bar Inferior Professor */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/teacher/dashboard")}
        >
          <Feather name="home" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/teacher/students")}
        >
          <FontAwesome5 name="users" size={18} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="dumbbell" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Feather name="star" size={20} color="#FF5500" />
          <Text style={styles.tabLabelActive}>Avaliações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Feather name="menu" size={20} color="#71717A" />
          <Text style={styles.tabLabelInactive}>Mais</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  backButton: {
    marginBottom: 16,
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 8,
    marginBottom: 12,
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  inputFlex: {
    flex: 1,
  },
  inputLabel: {
    color: "#A1A1AA",
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#18181B",
    color: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  textArea: {
    backgroundColor: "#18181B",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    height: 90,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#FF5500",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#09090A",
    borderTopWidth: 1,
    borderTopColor: "#18181B",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabelActive: {
    fontSize: 11,
    color: "#FF5500",
    fontWeight: "600",
    marginTop: 3,
  },
  tabLabelInactive: {
    fontSize: 11,
    color: "#71717A",
    marginTop: 3,
  },
});
