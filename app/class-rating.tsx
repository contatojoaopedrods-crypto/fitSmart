import { Feather, Ionicons } from "@expo/vector-icons";
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

export default function ClassRatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    Alert.alert("Obrigado!", "Sua avaliação foi enviada com sucesso.");
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

        <Text style={styles.headerTitle}>Avaliar Aula</Text>
        <Text style={styles.headerSubtitle}>
          Spinning Extreme com Prof. Ricardo Santos
        </Text>

        <View style={styles.ratingCard}>
          <Text style={styles.cardQuestion}>Como foi sua experiência?</Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={32}
                  color={star <= rating ? "#FF5500" : "#52525B"}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Deixe um comentário para o instrutor (opcional)..."
            placeholderTextColor="#52525B"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Enviar Avaliação</Text>
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
  ratingCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272A",
    alignItems: "center",
    marginBottom: 24,
  },
  cardQuestion: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  commentInput: {
    width: "100%",
    backgroundColor: "#09090A",
    borderRadius: 12,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#27272A",
    textAlignVertical: "top",
    height: 100,
  },
  submitBtn: {
    backgroundColor: "#FF5500",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
