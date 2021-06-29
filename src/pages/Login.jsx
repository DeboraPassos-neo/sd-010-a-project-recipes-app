import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePersistedState from '../hooks/usePersistedState';

function Login() {
  const history = useHistory();

  const [user, setUser] = usePersistedState('user', { email: '' });
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const handleChangeUser = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleClickLogin = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

  useEffect(() => {
    const validateInputs = () => {
      const minPasswordLength = 6;
      const { email } = user;
      const emailPattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
      const validPassword = password.length > minPasswordLength;
      const validEmail = email.match(emailPattern);
      setDisableButton(!(validEmail && validPassword));
    };

    validateInputs();
  }, [user, password]);

  return (
    <form>
      <input
        type="text"
        data-testid="email-input"
        placeholder="Email"
        id="emailInput"
        name="email"
        onChange={ handleChangeUser }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Senha"
        id="passwordInput"
        name="password"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disableButton }
        id="login-submit-btn"
        name="login-submit-btn"
        onClick={ handleClickLogin }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
