import { useEffect, useState } from 'react';

const useMobileDetect = () => {
  const [isDesktop, setIsDesktop] = useState(null);
  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  useEffect(() => {
    setIsDesktop(() => {
      const isAndroid = () => Boolean(userAgent.match(/Android/i));
      const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
      const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
      const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
      const isSSR = () => Boolean(userAgent.match(/SSR/i));
      const isMobile = () =>
        Boolean(isAndroid() || isIos() || isOpera() || isWindows());
      return Boolean(!isMobile() && !isSSR());
    });
  }, [isDesktop]);

  return { isDesktop };
};

export default useMobileDetect;
