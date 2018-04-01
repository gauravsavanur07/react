import omit from 'lodash/omit';
import { createReducer } from 'redux-act';

import * as actions from './actions';
import * as reducers from './reducers';

import initialState from './initialState';

export default createReducer({
  [actions.create]: reducers.create,
  [actions.destroy]: (s, { id }) => omit(s, id),
  [actions.addFilter]: reducers.addFilter,
  [actions.removeFilter]: reducers.removeFilter,
  [actions.move]: s => s,
}, initialState);
