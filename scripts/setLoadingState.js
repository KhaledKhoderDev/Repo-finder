import { loaderElement } from './elements';
import setSearchResult from './setSearchResults';

export default function setLoadingState(loadingState) {
  loaderElement.classList.toggle('hidden', !loadingState);
  loadingState && setSearchResult(null);
}
