export const getToken = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_AMBROSUS_TOKEN_URL);
    const token = await response.json();
    return token;
  } catch (err) {
    return 0;
  }
};
