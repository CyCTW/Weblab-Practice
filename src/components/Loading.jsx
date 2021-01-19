import React from "react";
import { Flex, Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <>
      <Flex direction="column">
        <Center mt={50}>
          <h2 style={{ fontFamily: "Monospace" }}>Loading</h2>
        </Center>
        <Center mt={5}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </Flex>
    </>
  );
};

export default Loading;
