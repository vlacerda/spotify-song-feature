import Rx from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import {header, search} from './spotify';

// Action Types
const SEARCH_MUSIC = 'spoti/SEARCH/MUSIC';
const SEARCH_MUSIC_RESPONSE = 'spoti/SEARCH/MUSIC/RESPONSE';
const SEARCH_MUSIC_ERROR = 'spoti/SEARCH/MUSIC/ERROR';
const SELECT_SONG = 'spoti/SONG/SELECT';

// Action Creators
export const searchMusicAction = term => ({type: SEARCH_MUSIC, data: {term}});
export const searchMusicResponseAction = music => ({type: SEARCH_MUSIC_RESPONSE, data: {music}});
export const searchMusicError = err => ({type: SEARCH_MUSIC_ERROR, data: err});
export const selectedSong = song => ({type: SELECT_SONG, data: song});

// Initial State
const initialState = {
  searchTerm: '',
  musicList: [],
  selectedSong: null,
  error: '',
  loading: false
}

// Reducer
export default function reducer(state = initialState, action){

  switch (action.type) {
    case SEARCH_MUSIC:
      return {...state, searchTerm: action.data.term, loading: true}

    case SEARCH_MUSIC_RESPONSE:
    return {...state, musicList: action.data.music, loading: false}

    case SELECT_SONG:
      return {...state, selectedSong: action.data}

    case SEARCH_MUSIC_ERROR:
      return {...state, error: action.data, loading: false}
  
    default:
      return state;

  }
}

// Side-effects
export const searchEpic = (action$, store) => {
  return action$.ofType(SEARCH_MUSIC)
    .mergeMap( ({data}) => 
      ajax({
        url: search(data.term), 
        crossDomain: true, 
        responseType: 'json', 
        headers: {...header(store.getState().auth.authToken)} 
      })
      .map(data => data.response.tracks.items)
      .map(value => searchMusicResponseAction(value))
      .catch((err) => {
        console.log(err.xhr.response.error.message)
        return Rx.Observable.of(searchMusicError(err.xhr.response.error.message));
      })
  )
}