export default {
  drop(props, monitor, component) {
    const { snapToGrid, cellSize } = props;

    const item = monitor.getItem();

    // difference between the last recorded client offset of the pointer
    // and the client offset when current the drag operation has started

    const delta = monitor.getDifferenceFromInitialOffset();

    const x = Math.round(item.x + delta.x);
    const nx = snapToGrid ? Math.round(x / cellSize) * cellSize : x;

    // in the real app you should fire an action here
    // instead of updating component's state directly
    component.move(item.id, nx);
  }
};
