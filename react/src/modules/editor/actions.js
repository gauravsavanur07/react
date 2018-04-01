import { createAction as action } from 'redux-act';

export const load = action('editor.load');
export const update = action('editor.update', currentTime => ({ currentTime }));
export const createFilter = action(
  'editor.createFilter',
  (layerId, type) => ({ layerId, type })
);
