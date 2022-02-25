import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { music } = this.props;

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
      </li>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf().isRequired,
};

export default MusicCard;
