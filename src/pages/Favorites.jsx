import React, { Component } from 'react';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      musics: [],
    };
  }

  componentDidMount() {
    getFavoriteSongs()
      .then((response) => this.setState({
        musics: response,
      }));
  }

  // componentWillUnmount() {
  //   console.log("atualizou");
  // }

  render() {
    const { musics, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <fieldset>
          <h2>Favorite Musics</h2>
          <ul>
            {
              (loading)
                ? <Loading />
                : musics.map((music) => (
                  <MusicCard key={ music.trackId } music={ music } />
                ))
            }
          </ul>
        </fieldset>
      </div>
    );
  }
}

export default Favorites;
