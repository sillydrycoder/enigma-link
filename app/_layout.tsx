import { Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <>
      <StatusBar
        barStyle="dark-content" 
        backgroundColor="#ffffff"
        translucent={false}
      />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Enigma Link",
            headerRight: () => (
              <TouchableOpacity
                onPressIn={() => {
                  router.push("/connect");
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <AntDesign name="link" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="connect"
          options={{
            title: "Connect",
          }}
        />
      </Stack>
    </>
  );
}
