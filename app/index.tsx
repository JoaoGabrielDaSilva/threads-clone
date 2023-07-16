import { Box } from "native-base";
import { TabBar } from "../src/components/tab-bar";
import { Thread } from "../src/components/thread";

export default function Feed() {
  return (
    <Box flex="1" bg="black" safeAreaTop>
      <Thread />
      <TabBar />
    </Box>
  );
}
