export default (state, { id, filterId }) => {
  const layer = state[id];
  const filters = layer.filters;

  return {
    ...state,
    [id]: {
      ...layer,
      filters: [
        ...filters,
        filterId
      ]
    }
  };
};
