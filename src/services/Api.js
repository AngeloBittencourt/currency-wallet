const coinsUrl = 'https://economia.awesomeapi.com.br/json/all';

async function coinsFetch() {
  const response = await fetch(coinsUrl);
  const coins = await response.json();
  return coins;
}

export default coinsFetch;
