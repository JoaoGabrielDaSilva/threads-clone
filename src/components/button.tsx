import { Box, IBoxProps, IPressableProps, Pressable, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";

type ButtonProps = IBoxProps & {
  color?: ColorType;
  onPress?: () => void;
};

export const Button = ({
  color = "white",
  onPress,
  children,
  ...props
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} _pressed={{ opacity: 0.7 }}>
      <Box bg="gray.800" px="4" py="4" rounded="2xl" {...props}>
        <Text color={color} bold>
          {children}
        </Text>
      </Box>
    </Pressable>
  );
};
