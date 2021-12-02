export const ambPriceInUsd = async (amb) => {
  try {
    const response = await fetch(process.env.REACT_APP_AMBROSUS_TOKEN_URL);
    const ambPrice = await response.json();
    const result = amb * parseFloat(ambPrice.data.price_usd, 10);
    return result.toFixed(7);
  } catch (err) {
    return 0;
  }
};

export const priceInPercent24h = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_AMBROSUS_TOKEN_URL);
    const percentChange24h = await response.json();
    return percentChange24h.data.percent_change_24h;
  } catch (err) {
    return 0;
  }
};
