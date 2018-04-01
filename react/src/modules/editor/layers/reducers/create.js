import { layerDefaults } from '../initialState';

let layerId = 6;

export default (state, { type }) => {
  const nextId = ++layerId;
  const newLayerId = `${type}${nextId}`;

  const newLayer = {
    id: newLayerId,
    type,
    order: nextId,
    ...layerDefaults
  };

  return {
    ...state,
    [newLayerId]: newLayer
  };
};
