import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../customHooks/useForm';
import { userContext } from '../../UserContext';
import ErrorHelper from '../Helper/ErrorHelper';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(userContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input name="username" label="Usuário" type="text" {...username} />

        <Input name="password" label="Senha" type="password" {...password} />
        {loading ? (
          <Button disabled>Carregando</Button>
        ) : (
          <Button>Entrar</Button>
        )}

        <ErrorHelper error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>
          Ainda não possui conta?
          <Link to="/login/criar" className={styles.buttonCriar}>
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
