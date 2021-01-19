import React, { useState, useEffect } from "react";
import { FormControl, Input, Button, Flex, useToast } from "@chakra-ui/react";
import { createNewLogin } from "../utils";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";

const LoginPage = ({
  setSelectState,
  setIsLogin,
  setIsLoginPage,
  setAuthToken,
  setUserInfo
}) => {
  useEffect(() => {
    setSelectState("login");
  }, []);
  const [userInput, setUserInput] = useState({
    account: null,
    password: null
  });
  const history = useHistory();
  const toast = useToast();
  const [UIState, setUIState] = useState("idle");
  // 3 states: idle, success, error
  const handleLogin = () => {
    setUIState("loading");
    const callToast = (err) => {
      toast({
        title: "An error occurred!",
        description: `${err}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    };
    createNewLogin(userInput)
      .then((res) => {
        console.log(res);
        if (res.data.result === null) {
          throw new Error(res.data.message);
        }
        const token = res.data.result.authToken;
        setAuthToken(token);

        const user = jwt(token);
        const userId = user.sub;

        setUIState("success");
        setIsLoginPage(false);
        setIsLogin(true);
        setUserInfo({
          userId,
          username: userInput.account
        });
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            userId,
            username: userInput.account
          })
        );
        history.push(`/users/`);
        // history.push(`/users/`);
      })
      .catch((err) => {
        console.log(err);
        callToast(err);
        setUIState("error");
      });
  };
  const handleAccount = (e) => {
    setUserInput({
      ...userInput,
      account: e.target.value
    });
  };
  const handlePassword = (e) => {
    setUserInput({
      ...userInput,
      password: e.target.value
    });
  };
  return (
    <Flex direction="column" align="center" height="60vh">
      <FormControl id="username" width="300px" isRequired>
        <Input
          type="username"
          placeholder="使用者名稱"
          onChange={handleAccount}
        />
      </FormControl>
      <FormControl id="password" width="300px" mt={5} isRequired>
        <Input type="password" placeholder="密碼" onChange={handlePassword} />
      </FormControl>

      <Button
        colorScheme="blue"
        isLoading={UIState === "loading"}
        loadingText="Submitting"
        width="300px"
        mt={5}
        disabled={!(userInput.account && userInput.password)}
        onClick={handleLogin}
      >
        登入
      </Button>
    </Flex>
  );
};

export default LoginPage;
