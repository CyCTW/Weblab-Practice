import React from "react";
import { Link as ReachLink } from "react-router-dom";
import { Box, Flex, Link, Container, Button, Center } from "@chakra-ui/react";

const MemberTabs = ({ selectState }) => {
  return (
    // <div>hfdjsljfds</div>fdsafds
    <Flex justify="center" align="flex-end" height="40vh">
      <Box m={8}>
        <Center>
          <Link
            as={ReachLink}
            to="/login"
            borderBottom="5px solid transparent"
            style={
              selectState === "login"
                ? { color: "#3182CE", borderColor: "#3182CE" }
                : {}
            }
            _hover={{
              color: "blue.500"
            }}
          >
            會員登入
          </Link>
        </Center>
      </Box>
      <Box m={8}>
        <Center>
          <Link
            as={ReachLink}
            to="/signup"
            borderBottom="5px solid transparent"
            _hover={{
              color: "blue.500"
            }}
            style={
              selectState === "signup"
                ? { color: "#3182CE", borderColor: "#3182CE" }
                : {}
            }
          >
            加入會員
          </Link>
        </Center>
      </Box>
    </Flex>
  );
};
export default MemberTabs;
