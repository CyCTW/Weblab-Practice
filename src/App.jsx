import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  BrowserRouter,
  Link as ReachLink,
  Redirect,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import UserPage from "./UserPage";
import UserPageEdit from "./UserPage/Edit";

import MemberTabs from "./components/MemberTabs";
import Nav from "./components/Nav";
import UserListPage from "./UserListPage";

export default function App() {
  const [selectState, setSelectState] = useState("idle");
  // three state: idle, login, signup, use for signup Page

  // check if it's a login/signup page (need header or not)
  const [showHeader, setShowHeader] = useState(false);

  // check if a user is login or not
  const [isLogin, setIsLogin] = useState(false);
  // get authToken
  const [authToken, setAuthToken] = useState(null);
  // record the current login user info
  const [userInfo, setUserInfo] = useState({
    userId: null,
    username: null,
    pictureUrl: null
  });
  useEffect(() => {
    // store login token and username
    const localToken = localStorage.getItem("token");
    const localUserInfo = localStorage.getItem("userInfo");
    // console.log(localUserInfo);
    if (localToken !== null) {
      // use local info
      setAuthToken(JSON.parse(localToken));
      setIsLogin(true);
      setUserInfo(JSON.parse(localUserInfo));
    }
  }, []);
  // console.log(isLogin);
  // console.log(authToken);
  // console.log(userInfo);
  // console.log(localStorage.getItem("userInfo"));
  return (
    <>
      <BrowserRouter>
        {showHeader === true ? (
          <MemberTabs selectState={selectState} />
        ) : (
          <Nav
            setIsLoginPage={setShowHeader}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            userInfo={userInfo}
          />
        )}
        <Switch>
          <Route key="0" path="/" exact>
            <Redirect to="/users/" />
          </Route>
          <Route key="1" path="/login">
            <LoginPage
              setSelectState={setSelectState}
              setIsLogin={setIsLogin}
              setIsLoginPage={setShowHeader}
              setAuthToken={setAuthToken}
              setUserInfo={setUserInfo}
            />
          </Route>
          <Route key="2" path="/signup">
            <SignUpPage
              setSelectState={setSelectState}
              setIsLogin={setIsLogin}
              setIsLoginPage={setShowHeader}
              setAuthToken={setAuthToken}
              setUserInfo={setUserInfo}
            />
          </Route>
          <Route key="3" path="/users/" exact>
            {isLogin === true && <UserListPage />}
          </Route>
          <Route key="4" path="/users/:userId" exact>
            <UserPage
              authToken={authToken}
              userInfo={userInfo}
              setIsLogin={setIsLogin}
              setUserInfo={setUserInfo}
            />
          </Route>
          <Route key="5" path="/users/:userId/edit">
            <UserPageEdit
              authToken={authToken}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
