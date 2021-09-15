export default function collapsedReducer(state, { type, index }) {
  const stateCopy = state;
  switch (type) {
    case 'expand-all':
      return [true, true, true];
    case 'collapse-all':
      return [false, false, false];
    case 'toggle':
      stateCopy[index] = !stateCopy[index];
      return [...stateCopy];

    default:
      throw new Error();
  }
}
