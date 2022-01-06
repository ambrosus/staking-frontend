import React from 'react';
import { asyncReducer } from 'utils/reducers';
import { useSafeDispatch } from './useSafeDispatch';

const useAsync = (asyncCallback, initialState) => {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = React.useCallback(
    (promise) => {
      dispatch({ type: 'pending' });
      promise.then(
        (dataObj) => {
          dispatch({ type: 'resolved', data: dataObj });
        },
        (errorObj) => {
          dispatch({ type: 'rejected', error: errorObj });
        },
      );
    },
    [dispatch],
  );

  return {
    error,
    status,
    data,
    run,
  };
};
export default useAsync;
