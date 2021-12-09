export const collapsedReducer = (state, action) => {
  const stateCopy = [false];
  switch (action.type) {
    case 'toggle':
      stateCopy[action.index] = !stateCopy[action.index];
      return [...stateCopy];
    case 'hide':
      stateCopy[action.index] = false;
      return [...stateCopy];
    case 'show':
      stateCopy[action.index] = true;
      return [...stateCopy];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
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
