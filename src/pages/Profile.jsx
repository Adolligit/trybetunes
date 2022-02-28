import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import Header from './Header';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
    };

    this.getInfoUser = this.getInfoUser.bind(this);
  }

  componentDidMount() {
    this.getInfoUser();
  }

  getInfoUser() {
    this.setState({ loading: true });

    getUser()
      .then((response) => this.setState({
        user: response,
        loading: false,
      }));
  }

  userRender = () => {
    const { user: { name, email, image, description } } = this.state;

    return (
      <fieldset>
        <h1>Profile</h1>
        <div>
          <img src={ image } alt={ name } data-testid="profile-image" />
          <p>{name}</p>
          <p>{email}</p>
          <p>{description}</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </fieldset>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {
          (loading)
            ? <Loading />
            : this.userRender()
        }
      </div>
    );
  }
}

export default Profile;
