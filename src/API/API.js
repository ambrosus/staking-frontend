export const ambPriceInUsd = async (amb) => {
  try {
    const ambPrice = await fetch('https://token.ambrosus.io')
      .then((response) => response.json())
      .then((data) => data?.data?.price_usd);
    const result = amb * parseFloat(ambPrice, 10);
    return result.toFixed(7);
  } catch (err) {
    return 0;
  }
};

export const priceInPercent24h = async () => {
  try {
    return await fetch('https://token.ambrosus.io')
      .then((response) => response.json())
      .then((data) => data?.data?.percent_change_24h);
  } catch (err) {
    return 0;
  }
};
