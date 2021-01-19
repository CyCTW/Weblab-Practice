import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  useToast,
  Image,
  Box,
  Input,
  Flex,
  Textarea
} from "@chakra-ui/react";
import userIcon from "../icons/user.svg";
import { updateRemoteUserData } from "../utils";

const UserPageEdit = ({ authToken, userInfo, setUserInfo }) => {
  const { userId } = useParams();
  const [UIState, setUIState] = useState("success");
  const [userInput, setUserInput] = useState({
    username: userInfo.username,
    description: null,
    pictureUrl: userInfo.pictureUrl
  });
  const [usernameIsChange, setUsernameIsChange] = useState(false);
  const history = useHistory();
  const handleCancelClick = () => {
    // redirect to userList page
    history.push("/users");
  };
  const toast = useToast();
  const callToast = (err) => {
    toast({
      title: "An error occurred!",
      description: `${err}. Please try again or choose another Picture!`,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top"
    });
  };
  const handleSubmitClick = () => {
    setUIState("loading");
    updateRemoteUserData({ data: userInput, userId, authToken })
      .then((res) => {
        console.log(res);
        if (res.data.result === null) {
          const errorCode = res.data.message;
          throw new Error(errorCode);
        }
        setUserInfo({
          ...userInfo,
          username: userInput.username,
          pictureUrl: userInput.pictureUrl
        });
        setUIState("success");
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userInfo,
            username: userInput.username,
            pictureUrl: userInput.pictureUrl
          })
        );
        history.push("/users");
      })
      .catch((err) => {
        console.log(err);
        callToast(err);

        setUIState("error");
      });
  };
  const hiddenFileInput = React.useRef(null);

  const handleButtonClick = () => {
    hiddenFileInput.current.click();
  };
  const handleFile = async (e) => {
    const fileo = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (r) => {
      setUserInput({
        ...userInput,
        pictureUrl: r.target.result
      });
    };
    reader.readAsDataURL(fileo);
    setUIState("success");
  };
  const handleDescription = (e) => {
    setUserInput({
      ...userInput,
      description: e.target.value
    });
  };

  const handleUsername = (e) => {
    setUsernameIsChange(true);
    setUserInput({
      ...userInput,
      username: e.target.value
    });
  };

  return (
    <Flex direction="column" align="center">
      <Image
        src={userInput.pictureUrl ? userInput.pictureUrl : userIcon}
        w={[150, 200, 250]}
        p={5}
      ></Image>
      <Flex w={[150, 200, 250]} justify="space-between">
        <Button onClick={handleButtonClick}>上傳頭貼</Button>
        <Input
          type="file"
          ref={hiddenFileInput}
          onChange={handleFile}
          style={{ display: "none" }}
        />
        <Box ml={3} p={2}>
          上限300KB
        </Box>
      </Flex>
      <Input
        w={[150, 200, 250]}
        type="username"
        placeholder="使用者名稱"
        mt={7}
        onChange={handleUsername}
        value={!usernameIsChange ? userInfo.username : null}
      />

      <Textarea
        mt={7}
        placeholder="Write an impressive self-introduction here!"
        w="60%"
        h="200px"
        onChange={handleDescription}
      />
      <Flex mt={7} w={[150, 200, 250]} justify="space-around">
        <Button onClick={handleCancelClick}>取消</Button>
        <Button
          ml={5}
          colorScheme="blue"
          isLoading={UIState === "loading"}
          loadingText="Submitting"
          onClick={handleSubmitClick}
          disabled={!userInput.username}
        >
          儲存
        </Button>
      </Flex>
    </Flex>
  );
};
export default UserPageEdit;
