import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../customHooks/useForm';
import { userContext } from '../../UserContext';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin } = React.useContext(userContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input name="username" label="Usuário" type="text" {...username} />

        <Input name="password" label="Senha" type="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to={'/login/criar'}>Cadastro</Link>
    </section>
  );
};

export default LoginForm;
