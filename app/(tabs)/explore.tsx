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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FeedbackScreen() {
  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState("Bom");
  const [energyLevel, setEnergyLevel] = useState(75);
  const [feedbackNotes, setFeedbackNotes] = useState("");

  const handleSubmit = () => {
    Alert.alert("Sucesso 🎉", "Feedback enviado ao seu professor!", [
      { text: "OK", onPress: () => router.push("/(tabs)/workout") },
    ]);
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
        {/* Cabeçalho */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.headerTitle}>Feedback do treino</Text>
            <Text style={styles.headerSubtitle}>28/08/2026 • Push</Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.push("/(tabs)/workout")}
          >
            <Feather name="x" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Emojis */}
        <Text style={styles.sectionTitle}>Como foi seu treino hoje?</Text>
        <View style={styles.emojiRow}>
          {[
            { label: "Muito difícil", icon: "😫" },
            { label: "Difícil", icon: "🙁" },
            { label: "Bom", icon: "😃" },
            { label: "Fácil", icon: "🙂" },
            { label: "Muito fácil", icon: "⚡" },
          ].map((item) => {
            const isSelected = selectedEmoji === item.label;
            return (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.emojiCard,
                  isSelected && styles.emojiCardSelected,
                ]}
                onPress={() => setSelectedEmoji(item.label)}
              >
                <Text style={styles.emojiIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.emojiLabel,
                    isSelected && styles.emojiLabelSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Nível de Energia */}
        <Text style={styles.sectionTitle}>Nível de energia</Text>
        <View style={styles.energySliderBox}>
          <View style={styles.energyTrack}>
            <View style={[styles.energyFill, { width: `${energyLevel}%` }]} />
            <TouchableOpacity
              style={[
                styles.energyThumb,
                { left: `${Math.min(Math.max(energyLevel, 2), 94)}%` },
              ]}
            />
          </View>
          <View style={styles.energyLabelsRow}>
            <TouchableOpacity onPress={() => setEnergyLevel(15)}>
              <Text style={styles.subtleText}>Baixa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEnergyLevel(50)}>
              <Text style={styles.subtleText}>Média</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEnergyLevel(95)}>
              <Text style={styles.subtleText}>Alta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Observações */}
        <Text style={styles.sectionTitle}>Observações (opcional)</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Como você se sentiu? Alguma dor ou desconforto?"
          placeholderTextColor="#52525B"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={feedbackNotes}
          onChangeText={setFeedbackNotes}
        />

        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 16 }]}
          onPress={handleSubmit}
        >
          <Text style={styles.primaryButtonText}>Enviar feedback</Text>
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
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#18181B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 12,
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emojiCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: "center",
    width: "18%",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  emojiCardSelected: {
    borderColor: "#FF5500",
    backgroundColor: "#261710",
  },
  emojiIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  emojiLabel: {
    fontSize: 9,
    color: "#71717A",
    textAlign: "center",
  },
  emojiLabelSelected: {
    color: "#FF5500",
    fontWeight: "bold",
  },
  energySliderBox: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  energyTrack: {
    height: 6,
    backgroundColor: "#27272A",
    borderRadius: 3,
    position: "relative",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  energyFill: {
    height: 6,
    backgroundColor: "#FF5500",
    borderRadius: 3,
  },
  energyThumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF5500",
    top: -7,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  energyLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtleText: {
    color: "#71717A",
    fontSize: 14,
  },
  textArea: {
    backgroundColor: "#18181B",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    height: 100,
    borderWidth: 1,
    borderColor: "#27272A",
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
