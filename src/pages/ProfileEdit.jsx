import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
      title: 'Edit profile',
    };

    this.handleChange = this.handleChange.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.getInfoUser = this.getInfoUser.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.getInfoUser();
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState((state) => ({
      user: {
        ...state.user,
        [name]: value,
      },
    }));
  }

  getInfoUser() {
    this.setState({ loading: true });

    getUser()
      .then((response) => this.setState({
        user: response,
        loading: false,
      }));
  }

  editUserRender = () => {
    const { user, title } = this.state;
    const { name, email, image, description } = user;

    return (
      <fieldset>
        <h2>{ title }</h2>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={ name }
            name="name"
            id="name"
            data-testid="edit-input-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={ email }
            id="name"
            data-testid="edit-input-email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Description:
          <input
            type="text"
            name="description"
            value={ description }
            id="description"
            data-testid="edit-input-description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="avatar">
          Avatar:
          <input
            type="text"
            name="image"
            value={ image }
            id="avatar"
            data-testid="edit-input-image"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/profile">
          <input
            type="button"
            value="Salvar"
            data-testid="edit-button-save"
            onClick={ this.submitForm }
            disabled={ !this.disabledButton() }
          />
        </Link>
      </fieldset>
    );
  };

  disabledButton() {
    const { user } = this.state;
    return Object.values(user).every(({ length }) => length > 0);
  }

  async submitForm() {
    const { user } = this.state;

    this.setState({ title: 'Carregando...' });
    await updateUser(user);
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          (loading)
            ? <Loading />
            : this.editUserRender()
        }
      </div>
    );
  }
}

export default ProfileEdit;
