import { showMoreButton } from './elements.js';
import setLoadingState from './setLoadingState.js';
import setSearchResult from './setSearchResults.js';

const USERS_API = 'https://api.github.com/search/users?q=';
let currentSearchTerm = '';
let isUserSelected = true;
let currentPage = 1;
let allResults = [];

export const initializeShowMore = (
  searchTerm,
  userSelected,
  initialResults,
) => {
  currentSearchTerm = searchTerm;
  isUserSelected = userSelected;
  currentPage = 1;
  allResults = initialResults || [];
  showMoreButton.classList.add('hidden');
};

export const loadMoreResults = () => {
  const typeQuery = isUserSelected ? '+type:user' : '+type:org';
  currentPage += 1;
  setLoadingState(true);
  fetch(`${USERS_API}${currentSearchTerm}${typeQuery}&page=${currentPage}`)
    .then(result => {
      if (!result.ok) {
        throw new Error('Failed to load more results');
      }
      return result.json();
    })
    .then(response => {
      if (response.items && response.items.length > 0) {
        allResults = [...allResults, ...response.items];
        setSearchResult(allResults);
        showMoreButton.classList.remove('hidden');
      } else {
        showMoreButton.classList.add('hidden');
        setSearchResult(allResults);
      }
    })
    .catch(() => {
      showMoreButton.classList.add('hidden');
    })
    .finally(() => {
      setLoadingState(false);
    });
};
showMoreButton.addEventListener('click', loadMoreResults);
