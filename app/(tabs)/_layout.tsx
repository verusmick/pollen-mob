import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0f0f0f", borderTopWidth: 0 },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",
        tabBarLabelPosition: "below-icon",
      }}
    >
      {/* hide index.tsx as tab */}
      <Tabs.Screen name="home" options={{ href: null }} />

      <Tabs.Screen
        name="locations"
        options={{
          title: "Locations",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="allergies"
        options={{
          title: "My allergies",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "reorder-three" : "reorder-three-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
