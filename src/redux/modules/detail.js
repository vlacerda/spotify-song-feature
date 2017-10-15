import Rx from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import {header, features} from './spotify';

// Action Types
const GET_FEATURE = 'spoti/FEATURE/GET';
const GET_FEATURE_RESPONSE = 'spoti/FEATURE/RESPONSE';
const GET_FEATURE_ERROR = 'spoti/FEATURE/ERROR';

// Action Creators
export const getFeatureAction = id => ({type: GET_FEATURE, data: {id}});
export const getFeatureResponseAction = feature => ({type: GET_FEATURE_RESPONSE, data: {feature}});
export const getFeatureError = err => ({type: GET_FEATURE_ERROR, data: err});

// Initial State
const initialState = {
  danceability : 1,
  energy : 1,
  speechiness : 1,
  acousticness : 1,
  instrumentalness : 1,
  liveness : 1,
  tempo : 1,
  error: '',
  loading: false
}

// Reducer
export default function reducer(state = initialState, action){

  switch (action.type) {
    case GET_FEATURE:
      return {...state, id: action.data.id, loading: true}

    case GET_FEATURE_RESPONSE:
    return {...state, ...filterResponse(action.data.feature), loading: false}

    case GET_FEATURE_ERROR:
      return {...state, error: action.data, loading: false}
  
    default:
      return state;

  }
}

// Side-effects
export const featureEpic = (action$, store) => {
  return action$.ofType(GET_FEATURE)
    .mergeMap( ({data}) => 
      ajax({
        url: features(data.id), 
        crossDomain: true, 
        responseType: 'json', 
        headers: {...header(store.getState().auth.authToken)} 
      })
      .map(data => data.response)
      .map(value => getFeatureResponseAction(value))
      .catch((err) => {
        return Rx.Observable.of(getFeatureError(err.xhr.response.error.message));
      })
  )
}

const filterResponse = ({ danceability,
                          energy,
                          speechiness,
                          acousticness,
                          instrumentalness,
                          liveness,
                          tempo}) => (
  {
    danceability,
    energy,
    speechiness,
    acousticness,
    instrumentalness,
    liveness,
    tempo
  }
)