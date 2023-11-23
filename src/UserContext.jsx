import React from 'react';
import { GET_USER, TOKEN_POST } from './api';

export const userContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function getUser(token) {
    const { url, options } = GET_USER(token);
    const responseUser = await fetch(url, options);
    const jsonUser = await responseUser.json();
    setData(jsonUser);
    setLogin(true);
  }

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });
    const response = await fetch(url, options);
    const json = await response.json();
    window.localStorage.setItem('token', json.token);
    getUser(json.token);
    // setData(json);
    setLogin(true);
  }

  return (
    <userContext.Provider value={{ userLogin, getUser, data }}>
      {children}
    </userContext.Provider>
  );
};
