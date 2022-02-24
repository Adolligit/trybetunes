import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searching: '',
    };

    this.changeSearching = this.changeSearching.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
  }

  changeSearching({ target: { value } }) {
    this.setState({ searching: value });
  }

  disabledButton() {
    const { searching } = this.state;

    return (searching.length < 2) ? 1 : 0;
  }

  render() {
    const { searching } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="searching"
            data-testid="search-artist-input"
            value={ searching }
            onChange={ this.changeSearching }
          />
          <input
            type="button"
            value="Pesquisar"
            data-testid="search-artist-button"
            disabled={ this.disabledButton() }
          />
        </form>
      </div>
    );
  }
}

export default Search;
