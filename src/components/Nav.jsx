import React from "react";
import {
  Box,
  Text,
  Flex,
  Link,
  Container,
  Button,
  Center
} from "@chakra-ui/react";
import { useHistory, Link as ReachLink } from "react-router-dom";

const Nav = ({ isLogin, setIsLogin, setIsLoginPage, userInfo }) => {
  const history = useHistory();
  const handleSigninClick = () => {
    setIsLoginPage(true);
    history.push("/login");
  };
  const handleSignoutClick = () => {
    setIsLoginPage(false);
    setIsLogin(false);
    // clear token
    localStorage.clear();
    history.push("/");
  };

  return (
    <Flex mb={5} bg="tomato" w="100%" p={3} justify="space-between">
      <Link as={ReachLink} to="/users">
        Home
      </Link>
      {isLogin === true ? (
        <Flex>
          <Link as={ReachLink} to={`/users/${userInfo.userId}`} pt={1}>
            {userInfo.username}
          </Link>
          <Button ml={3} size="sm" onClick={handleSignoutClick}>
            登出
          </Button>
        </Flex>
      ) : (
        <Button size="sm" onClick={handleSigninClick}>
          登入
        </Button>
      )}
    </Flex>
  );
};
export default Nav;
