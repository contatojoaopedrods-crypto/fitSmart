import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialMessages = [
  {
    id: "1",
    text: "Fala Beatriz! Como foi o treino de pernas hoje?",
    sender: "trainer",
    time: "10:00",
  },
  {
    id: "2",
    text: "Foi ótimo Prof! Consegui subir a carga no agachamento.",
    sender: "me",
    time: "10:02",
  },
  {
    id: "3",
    text: "Excelente! Manteve a postura correta nas últimas repetições?",
    sender: "trainer",
    time: "10:03",
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newMsg = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      time: timeStr,
    };

    setMessages([...messages, newMsg]);
    setInputText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      {/* Header com Dados do Trainer */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
          }}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.trainerName}>Prof. Lucas Mendes</Text>
          <View style={styles.statusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>Online agora</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.headerIcon}>
          <Feather name="phone" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.messagesPadding}>
          {messages.map((item) => {
            const isMe = item.sender === "me";
            return (
              <View
                key={item.id}
                style={[
                  styles.messageBubble,
                  isMe ? styles.myBubble : styles.trainerBubble,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Feather name="paperclip" size={20} color="#71717A" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#52525B"
            value={inputText}
            onChangeText={setInputText}
          />

          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#18181B",
    gap: 12,
  },
  backButton: {
    width: 32,
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  trainerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  statusText: {
    color: "#71717A",
    fontSize: 11,
  },
  headerIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  messagesPadding: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 14,
  },
  trainerBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  myBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#FF5500",
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
  },
  timeText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#09090A",
    borderTopWidth: 1,
    borderTopColor: "#18181B",
    gap: 10,
  },
  attachBtn: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#18181B",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF5500",
    alignItems: "center",
    justifyContent: "center",
  },
});
