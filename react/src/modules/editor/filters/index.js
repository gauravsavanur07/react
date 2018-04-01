import omit from 'lodash/omit';
import { createReducer } from 'redux-act';

import initialState from './initialState';
import * as actions from './actions';
import * as reducers from './reducers';

export default createReducer({
  [actions.destroy]: (s, { id }) => omit(s, id),
  [actions.toggleLocked]: reducers.toggleLocked,
  [actions.toggleVisibility]: reducers.toggleVisibility,
  [actions.move]: reducers.move,
  [actions.resize]: reducers.resize
}, initialState);
