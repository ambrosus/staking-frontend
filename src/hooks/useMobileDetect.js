import React from 'react';
const useMobileDetect = (
  userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent,
) => {
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const isMobile = React.useCallback(
    () =>
      mountedRef.current &&
      Boolean(
        userAgent.includes(
          'Android' ||
            'iPhone' ||
            'iPad' ||
            'iPod' ||
            'Opera Mini' ||
            'IEMobile',
        ),
      ),
    [userAgent],
  );

  return { isMobile };
};

export default useMobileDetect;
