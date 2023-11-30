import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../UserContext';
import IconAdd from '../../Assets/adicionar.svg?react';
import IconStats from '../../Assets/estatisticas.svg?react';
import IconFeed from '../../Assets/feed.svg?react';
import IconExit from '../../Assets/sair.svg?react';
import styles from './UserHeaderNav.module.css';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(userContext);
  const [mobile, setMobile] = React.useState(null);
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate('/login');
  }
  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end>
        <IconFeed />
        {mobile && 'Minhas fotos'}
      </NavLink>
      <NavLink to="/conta/stats">
        <IconStats />
        {mobile && 'Estatísticas'}
      </NavLink>
      <NavLink to="/conta/post">
        <IconAdd />
        {mobile && 'Adicionar foto'}
      </NavLink>
      <button onClick={handleLogout}>
        <IconExit />
        {mobile && 'Sair'}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
