import 'rxjs';

const clientId = 'c9a2278ecb154240ba607ed4116eabdb';
const redirectURI = 'http://localhost:3000/oauth/';

// Action Types
const AUTHENTICATE = 'spoti/AUTH/START';
const AUTHENTICATION_SUCCESS = 'spoti/AUTH/SUCCESS';

// Action Creators
export const authenticate = () => ({type: AUTHENTICATE});
export const authenticated = authToken => ({type: AUTHENTICATION_SUCCESS, data: {authToken} });

// Initial State
const initialState = {
  authToken: ''
}

// Reducer
export default function reducer(state = initialState, action){

  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      return {...state, authToken: action.data.authToken}
  
    default:
      return state;

  }
}

// Side-effects
const redirectToSpotify = () => {
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectURI}&scope=user-read-recently-played`
}

export const authenticationEpic = action$ => {
  return action$.ofType(AUTHENTICATE)
    .map(value => redirectToSpotify())
    .ignoreElements()
}
