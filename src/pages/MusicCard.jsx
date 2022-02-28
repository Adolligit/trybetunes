import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      marked: false,
    };

    this.setFavoriteSong = this.setFavoriteSong.bind(this);
    this.getFavoriteSong = this.getFavoriteSong.bind(this);
  }

  componentDidMount() {
    this.getFavoriteSong();
  }

  setFavoriteSong(music) {
    const favoriteSongsStorage = JSON.parse(localStorage.favorite_songs); // pegar localStorage com "await getFavoriteSongs" deu erro
    const trackIdFavorites = favoriteSongsStorage.map(({ trackId }) => trackId);

    if (!trackIdFavorites.includes(music.trackId)) {
      this.setState({ loading: true });
      addSong(music)
        .then(() => this.setState((state) => ({
          loading: false,
          marked: !state.marked,
        })));
    } else {
      removeSong(music);
    }
  }

  async getFavoriteSong() {
    const { music } = this.props;
    const response = await getFavoriteSongs();
    const anyoneMarked = response.some(({ trackId }) => trackId === music.trackId); // bool

    console.log(anyoneMarked);

    this.setState((state) => ({
      marked: anyoneMarked,
    }));
  }

  render() {
    const { music } = this.props;
    const { loading, marked } = this.state;

    return (
      <li>
        <h3>{ music.trackName }</h3>
        <div>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <label htmlFor="favorita">
          Favorita
          {
            (loading)
              ? <Loading />
              : (
                <input
                  data-testid={ `checkbox-music-${music.trackId}` }
                  type="checkbox"
                  checked={ marked }
                  onClick={ () => this.setFavoriteSong(music) }
                />
              )
          }

        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
