import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const faqs = [
  {
    id: "1",
    question: "Como faço para trancar minha matrícula?",
    answer:
      "Você pode solicitar o trancamento temporário do seu plano enviando uma mensagem direta para a recepção via chat do app com 5 dias de antecedência.",
  },
  {
    id: "2",
    question: "Posso levar um acompanhante no final de semana?",
    answer:
      "Alunos do Plano VIP Anual possuem direito a 1 passe de convidado por mês sem custo adicional.",
  },
  {
    id: "3",
    question: "Como reagendar uma avaliação física?",
    answer:
      "Acesse a aba Composição Corporal no perfil e clique em Agendar Nova Avaliação para escolher a melhor data.",
  },
  {
    id: "4",
    question: "Esqueci a senha do armário eletrônico, e agora?",
    answer:
      "Dirija-se ao balcão de atendimento com um documento com foto para realizar o resgate imediato.",
  },
];

export default function HelpFaqScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = faqs.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          Tire suas dúvidas ou entre em contato conosco
        </Text>

        {/* Input de Busca */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={18}
            color="#71717A"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar dúvida..."
            placeholderTextColor="#52525B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* FAQs */}
        <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
        {filteredFaqs.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqCard}
              activeOpacity={0.8}
              onPress={() => toggleExpand(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Feather
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#FF5500"
                />
              </View>
              {isOpen && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
            </TouchableOpacity>
          );
        })}

        {/* Opções de Contato Direto */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
          Canais de Atendimento
        </Text>

        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => router.push("/chat")}
          >
            <Ionicons name="chatbubbles-outline" size={22} color="#FF5500" />
            <Text style={styles.contactTitle}>Chat Online</Text>
            <Text style={styles.contactSub}>Atendimento em minutos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <MaterialCommunityIcons name="whatsapp" size={22} color="#22C55E" />
            <Text style={styles.contactTitle}>WhatsApp</Text>
            <Text style={styles.contactSub}>Seg a Sex, 08h-20h</Text>
          </TouchableOpacity>
        </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
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
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    paddingRight: 10,
  },
  faqAnswer: {
    color: "#A1A1AA",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#27272A",
    paddingTop: 10,
  },
  contactRow: {
    flexDirection: "row",
    gap: 12,
  },
  contactCard: {
    flex: 1,
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    alignItems: "center",
  },
  contactTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,
  },
  contactSub: {
    color: "#71717A",
    fontSize: 10,
    marginTop: 2,
  },
});
