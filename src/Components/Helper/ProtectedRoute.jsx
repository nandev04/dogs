import React from 'react';
import { userContext } from '../../UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(userContext);
  console.log(login);
  if (login) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRoute;
