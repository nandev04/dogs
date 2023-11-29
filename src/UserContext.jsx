import React from 'react';
import { GET_USER, TOKEN_POST, TOKEN_VALIDATE_POST } from './api';
import { useNavigate } from 'react-router-dom';

export const userContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      // Esse navigate não está funcionando
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = GET_USER(token);
    const responseUser = await fetch(url, options);
    const jsonUser = await responseUser.json();
    setData(jsonUser);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: Usuário inválido `);
      const json = await response.json();
      window.localStorage.setItem('token', json.token);
      await getUser(json.token);
      navigate('/conta');
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const tokenLocal = window.localStorage.getItem('token');
      if (tokenLocal) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(tokenLocal);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(tokenLocal);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <userContext.Provider
      value={{ userLogin, getUser, data, userLogout, error, loading, login }}
    >
      {children}
    </userContext.Provider>
  );
};
