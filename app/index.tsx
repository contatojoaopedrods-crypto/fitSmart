import { useRouter } from "expo-router";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const splashBg =
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090A" />
      <ImageBackground
        source={{ uri: splashBg }}
        style={styles.splashBg}
        imageStyle={{ opacity: 0.35 }}
      >
        <View style={styles.splashOverlay}>
          {/* Marca e Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.brandIconRow}>
              <View style={[styles.brandBar, { height: 16 }]} />
              <View style={[styles.brandBar, { height: 28 }]} />
              <View style={[styles.brandBar, { height: 40 }]} />
              <View style={[styles.brandBar, { height: 22 }]} />
              <View style={[styles.brandBar, { height: 34 }]} />
            </View>
            <Text style={styles.brandTitle}>FitSmart</Text>
            <Text style={styles.brandSubtitle}>Treinos Inteligentes</Text>
            <Text style={styles.brandSlogan}>
              Inteligência que transforma{"\n"}treinos em resultados.
            </Text>
          </View>

          {/* Botões de Ação */}
          <View style={styles.splashActionGroup}>
            {/* 1. Começar agora -> Cadastro */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.primaryButtonText}>Começar agora</Text>
            </TouchableOpacity>

            {/* 2. Sou aluno -> Login */}
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.outlineButtonText}>Sou aluno</Text>
            </TouchableOpacity>

            {/* 3. Sou professor -> Login */}
            <TouchableOpacity
              style={styles.textOnlyButton}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.subtleText}>Sou personal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090A",
  },
  splashBg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  splashOverlay: {
    flex: 1,
    backgroundColor: "rgba(9, 9, 10, 0.75)",
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 120,
  },
  brandIconRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
    marginBottom: 16,
  },
  brandBar: {
    width: 6,
    backgroundColor: "#FF5500",
    borderRadius: 3,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 4,
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#71717A",
    letterSpacing: 3,
    marginTop: -2,
    marginBottom: 16,
  },
  brandSlogan: {
    fontSize: 14,
    color: "#A1A1AA",
    textAlign: "center",
    lineHeight: 20,
  },
  splashActionGroup: {
    gap: 12,
    width: "100%",
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
  outlineButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF5500",
    width: "100%",
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  textOnlyButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  subtleText: {
    color: "#71717A",
    fontSize: 14,
  },
});
