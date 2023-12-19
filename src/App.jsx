import React from 'react';
import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import Conta from './Components/User/User';
import ProtectedRoute from './Components/Helper/ProtectedRoute';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="https://nandev04.github.io/dogs/" element={<Home />} />
            <Route
              path="https://nandev04.github.io/dogs/login/*"
              element={<Login />}
            />
            <Route
              path="https://nandev04.github.io/dogs/conta/*"
              element={
                <ProtectedRoute>
                  <Conta />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
