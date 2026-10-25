import { Feather, Ionicons } from "@expo/vector-icons";
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
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  "Todos",
  "Proteínas",
  "Creatina",
  "Pré-Treino",
  "Acessórios",
];

const products = [
  {
    id: "1",
    name: "100% Whey Concentrado 900g",
    brand: "Growth Supplements",
    price: "R$ 99,90",
    category: "Proteínas",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300",
  },
  {
    id: "2",
    name: "Creatina Monohidratada 250g",
    brand: "Max Titanium",
    price: "R$ 89,90",
    category: "Creatina",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300",
  },
  {
    id: "3",
    name: "Pré-Treino C4 Beta Pump 300g",
    brand: "Probiotics",
    price: "R$ 119,90",
    category: "Pré-Treino",
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=300",
  },
];

export default function SupplementStoreScreen() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState("Todos");
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    Alert.alert(
      "Adicionado!",
      `${productName} foi adicionado ao seu carrinho.`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />

      {/* Header com Carrinho */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Loja da Academia</Text>

        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() =>
            Alert.alert("Carrinho", `Itens no carrinho: ${cartCount}`)
          }
        >
          <Feather name="shopping-bag" size={20} color="#FFFFFF" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        {/* Categorias */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catContainer}
        >
          {categories.map((cat) => {
            const active = selectedCat === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.catChip, active && styles.catChipActive]}
                onPress={() => setSelectedCat(cat)}
              >
                <Text
                  style={[
                    styles.catChipText,
                    active && styles.catChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Lista de Produtos */}
        <Text style={styles.sectionTitle}>Em Destaque</Text>

        <View style={styles.productsGrid}>
          {products.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />

              <View style={styles.productInfo}>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>{item.price}</Text>

                  <TouchableOpacity
                    style={styles.addCartBtn}
                    onPress={() => addToCart(item.name)}
                  >
                    <Ionicons name="add" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#18181B",
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cartBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: 2,
    right: -2,
    backgroundColor: "#FF5500",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  catContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#18181B",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  catChipActive: {
    backgroundColor: "#FF5500",
    borderColor: "#FF5500",
  },
  catChipText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "600",
  },
  catChipTextActive: {
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  productsGrid: {
    gap: 14,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    gap: 12,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#27272A",
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  brandText: {
    color: "#FF5500",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  productName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  addCartBtn: {
    backgroundColor: "#FF5500",
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
