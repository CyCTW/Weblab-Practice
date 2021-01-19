import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getRemoteUsersData } from "../utils";
import { Wrap, Container } from "@chakra-ui/react";
import UserItem from "../components/UserItem";
import { useHistory } from "react-router-dom";

const UserListPage = () => {
  const [UIState, setUIState] = useState("loading");
  const [userList, setUserList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const history = useHistory();
  useEffect(() => {
    setUIState("loading");
    getRemoteUsersData()
      .then((res) => {
        if (res.data.result === null) {
          throw new Error(res.data.message);
        }
        console.log(res);
        setUserList(res.data.result);
        setUIState("success");
      })
      .catch((err) => {
        console.log(err);
        setUIState("error");
      });
  }, []);
  useEffect(() => {
    if (selectedId !== null) {
      history.push(`/users/${selectedId}`);
    }
  }, [selectedId]);
  if (UIState === "loading") {
    return <Loading />;
  } else if (UIState === "error") {
    return <Container>Something is wrong..., please try again.</Container>;
  } else {
    return (
      <Wrap>
        {userList.map((user) => {
          return (
            <UserItem key={user.id} user={user} setSelectedId={setSelectedId} />
          );
        })}
      </Wrap>
    );
  }
};
export default UserListPage;
