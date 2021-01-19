import React, { useState, useEffect } from "react";
import { FormControl, Input, Button, Flex, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { createRemoteUserData } from "../utils";
import jwt from "jwt-decode";

const SignUpPage = ({
  setSelectState,
  setIsLogin,
  setIsLoginPage,
  setAuthToken,
  setUserInfo
}) => {
  useEffect(() => {
    setSelectState("signup");
  }, []);
  const history = useHistory();
  // data
  const [userInput, setUserInput] = useState({
    email: null,
    username: null,
    password: null
  });
  const [UIState, setUIState] = useState("idle");
  const toast = useToast();

  const handleSignUp = () => {
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
    createRemoteUserData(userInput)
      .then((res) => {
        // deal with fail status
        console.log(res);
        if (res.data.result === null) {
          throw new Error(res.data.message);
        }
        const token = res.data.result.authToken;
        const user = jwt(token);
        const userId = user.sub;
        // console.log(res);
        setAuthToken(token);
        setUIState("success");
        setIsLoginPage(false);
        setIsLogin(true);
        setUserInfo({
          userId,
          username: userInput.username
        });
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            userId,
            username: userInput.username
          })
        );
        history.push(`/users/${userId}/edit`);
      })
      .catch((err) => {
        console.log(err);
        callToast(err);
        setUIState("error");
      });
  };
  const handleEmail = (e) => {
    setUserInput({
      ...userInput,
      email: e.target.value
    });
  };
  const handleUsername = (e) => {
    setUserInput({
      ...userInput,
      username: e.target.value
    });
  };
  const handlePassword = (e) => {
    setUserInput({
      ...userInput,
      password: e.target.value
    });
  };
  return (
    <>
      <Flex direction="column" align="center" height="60vh">
        <FormControl id="email" width="300px" isRequired>
          <Input type="email" placeholder="電子信箱" onChange={handleEmail} />
        </FormControl>
        <FormControl id="username" width="300px" mt={5} isRequired>
          <Input
            type="username"
            placeholder="使用者名稱"
            onChange={handleUsername}
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
          onClick={handleSignUp}
          disabled={
            !(userInput.email && userInput.username && userInput.password)
          }
        >
          加入
        </Button>
      </Flex>
    </>
  );
};

export default SignUpPage;
