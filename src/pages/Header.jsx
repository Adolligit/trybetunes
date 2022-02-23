import React, { Component } from 'react';
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
        <h3 data-testid="header-user-name">{ name }</h3>
      </header>
    );
  }
}

export default Header;
