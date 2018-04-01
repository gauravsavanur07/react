import transform from 'lodash/transform';

export const combineTransform = (reducers, initialState = {}) =>
  (state = initialState, action) => ({
    ...state,
    ...transform(reducers, (result, reducer, key) => result[key] = reducer(state[key], action), {})
  });

export const reduceIf = (reducer, predicate, options = { payload: true }) =>
  (state, action) => predicate(action) ?
    reducer(state, options.payload ? action && action.payload : action) : state;

export function reduceAny(reducer, actions) {
  return reduceIf(reducer, a => actions.indexOf(a.type) !== -1);
}
