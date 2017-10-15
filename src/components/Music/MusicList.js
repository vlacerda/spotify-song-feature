import React from 'react';
import { connect } from 'react-redux';
import MusicItem from './MusicItem';
import {selectedSong} from '../../redux/modules/search';

const mapState = ({search}) => ({
  musicList: search.musicList,
  error: search.error
})

const mapDispatch = (dispatch) => ({
  selectedSong: (song) => dispatch(selectedSong(song))
})

export const MusicList = ({musicList, error, selectedSong}) => {

  const selectSongBind = (song) => {
    selectedSong(song)
  }

  return (
    !error 
    ? musicList.map((music, ind) => (<div key={ind} onClick={selectSongBind.bind(null, music)}><MusicItem music={music} /></div>))
    : <strong>{error}</strong>
  );
}

export default connect(mapState, mapDispatch)(MusicList);