import { buttonElement, searchInput, usersInputElement } from './elements.js';
import { performSearch } from './performSearch.js';

buttonElement.addEventListener('click', e => {
  e.preventDefault();
  performSearch(searchInput.value, usersInputElement.checked);
});
