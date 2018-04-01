import { createAction as action } from 'redux-act';

export const create = action('layer.create', type => ({ type }));
export const destroy = action('layer.destroy', id => ({ id }));
export const move = action('layer.move', (id, index) => ({ id, index }));

export const addFilter = action('layer.addFilter', (id, filterId) => ({ id, filterId }));
export const removeFilter = action('layer.removeFilter', (id, filterId) => ({ id, filterId }));
