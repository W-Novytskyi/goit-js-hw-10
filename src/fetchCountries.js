import Notiflix from 'notiflix';

export default { fetchCountries };
function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`
  ).then(response => {
    if (!response.ok) {
      return Notiflix.Notify.warning('Oops, there is no country with that name.');
    }
    return response.json();
  });
};