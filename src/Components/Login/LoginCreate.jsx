import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../customHooks/useForm';
import { USER_POST } from '../../api';
import { userContext } from '../../UserContext';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');
  const { userLogin } = React.useContext(userContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const response = await fetch(url, options);
    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="Username" {...username} />
        <Input label="Email" type="email" name="Email" {...email} />
        <Input label="Senha" type="password" name="Password" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginCreate;
