import { Box, Center } from "native-base";
import { ReactNode, useEffect, useState } from "react";
import { Dimensions, Modal, TouchableOpacity } from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type BottomSheetProps = {
  isOpen: boolean;
  handleClose: () => void;
  children?: ReactNode;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

const SHEET_HEIGHT = SCREEN_HEIGHT * 0.35;

export const BottomSheet = ({
  isOpen,
  handleClose,
  children,
}: BottomSheetProps) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const [isVisible, setIsVisible] = useState(isOpen);

  const rBackdropStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateY.value,
      [-SHEET_HEIGHT, 0],
      ["#000000a3", "transparent"]
    ),
  }));

  const rSheetStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value.y = translateY.value;
    })
    .onUpdate((e) => {
      translateY.value = context.value.y + e.translationY;
      translateY.value = Math.max(-SHEET_HEIGHT, translateY.value);
    });

  const scrollTo = (position: number, callback?: () => void) =>
    withSpring(
      position,
      { overshootClamping: true, damping: 15, stiffness: 300 },
      () => {
        if (callback) {
          runOnJS(callback)();
        }
      }
    );

  useEffect(() => {
    if (isOpen) {
      setIsVisible(isOpen);
      translateY.value = scrollTo(-SHEET_HEIGHT);
    } else {
      translateY.value = scrollTo(0, () => setIsVisible(isOpen));
    }
  }, [isOpen]);

  return (
    <Modal transparent visible={isVisible} onRequestClose={handleClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleClose}
        style={{ flex: 1 }}
      >
        <Animated.View style={[{ flex: 1 }, rBackdropStyles]}>
          <TouchableOpacity activeOpacity={1}>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={rSheetStyles}>
                <Box
                  position="absolute"
                  top={`${SCREEN_HEIGHT}px`}
                  h={`${SHEET_HEIGHT}px`}
                  w="full"
                  bg="gray.900"
                  roundedTop="lg"
                >
                  <Center py="2">
                    <Box h="2" w="10" rounded="full" bg="gray.800" />
                  </Center>
                  {children}
                </Box>
              </Animated.View>
            </GestureDetector>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};
