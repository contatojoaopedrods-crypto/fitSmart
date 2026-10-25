import { Feather } from "@expo/vector-icons";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("Lucas Silva");
  const [email, setEmail] = useState("lucas.silva@email.com");
  const [phone, setPhone] = useState("(21) 98765-4321");
  const [goal, setGoal] = useState("Hipertrofia");

  const handleSave = () => {
    Alert.alert("Sucesso", "Suas informações de perfil foram atualizadas!");
    router.back();
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

        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <Text style={styles.headerSubtitle}>
          Mantenha seus dados cadastrais atualizados
        </Text>

        {/* Foto de Perfil com Botão de Edição */}
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300",
            }}
            style={styles.avatarImage}
          />
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Feather name="camera" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#52525B"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#52525B"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Telefone / WhatsApp</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#52525B"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Objetivo Principal</Text>
          <View style={styles.goalsRow}>
            {["Hipertrofia", "Emagrecimento", "Saúde"].map((item) => {
              const active = goal === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.goalChip, active && styles.goalChipActive]}
                  onPress={() => setGoal(item)}
                >
                  <Text
                    style={[styles.goalText, active && styles.goalTextActive]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Salvar Alterações</Text>
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
    marginBottom: 24,
  },
  avatarContainer: {
    alignSelf: "center",
    position: "relative",
    marginBottom: 28,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF5500",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#09090A",
  },
  formGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    color: "#A1A1AA",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  goalsRow: {
    flexDirection: "row",
    gap: 8,
  },
  goalChip: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#18181B",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  goalChipActive: {
    backgroundColor: "#FF5500",
    borderColor: "#FF5500",
  },
  goalText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "600",
  },
  goalTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  saveBtn: {
    backgroundColor: "#FF5500",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
