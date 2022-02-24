import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: <Loading />,
    };

    this.changeStateName = this.changeStateName.bind(this);
  }

  componentDidMount() {
    this.changeStateName();
  }

  async changeStateName() {
    const { name } = await getUser();
    this.setState({ name });
  }

  render() {
    const { name } = this.state;

    return (
      <header
        data-testid="header-component"
      >
        <div>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 data-testid="header-user-name">{ name }</h3>
        </div>
      </header>
    );
  }
}

export default Header;
