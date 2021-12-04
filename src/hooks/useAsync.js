import React from 'react';
import { asyncReducer } from '../utils/reducers';

const useAsync = (asyncCallback, initialState, dependecies) => {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  React.useEffect(() => {
    const promise = asyncCallback();
    if (!promise) {
      return;
    }
    dispatch({ type: 'pending' });
    promise.then(
      (data) => {
        dispatch({ type: 'resolved', data });
      },
      (error) => {
        dispatch({ type: 'rejected', error });
      },
    );
    /* eslint-disable-next-line */
  }, dependecies);

  return state;
};

export default useAsync;
