import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigationState, useRoute } from "@react-navigation/native";
import { useRootNavigationState, useRouter } from "expo-router";
import { HStack, Icon, Pressable } from "native-base";

const ROUTES = [
  {
    name: "index",
    icon: <Entypo name="home" />,
  },
  {
    name: "new-thread",
    icon: <Feather name="edit" />,
    redirect: "/new-thread",
  },
];

export const TabBar = () => {
  const router = useRouter();
  const state = useRootNavigationState();

  return (
    <HStack
      bg="black"
      h="24"
      pt="4"
      justifyContent="space-around"
      position="absolute"
      bottom="0"
      left="0"
      right="0"
    >
      {ROUTES.map((route) => {
        const TabIcon = route.icon;

        const isFocused = state?.routeNames?.[state?.index!] === route.name;

        return (
          <Pressable
            key={route.name}
            onPress={() => {
              if (route?.redirect) {
                router.push(route.redirect);
              } else {
                router.replace(route.name);
              }
            }}
            disabled={isFocused}
          >
            <Icon
              as={TabIcon}
              color={isFocused ? "white" : "gray.500"}
              size="xl"
            />
          </Pressable>
        );
      })}
    </HStack>
  );
};
