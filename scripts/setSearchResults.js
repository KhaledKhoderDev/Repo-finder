import { cardsElements } from './elements';

const setSearchResult = data => {
  let result = '';
  if (!data || data.length === 0) {
    result = '<p>No results found</p>';
  } else if (data === null) {
    result = '';
  } else {
    data.map(item => {
      result += `
            <a href="${item.html_url}" target="_blank" rel="noopener noreferrer" class="card-link">
                <article class="card">
                    <img class="img" loading="lazy" src="${item.avatar_url} alt="${item.login}">
                    <h2 class="name">${item.login}</h2>
                </article>
            </a>`;
    });
  }
  cardsElements.innerHTML = result;
};

export default setSearchResult;
