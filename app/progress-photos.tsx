import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

export default function ProgressPhotosScreen() {
  const router = useRouter();

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

        <Text style={styles.headerTitle}>Fotos de Progresso</Text>
        <Text style={styles.headerSubtitle}>
          Acompanhamento visual da sua evolução
        </Text>

        {/* Comparador Antes vs Depois */}
        <Text style={styles.sectionTitle}>Comparativo de Evolução</Text>

        <View style={styles.compareContainer}>
          <View style={styles.photoBox}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300",
              }}
              style={styles.photo}
            />
            <View style={styles.photoLabelBox}>
              <Text style={styles.photoLabel}>01 JAN 2026</Text>
            </View>
          </View>

          <View style={styles.photoBox}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300",
              }}
              style={styles.photo}
            />
            <View
              style={[styles.photoLabelBox, { backgroundColor: "#FF5500" }]}
            >
              <Text style={styles.photoLabel}>ATUAL</Text>
            </View>
          </View>
        </View>

        {/* Botão Adicionar Foto */}
        <TouchableOpacity
          style={styles.addPhotoBtn}
          onPress={() =>
            Alert.alert(
              "Upload de Foto",
              "Selecione uma foto da galeria ou abra a câmera.",
            )
          }
        >
          <Feather name="camera" size={18} color="#FFFFFF" />
          <Text style={styles.addPhotoText}>Registrar Nova Foto</Text>
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  compareContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  photoBox: {
    flex: 1,
    height: 240,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  photoLabelBox: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: "center",
  },
  photoLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  addPhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5500",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  addPhotoText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
