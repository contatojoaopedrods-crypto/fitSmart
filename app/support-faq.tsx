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
  TouchableOpacity,
  View,
} from "react-native";

const faqs = [
  {
    id: "1",
    question: "Como funciona o trancamento de matrícula?",
    answer:
      "Você pode solicitar o trancamento por até 30 dias diretamente pelo app na aba de Faturas ou na recepção.",
  },
  {
    id: "2",
    question: "Posso levar um convidado para treinar comigo?",
    answer:
      "Alunos do plano VIP Black têm direito a 5 convites mensais gratuitos para trazer amigos.",
  },
  {
    id: "3",
    question: "Como faço para alterar meu horário de treino presencial?",
    answer:
      "Não há necessidade de agendamento para musculação tradicional, apenas para aulas coletivas.",
  },
];

export default function SupportFAQScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>("1");

  const toggleFaq = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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

        <Text style={styles.headerTitle}>Central de Ajuda</Text>
        <Text style={styles.headerSubtitle}>
          Tire suas dúvidas ou fale diretamente conosco
        </Text>

        {/* Card Suporte ao Vivo */}
        <View style={styles.chatCard}>
          <View style={styles.chatInfo}>
            <Ionicons name="chatbubbles-outline" size={24} color="#FF5500" />
            <View style={{ flex: 1 }}>
              <Text style={styles.chatTitle}>Suporte via WhatsApp</Text>
              <Text style={styles.chatSub}>
                Atendimento de Seg a Sex, das 08h às 20h
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.chatBtn}
            onPress={() =>
              Alert.alert(
                "WhatsApp",
                "Redirecionando para o atendimento oficial...",
              )
            }
          >
            <Text style={styles.chatBtnText}>Iniciar Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Perguntas Frequentes */}
        <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>

        {faqs.map((item) => {
          const isOpen = expandedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.faqCard}
              activeOpacity={0.8}
              onPress={() => toggleFaq(item.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Feather
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#A1A1AA"
                />
              </View>

              {isOpen && <Text style={styles.faqAnswer}>{item.answer}</Text>}
            </TouchableOpacity>
          );
        })}
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
  chatCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 28,
  },
  chatInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  chatTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  chatSub: {
    color: "#71717A",
    fontSize: 11,
    marginTop: 2,
  },
  chatBtn: {
    backgroundColor: "#22C55E",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  chatBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  faqQuestion: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    color: "#A1A1AA",
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
    borderTopWidth: 1,
    borderTopColor: "#27272A",
    paddingTop: 10,
  },
});
