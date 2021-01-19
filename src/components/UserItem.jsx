import React from "react";
import userIcon from "../icons/user.svg";

import {
  Wrap,
  WrapItem,
  Image,
  Box,
  Flex,
  Link,
  Container,
  Button,
  Center
} from "@chakra-ui/react";
const UserItem = ({ user, setSelectedId }) => {
  const handleUserClick = () => {
    setSelectedId(user.id);
  };
  return (
    <WrapItem
      key={user.id}
      ml={5}
      mt={5}
      as="button"
      onClick={handleUserClick}
      border="5px solid orange"
      boxShadow="2xl"
      rounded="lg"
      _hover={{
        boxShadow: "dark-lg"
      }}
    >
      <Flex direction="column" m={2}>
        <Image
          src={user.picture_url ? user.picture_url : userIcon}
          boxSize="200px"
        />
        <Center m={2}>{user.username}</Center>
      </Flex>
    </WrapItem>
  );
};
export default UserItem;
