// para testar no remoto
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      offBtn: true,
      loading: false,
      redirect: false,
    };

    this.changeName = this.changeName.bind(this);
    this.saveName = this.saveName.bind(this);
  }

  returnForm = () => {
    const { name, offBtn } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="login-name-input"
            type="text"
            value={ name }
            onChange={ this.changeName }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ offBtn }
          onClick={ () => this.saveName(name) }
        >
          Entrar
        </button>
      </form>
    );
  }

  disabledButton() {
    const minimumValue = 3;
    const { name } = this.state;

    this.setState({ offBtn: (name.length < minimumValue) ? 1 : 0 });
  }

  changeName({ target: { value } }) {
    this.setState({ name: value }, this.disabledButton);
  }

  async saveName(name) {
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: true, redirect: <Redirect to="/search" /> });
  }

  render() {
    const { loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        {
          (loading) ? <Loading /> : this.returnForm()
        }
        { (redirect) }
      </div>
    );
  }
}

export default Login;
