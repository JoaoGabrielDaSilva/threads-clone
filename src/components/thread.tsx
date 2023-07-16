import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
  ZStack,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BottomSheet } from "./bottom-sheet";
import { Button } from "./button";

export const Thread = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const isFirstRender = useRef(true);

  const likeScale = useSharedValue(1);

  const handleFollowThreadOwner = () => {
    Alert.alert("Follow joaogabrieldasilva", undefined, [
      { text: "Cancelar" },
      { text: "Seguir", onPress: () => setIsFollowed(true) },
    ]);
  };
  const handleUnfollowThreadOwner = () => {
    Alert.alert("Unfollow joaogabrieldasilva", undefined, [
      { text: "Deixar de Seguir", onPress: () => setIsFollowed(false) },
      { text: "Cancelar" },
    ]);
  };

  const rLikeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: likeScale.value,
      },
    ],
  }));

  useEffect(() => {
    if (!isFirstRender.current) {
      likeScale.value = withSequence(withSpring(0.8), withSpring(1));
    } else {
      isFirstRender.current = false;
    }
  }, [liked]);

  return (
    <HStack
      borderBottomWidth="0.5"
      borderBottomColor="gray.600"
      py="4"
      px="2"
      bg="black"
    >
      <VStack alignItems="center">
        <Box>
          <Image
            alt="profile image"
            size="8"
            rounded="full"
            source={{
              uri: "https://github.com/JoaoGabrielDaSilva.png",
            }}
          />

          <IconButton
            variant="unstyled"
            rounded="full"
            bg="white"
            p="0"
            position="absolute"
            right="-5px"
            bottom="-5px"
            borderWidth="2"
            borderColor="black"
            onPress={
              !isFollowed ? handleFollowThreadOwner : handleUnfollowThreadOwner
            }
            icon={
              <Icon
                as={<Ionicons name={isFollowed ? "checkmark" : "add"} />}
                size="sm"
                color="black"
              />
            }
          />
        </Box>
        <Box bg="gray.200" w="2px" flex="1" my="2" />
        <Avatar
          size="4"
          source={{ uri: "https://github.com/JoaoGabrielDaSilva.png" }}
        />
      </VStack>
      <VStack px="4">
        <HStack justifyContent="space-between">
          <Text color="white" fontWeight="bold">
            joaogabrieldasilva
          </Text>
          <HStack>
            <Text color="gray.500" mr="2">
              12h
            </Text>
            <IconButton
              p="0"
              onPress={() => setIsOptionsOpen(true)}
              icon={
                <Icon
                  as={<Ionicons name="ellipsis-horizontal" />}
                  color="white"
                />
              }
            />
          </HStack>
        </HStack>
        <Text color="white" fontWeight="semibold" my="2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolore
        </Text>
        <Image
          rounded="lg"
          alt="image"
          w="full"
          h="300px"
          resizeMode="cover"
          source={{
            uri: "https://soubh.uai.com.br/uploads/post/image/14033/main_meu_amigo_Totoro_e_outros_filmes_do_Ghibli_de_graca_em_BH_cinema.jpg",
          }}
        />
        <HStack space="2" pt="4">
          <Animated.View style={rLikeStyle}>
            <IconButton
              variant="unstyled"
              p="0"
              onPress={() => setLiked((l) => !l)}
              icon={
                <Icon
                  as={<Ionicons name={liked ? "heart" : "heart-outline"} />}
                  color={liked ? "red.500" : "white"}
                />
              }
            />
          </Animated.View>
          <IconButton
            variant="unstyled"
            p="0"
            icon={
              <Icon as={<Ionicons name="chatbubble-outline" />} color="white" />
            }
          />
          <IconButton
            variant="unstyled"
            p="0"
            icon={<Icon as={<AntDesign name="retweet" />} color="white" />}
          />
          <IconButton
            variant="unstyled"
            p="0"
            icon={<Icon as={<Feather name="send" />} color="white" />}
          />
        </HStack>
        <HStack space="2" mt="4">
          <Text color="gray.500">1 resposta</Text>
          <Text color="gray.500">Ver curtidas</Text>
        </HStack>
      </VStack>
      <BottomSheet
        isOpen={isOptionsOpen}
        handleClose={() => setIsOptionsOpen(false)}
      >
        <VStack px="2" pb="6" pt="2">
          <Button>Silenciar</Button>
        </VStack>
      </BottomSheet>
    </HStack>
  );
};
