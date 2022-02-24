import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      author: '',
      musics: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id)
      .then((response) => {
        response.shift();
        this.setState({
          author: response[0].artistName,
          musics: response,
        });
      });
  }

  render() {
    const { author, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <fieldset>
          <h1 data-testid="artist-name">{ author }</h1>
          <ul>
            {
              musics.map(({ trackName }) => (
                <li key={ trackName }>{ trackName }</li>
              ))
            }
          </ul>
        </fieldset>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(),
}.isRequired;

export default Album;
