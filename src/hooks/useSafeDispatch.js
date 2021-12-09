import React from 'react';

export const useSafeDispatch = (dispatch) => {
  const mountedRef = React.useRef(false);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : undefined),
    [dispatch],
  );
};
