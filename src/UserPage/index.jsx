import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Tooltip,
  Button,
  Image,
  Box,
  Input,
  Flex,
  Textarea,
  Container,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from "@chakra-ui/react";
import userIcon from "../icons/user.svg";
import { deleteRemoteUserData, getRemoteUserData } from "../utils";
import Loading from "../components/Loading";

const UserPage = ({ authToken, userInfo, setUserInfo, setIsLogin }) => {
  const { userId } = useParams();
  const [UIState, setUIState] = useState("idle");
  // five state: idle, success, error, loading, pageLoading
  const [userData, setUserData] = useState({
    username: null,
    description: null,
    pictureUrl: null
  });
  const history = useHistory();

  useEffect(() => {
    setUIState("pageLoading");
    getRemoteUserData(userId)
      .then((res) => {
        const user = res.data.result;
        setUserData({
          ...userData,
          username: user.username,
          description: user.description,
          pictureUrl: user.picture_url
        });
        setUserInfo({
          ...userInfo,
          pictureUrl: user.picture_url
        });
        console.log(res);
        setUIState("success");
      })
      .catch((err) => {
        console.log(err);
        setUIState("error");
      });
  }, [userId]);
  const handleEditClick = () => {
    // redirect to userList page
    history.push(`/users/${userId}/edit`);
  };
  const handleDeleteClick = () => {
    setUIState("loading");
    deleteRemoteUserData({ userId, authToken })
      .then((res) => {
        console.log(res);

        setUIState("success");
        // auto-logout
        setIsLogin(false);
        // clear token
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setUIState("error");
      });
  };
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = React.useRef();
  const onClose = () => setIsOpen(false);

  if (UIState === "pageLoading") {
    return <Loading />;
  } else if (UIState === "error") {
    return <Container>Some error occured! Please try again.</Container>;
  } else {
    return (
      <Flex direction="column" align="center">
        <Image
          src={userData.pictureUrl ? userData.pictureUrl : userIcon}
          w={[150, 200, 250]}
          p={5}
        ></Image>

        <Box mt={5}>{userData.username}</Box>
        <Box mt={5}>{userData.description}</Box>

        <Flex mt={7} w={[150, 200, 250]} justify="space-around">
          <Button
            m={2}
            onClick={handleEditClick}
            disabled={!(userInfo.userId === userId)}
          >
            編輯
          </Button>
          <Button
            m={2}
            colorScheme="blue"
            isLoading={UIState === "loading"}
            loadingText="Deleting"
            onClick={() => {
              setIsOpen(true);
            }}
            disabled={!(userInfo.userId === userId)}
          >
            刪除此用戶
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete User
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards. <br />{" "}
                  Note: After deleting, you'll be auto logout.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDeleteClick} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
      </Flex>
    );
  }
};
export default UserPage;
