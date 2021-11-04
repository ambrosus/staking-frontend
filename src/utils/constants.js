export const { ethereum } = window;

export const CONNECT_TEXT = 'Connect Your Wallet';
export const HIDE = 'HIDE';
export const SHOW = 'SHOW';
export const STAKE = 'STAKE';
export const COMING_SOON = 'COMING SOON';

export const ambMounthUSD = async (amb) => {
  const ambPriceInUsd = await fetch('https://token.ambrosus.io')
    .then((response) => response.json())
    .then((data) => data?.data?.price_usd);
  const result = amb * parseFloat(ambPriceInUsd, 10);
  return result.toFixed(7);
};

export const priceInPercent24h = async () => {
  const ambPercentChange = await fetch('https://token.ambrosus.io')
    .then((response) => response.json())
    .then((data) => data?.data?.percent_change_24h);
  return ambPercentChange && ambPercentChange;
};

export const round = (num) =>
  /* eslint-disable-next-line */
  Math.abs(Number(num)) >= 1.0e9
    ? /* eslint-disable-next-line */
      Math.abs(Number(num) / 1.0e9) + ' b'
    : /* eslint-disable-next-line */
    Math.abs(Number(num)) >= 1.0e6
    ? /* eslint-disable-next-line */
      Math.abs(Number(num) / 1.0e6).toFixed(2) + 'm'
    : Math.abs(Number(num)) >= 1.0e3
    ? /* eslint-disable-next-line */
      Math.abs(Number(num) / 1.0e3).toFixed(2) + 'k'
    : Number(num).toFixed(2);

export function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return rand.toFixed(2);
}
