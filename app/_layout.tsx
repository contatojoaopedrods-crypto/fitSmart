import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "../contexts/AuthContext";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#09090A" },
            animation: "slide_from_right",
          }}
        >
          {/* Entradas e Autenticação */}
          <Stack.Screen name="index" />
          <Stack.Screen name="select-profile" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />

          {/* Grupos Principais */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="teacher" />

          {/* Treino e Execução */}
          <Stack.Screen name="workout-active" />
          <Stack.Screen name="workout-summary" />

          {/* Saúde e Acompanhamento */}
          <Stack.Screen name="analytics" />
          <Stack.Screen name="body-composition" />
          <Stack.Screen name="evaluation" />
          <Stack.Screen name="evaluation-history" />
          <Stack.Screen name="hydration" />
          <Stack.Screen name="nutrition-plan" />
          <Stack.Screen name="progress-photos" />
          <Stack.Screen name="supplementation" />

          {/* Academia e Funcionalidades */}
          <Stack.Screen name="chat" />
          <Stack.Screen name="check-in" />
          <Stack.Screen name="class-rating" />
          <Stack.Screen name="gym-access-qr" />
          <Stack.Screen name="gym-classes" />
          <Stack.Screen name="leaderboard" />
          <Stack.Screen name="personal-booking" />

          {/* Perfil e Ajustes */}
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="payment-history" />
          <Stack.Screen name="privacy-settings" />
          <Stack.Screen name="referral-program" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="subscription" />
          <Stack.Screen name="support-faq" />
          <Stack.Screen name="help-faq" />
          <Stack.Screen name="terms-about" />
          <Stack.Screen name="notifications" />

          {/* Modal */}
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </AuthProvider>
  );
}
