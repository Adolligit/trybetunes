import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searching: '',
      phrase: '',
      loading: false,
      result: [],
    };

    this.changeSearching = this.changeSearching.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.searchingAlbums = this.searchingAlbums.bind(this);
  }

  returnForm = () => {
    const { searching } = this.state;

    return (
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
          onClick={ this.searchingAlbums }
        />
      </form>
    );
  };

  changeSearching({ target: { value } }) {
    this.setState({ searching: value });
  }

  disabledButton() {
    const { searching } = this.state;

    return (searching.length < 2) ? 1 : 0;
  }

  async searchingAlbums() {
    const { searching } = this.state;
    this.setState({ loading: true });

    const result = await searchAlbumsAPI(searching);

    this.setState({
      searching: '',
      loading: false,
      result,
      phrase: (result.length > 0)
        ? `Resultado de álbuns de: ${searching}`
        : 'Nenhum álbum foi encontrado',
    });
  }

  render() {
    const { loading, phrase, result } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { (loading) ? <Loading /> : this.returnForm() }
        { phrase }
        <ul>
          {
            result.map((album) => (
              <li key={ album.collectionId }>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `album/${album.collectionId}` }
                >
                  { album.collectionName }
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Search;
