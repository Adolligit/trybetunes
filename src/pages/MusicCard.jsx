import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      marked: false,
    };

    this.favoriteSong = this.favoriteSong.bind(this);
  }

  favoriteSong(music) {
    this.setState({ loading: true });
    addSong(music)
      .then(() => this.setState((state) => ({
        loading: false,
        marked: !state.marked,
      })));
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
                  onClick={ () => this.favoriteSong(music) }
                  checked={ marked }
                />
              )
          }

        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf().isRequired,
};

export default MusicCard;
