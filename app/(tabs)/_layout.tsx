import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#09090A",
          borderTopColor: "#1C1C1E",
        },
        tabBarActiveTintColor: "#FF5500",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      {/* Aba de Treinos */}
      <Tabs.Screen
        name="workout"
        options={{
          title: "Treinos",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dumbbell.fill" color={color} />
          ),
        }}
      />

      {/* Aba de Feedback (antiga explore) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Feedback",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      {/* Aba 3: Avaliação Física */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Avaliação",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
