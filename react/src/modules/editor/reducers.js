const filterDefaults = {
  visible: true,
  locked: false
};

let filterId = 100;

export function createFilter(state, { layerId, type }) {
  const {
    filterTypes,
    layers,
    filters
  } = state;

  const filterType = filterTypes[type];
  const layer = layers[layerId];

  const nextId = ++filterId;
  const newFilterId = `${type}${nextId}`;

  const { timeline, appearance } = filterType;

  const newFilter = {
    type,
    layerId,
    id: newFilterId,
    timeline,
    appearance,
    ...filterDefaults,
    attributes: { ...filterType.defaults }
  };

  return {
    ...state,
    filters: {
      ...filters,
      [newFilterId]: newFilter
    },
    layers: {
      ...layers,
      [layerId]: {
        ...layer,
        filters: [...layer.filters, newFilterId]
      }
    }
  };
}

export function update({ filters, ...state }, { currentTime }) {
  const activeFilters = Object.values(filters)
    .filter(filter => {
      const { offset, duration } = filter.timeline;
      return currentTime >= offset && currentTime < (offset + duration);
    }).map(f => f.id);

  return {
    ...state,
    filters,
    activeFilters
  };
}
