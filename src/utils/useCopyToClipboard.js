import { useEffect, useState } from 'react';
export const copyToClipboard = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  el.select();
  const result = document.execCommand('copy');
  document.body.removeChild(el);

  return result;
};

const useCopyToClipboard = ({ text, successDuration }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const result = copyToClipboard(text);
    setIsCopied(result);
  };

  useEffect(() => {
    let timer;
    if (isCopied && successDuration) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);
    }
    return () => timer !== undefined && clearTimeout(timer);
  }, [isCopied, successDuration]);
  /* eslint-disable-next-line */
  useEffect(() => {
    return () => setIsCopied(false);
  }, [text]);

  return { isCopied, onCopy: handleCopyToClipboard };
};

export default useCopyToClipboard;
