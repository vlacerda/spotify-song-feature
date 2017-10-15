import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import search, {searchEpic} from './search';
import auth, {authenticationEpic} from './auth';
import detail, {featureEpic} from './detail';

export const rootEpic = combineEpics(
  searchEpic,
  authenticationEpic,
  featureEpic
);

export const rootReducer = combineReducers({
  detail,
  search,
  auth
});