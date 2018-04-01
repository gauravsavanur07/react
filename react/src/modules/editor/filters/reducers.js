export function toggleLocked(state, { id }) {
  const filter = state[id];
  const locked = !filter.locked;

  return { ...state, [id]: { ...filter, locked } };
}

export function toggleVisibility(state, { id }) {
  const filter = state[id];
  const visible = !filter.visible;

  return { ...state, [id]: { ...filter, visible } };
}

export function move(state, { id, offset }) {
  const filter = state[id];
  const timeline = filter.timeline;

  return {
    ...state,
    [id]: {
      ...filter,
      timeline: { ...timeline, offset }
    }
  };
}

export function resize(state, payload) {
  const {
    id,
    offsetDelta,
    durationDelta,
    factor
  } = payload;

  const filter = state[id];
  const timeline = filter.timeline;

  const offset = timeline.offset + (factor > 0 ? 0 : offsetDelta);
  const duration = timeline.duration + durationDelta;

  return {
    ...state,
    [id]: {
      ...filter,
      timeline: {
        offset,
        duration
      }
    }
  };
}
