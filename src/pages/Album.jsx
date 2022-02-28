import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      author: '',
      album: '',
      musics: [],
    };

    this.getMusicsFromAlbum = this.getMusicsFromAlbum.bind(this);
  }

  componentDidMount() {
    this.getMusicsFromAlbum();
  }

  getMusicsFromAlbum() {
    const { match: { params: { id } } } = this.props;

    getMusics(id)
      .then((response) => {
        this.setState({
          author: response[0].artistName,
          album: response[0].collectionName,
          musics: response.slice(1),
        });
      });
  }

  render() {
    const { author, album, musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <fieldset>
          <h1 data-testid="artist-name">{ author }</h1>
          <p data-testid="album-name">{ album }</p>
          <ul>
            {
              musics.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  action={ () => null }
                />
              ))
            }
          </ul>
        </fieldset>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
