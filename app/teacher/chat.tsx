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

const initialMessages = [
  {
    id: "1",
    sender: "student",
    text: "Professor, senti um pouco de desconforto no ombro no supino hoje.",
    time: "09:14",
  },
  {
    id: "2",
    sender: "teacher",
    text: "Oi Ana! Obrigado por avisar. Reduza a carga em 20% no próximo treino e foque na retração da escápula.",
    time: "09:18",
  },
  {
    id: "3",
    sender: "student",
    text: "Combinado! Já ajustei aqui na ficha.",
    time: "09:20",
  },
];

export default function TeacherChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "teacher",
        text: inputMessage,
        time: "Agora",
      },
    ]);
    setInputMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      {/* Header do Chat */}
      <View style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
          }}
          style={styles.avatar}
        />

        <View style={styles.headerInfo}>
          <Text style={styles.studentName}>Ana Carolina</Text>
          <Text style={styles.onlineStatus}>Online agora</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Feather name="phone" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Área de Mensagens */}
      <ScrollView contentContainerStyle={styles.messagesPadding}>
        {messages.map((msg) => {
          const isTeacher = msg.sender === "teacher";
          return (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                isTeacher ? styles.teacherWrapper : styles.studentWrapper,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isTeacher ? styles.teacherBubble : styles.studentBubble,
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input de Mensagem */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Feather name="paperclip" size={20} color="#A1A1AA" />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Escreva uma mensagem..."
          placeholderTextColor="#52525B"
          value={inputMessage}
          onChangeText={setInputMessage}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={16} color="#FFFFFF" />
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
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#18181B",
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  onlineStatus: {
    fontSize: 12,
    color: "#22C55E",
  },
  messagesPadding: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageWrapper: {
    marginBottom: 12,
    flexDirection: "row",
  },
  teacherWrapper: {
    justifyContent: "flex-end",
  },
  studentWrapper: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 12,
  },
  teacherBubble: {
    backgroundColor: "#FF5500",
    borderBottomRightRadius: 4,
  },
  studentBubble: {
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#27272A",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.6)",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#18181B",
    backgroundColor: "#09090A",
    gap: 10,
  },
  attachButton: {
    padding: 6,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#18181B",
    color: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF5500",
    alignItems: "center",
    justifyContent: "center",
  },
});
