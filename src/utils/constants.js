export const CONNECT_TEXT = 'Connect Your Wallet';
export const ambMounthUSD = (amb, usdPrice) => {
  const result = amb * parseFloat(usdPrice, 10);
  return result.toFixed(7);
};
