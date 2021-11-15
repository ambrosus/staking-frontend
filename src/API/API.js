export const ambMountUSD = async (amb) => {
  try {
    const [ambPriceInUsd] = await Promise.all([
      fetch('https://token.ambrosus.io')
        .then((response) => response.json())
        .then((data) => data?.data?.price_usd),
    ]);
    const result = amb * parseFloat(ambPriceInUsd, 10);
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
