import getMessage from './getMessage';
import setLoadingState from './setLoadingState';
import setMessage from './setMessage';
import setSearchResult from './setSearchResults';
import { initializeShowMore } from './showMore.js';

const USERS_API = 'https://api.github.com/search/users?q=';
export const performSearch = (searchTerm, isUserSelected) => {
  getMessage() && setMessage('');
  const typeQuery = isUserSelected ? '+type:user' : '+type:org';
  if (!searchTerm.trim()) {
    setMessage('please fill out the search input field👆');
    return;
  }
  setLoadingState(true);
  fetch(`${USERS_API}${searchTerm}${typeQuery}`)
    .then(result => result.json())
    .then(response => {
      initializeShowMore(searchTerm, isUserSelected, response.items);
      setSearchResult(response.items);
      if (response.items && response.items.length > 0) {
        document.querySelector('.show-more').classList.remove('hidden');
      }
    })

    .finally(() => {
      setLoadingState(false);
    });
};
