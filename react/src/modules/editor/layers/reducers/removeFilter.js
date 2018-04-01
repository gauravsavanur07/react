export default (state, { id, filterId }) => {
  const layer = state[id];
  const filters = layer.filters.filter(f => f !== filterId);

  return { ...state, [id]: { ...layer, filters } };
};
