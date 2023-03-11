import { Notify } from 'notiflix';
export { fetchCountries };

function fetchCountries(name) {
    return fetch(
        `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`
        ).then(response => {
            if (!response.ok) {
                return Notify.failure(
                    'Oops, there is no country with that name.'
                    );
                }
                return response.json();
            });
        };