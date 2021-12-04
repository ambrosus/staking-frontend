export const collapsedReducer = (state, { type, index }) => {
  const stateCopy = [false];
  switch (type) {
    case 'toggle':
      stateCopy[index] = !stateCopy[index];
      return [...stateCopy];
    case 'hide':
      stateCopy[index] = false;
      return [...stateCopy];
    case 'show':
      stateCopy[index] = true;
      return [...stateCopy];
    default:
      throw new Error();
  }
};

export const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
