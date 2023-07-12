const listContainer = document.getElementById('list-container');
const loadingIndicator = document.getElementById('loading-indicator');
const notification = document.getElementById('notification');
let currentPage = 1;

const fetchData = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/exchange_rates?page=${currentPage}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const createCard = (name, rate) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const nameElement = document.createElement('div');
  nameElement.classList.add('name');
  nameElement.textContent = name;

  const rateElement = document.createElement('div');
  rateElement.classList.add('rate');
  rateElement.textContent = `Rate: ${rate}`;

  card.appendChild(nameElement);
  card.appendChild(rateElement);

  return card;
};

const appendDataToDOM = (data) => {
  const rates = data.rates;
  rates.forEach((rate) => {
    const card = createCard(rate.name, rate.value);
    listContainer.appendChild(card);
  });
};

const loadMoreData = async () => {
  loadingIndicator.classList.remove('hidden');
  const data = await fetchData();
  loadingIndicator.classList.add('hidden');

  if (data.rates.length > 0) {
    appendDataToDOM(data);
    currentPage++;
  } else {
    notification.classList.remove('hidden');
  }
};

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMoreData();
  }
});

loadMoreData();
