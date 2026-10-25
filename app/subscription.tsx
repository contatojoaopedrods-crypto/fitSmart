import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const plans = [
  {
    id: "monthly",
    name: "Plano Mensal",
    price: "R$ 119,90",
    period: "/mês",
    highlight: false,
    features: [
      "Acesso livre à musculação",
      "Acompanhamento do app",
      "1 Avaliação a cada 3 meses",
    ],
  },
  {
    id: "annual",
    name: "Plano VIP Anual",
    price: "R$ 89,90",
    period: "/mês",
    highlight: true,
    badge: "MAIS POPULAR",
    features: [
      "Acesso ilimitado a todas as unidades",
      "Treino personalizado com Personal",
      "Avaliação Física mensal",
      "Acesso para 1 convidado/mês",
    ],
  },
];

export default function SubscriptionScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("annual");

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

        <Text style={styles.headerTitle}>Meu Plano</Text>
        <Text style={styles.headerSubtitle}>
          Gerencie sua assinatura e conquiste mais recursos
        </Text>

        {/* Card do Plano Atual */}
        <View style={styles.currentPlanCard}>
          <View style={styles.currentHeader}>
            <View>
              <Text style={styles.currentLabel}>PLANO ATUAL</Text>
              <Text style={styles.currentName}>VIP Anual</Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>ATIVO</Text>
            </View>
          </View>
          <Text style={styles.renewText}>
            Próxima renovação automática em 12/11/2026
          </Text>
        </View>

        {/* Opções de Upgrade/Mudar Plano */}
        <Text style={styles.sectionTitle}>Opções de Planos</Text>

        {plans.map((item) => {
          const isSelected = selectedPlan === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.planCard,
                item.highlight && styles.planCardHighlighted,
                isSelected && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan(item.id)}
            >
              {item.badge && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>{item.badge}</Text>
                </View>
              )}

              <View style={styles.planHeaderRow}>
                <View>
                  <Text style={styles.planName}>{item.name}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.planPrice}>{item.price}</Text>
                    <Text style={styles.planPeriod}>{item.period}</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.radioCircle,
                    isSelected && styles.radioCircleActive,
                  ]}
                >
                  {isSelected && <View style={styles.radioInnerCircle} />}
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.featuresList}>
                {item.features.map((feat) => (
                  <View key={feat} style={styles.featureItem}>
                    <Ionicons
                      name="checkmark-sharp"
                      size={16}
                      color="#22C55E"
                    />
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Botão de Confirmação */}
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.confirmBtnText}>Atualizar Assinatura</Text>
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
  currentPlanCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FF5500",
    marginBottom: 24,
  },
  currentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  currentLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FF5500",
  },
  currentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: "#22C55E",
    fontSize: 11,
    fontWeight: "bold",
  },
  renewText: {
    color: "#71717A",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 16,
    position: "relative",
  },
  planCardHighlighted: {
    borderColor: "#3F2318",
  },
  planCardSelected: {
    borderColor: "#FF5500",
    backgroundColor: "#1A120E",
  },
  popularBadge: {
    position: "absolute",
    top: -10,
    right: 16,
    backgroundColor: "#FF5500",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  popularBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
  planHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  planPrice: {
    color: "#FF5500",
    fontSize: 20,
    fontWeight: "bold",
  },
  planPeriod: {
    color: "#71717A",
    fontSize: 12,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#52525B",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleActive: {
    borderColor: "#FF5500",
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF5500",
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
    marginVertical: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    color: "#D4D4D8",
    fontSize: 12,
  },
  confirmBtn: {
    backgroundColor: "#FF5500",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  confirmBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
