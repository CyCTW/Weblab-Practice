import axios from "axios";
const memberHostname = "https://api.weblab.tw/";
const memberVersion = "v1/";
const memberLoginPath = "auth/general-login";
const memberCreatePath = "auth/register";
const hostname = "https://weblab-react-special-midtern.herokuapp.com/";
const version = "v1/";
const path = "users/";

// success!
export const createNewLogin = async (data) => {
  // 0616225, 123
  const response = await axios.post(
    `${memberHostname}${memberVersion}${memberLoginPath}`,
    { ...data, appId: "weblab" }
  );
  return response;
  // https://api.weblab.tw/v1/auth/general-login
};

// success!
export const createRemoteUserData = async (data) => {
  const response = await axios.post(
    `${memberHostname}${memberVersion}${memberCreatePath}`,
    { ...data, appId: "weblab" }
  );
  return response;
  // https://api.weblab.tw/v1/auth/register
};

// success !
export const getRemoteUsersData = async () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const response = await axios.get(`${hostname}${version}${path}`, { headers });
  // https://weblab-react-special-midtern.herokuapp.com/v1/users/
  return response;
};

export const getRemoteUserData = async (userId) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const response = await axios.get(`${hostname}${version}${path}${userId}`, {
    headers
  });
  // https://weblab-react-special-midtern.herokuapp.com/v1/users/:userId
  return response;
};

// success !
export const updateRemoteUserData = async ({ data, userId, authToken }) => {
  const headers = {
    Authorization: `Bearer ${authToken}`
  };

  const response = await axios.post(
    `${hostname}${version}${path}${userId}`,
    data,
    { headers }
  );
  // const response = await axios.delete(`${hostname}${userId}`, config);

  // https://weblab-react-special-midtern.herokuapp.com/v1/users/:userId

  return response;
};

export const deleteRemoteUserData = async ({ userId, authToken }) => {
  console.log(userId);
  console.log(authToken);
  const headers = {
    Authorization: `Bearer ${authToken}`
  };
  const response = await axios.delete(
    `
    ${hostname}${version}${path}${userId}`,
    {
      headers
    }
  );
  // https://weblab-react-special-midtern.herokuapp.com/v1/users/:userId

  return response;
};
