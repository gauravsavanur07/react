import reduceReducers from 'reduce-reducers';
import { createReducer } from 'redux-act';
import { combineTransform } from '../reducers';

import filtersReducer from './filters';
import layersReducer from './layers';

import video from '../html5video';
import player from '../player';

import initialState from './initialState';
import * as actions from './actions';
import * as reducers from './reducers';

export selector from './selector';
export const partial = combineTransform({
  video,
  player,
  layers: layersReducer,
  filters: filtersReducer
});

export const editor = createReducer({
  [actions.update]: reducers.update,
  [actions.createFilter]: reducers.createFilter,
  [actions.load]: (_, state) => state
}, initialState);

export default reduceReducers(editor, partial);
