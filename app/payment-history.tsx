import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

const invoices = [
  {
    id: "INV-2026-08",
    date: "10/08/2026",
    value: "R$ 149,90",
    status: "pago",
    method: "Cartão de Crédito (•••• 4829)",
  },
  {
    id: "INV-2026-07",
    date: "10/07/2026",
    value: "R$ 149,90",
    status: "pago",
    method: "Cartão de Crédito (•••• 4829)",
  },
  {
    id: "INV-2026-06",
    date: "10/06/2026",
    value: "R$ 149,90",
    status: "pago",
    method: "PIX",
  },
];

export default function PaymentHistoryScreen() {
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

        <Text style={styles.headerTitle}>Faturas & Pagamentos</Text>
        <Text style={styles.headerSubtitle}>
          Gerencie suas cobranças e histórico financeiro
        </Text>

        {/* Card do Plano Atual */}
        <View style={styles.planCard}>
          <View style={styles.planCardHeader}>
            <View>
              <Text style={styles.planTag}>PLANO ATIVO</Text>
              <Text style={styles.planName}>VIP Black Anual</Text>
            </View>
            <Text style={styles.planPrice}>
              R$ 149,90<Text style={styles.planPeriod}>/mês</Text>
            </Text>
          </View>

          <View style={styles.planDetailsRow}>
            <View style={styles.planDetailItem}>
              <Feather name="calendar" size={14} color="#71717A" />
              <Text style={styles.planDetailText}>
                Próx. Renovação: 10/09/2026
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.changeMethodBtn}
            onPress={() =>
              Alert.alert(
                "Cartão de Crédito",
                "•••• •••• •••• 4829 (Mastercard)",
              )
            }
          >
            <Ionicons name="card-outline" size={16} color="#FF5500" />
            <Text style={styles.changeMethodText}>
              Alterar Forma de Pagamento
            </Text>
          </TouchableOpacity>
        </View>

        {/* Histórico de Faturas */}
        <Text style={styles.sectionTitle}>Histórico de Cobranças</Text>

        {invoices.map((inv) => (
          <View key={inv.id} style={styles.invoiceCard}>
            <View style={styles.invoiceHeader}>
              <View style={styles.invoiceLeft}>
                <View style={styles.statusBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                  <Text style={styles.statusText}>PAGO</Text>
                </View>
                <Text style={styles.invoiceDate}>{inv.date}</Text>
              </View>
              <Text style={styles.invoiceValue}>{inv.value}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.invoiceFooter}>
              <Text style={styles.methodText}>{inv.method}</Text>
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() =>
                  Alert.alert("Comprovante", `Baixando recibo ${inv.id}...`)
                }
              >
                <Feather name="download" size={14} color="#A1A1AA" />
                <Text style={styles.downloadText}>Recibo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  planCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FF5500",
    marginBottom: 24,
  },
  planCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  planTag: {
    color: "#FF5500",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  planName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
  },
  planPrice: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  planPeriod: {
    fontSize: 11,
    color: "#71717A",
    fontWeight: "normal",
  },
  planDetailsRow: {
    marginBottom: 16,
  },
  planDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  planDetailText: {
    color: "#A1A1AA",
    fontSize: 12,
  },
  changeMethodBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#27272A",
    borderRadius: 10,
    paddingVertical: 10,
    gap: 8,
  },
  changeMethodText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  invoiceCard: {
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    marginBottom: 12,
  },
  invoiceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoiceLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    color: "#22C55E",
    fontSize: 10,
    fontWeight: "bold",
  },
  invoiceDate: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  invoiceValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#27272A",
    marginVertical: 12,
  },
  invoiceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  methodText: {
    color: "#71717A",
    fontSize: 11,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  downloadText: {
    color: "#A1A1AA",
    fontSize: 11,
    fontWeight: "500",
  },
});
