import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

class App {
    constructor() {
        this.countryInfo = document.querySelector('.country-info');
        this.countryList = document.querySelector('.country-list');
        this.inputForm = document.querySelector('#search-box');
        this.inputForm.addEventListener('input', debounce(this.onInput.bind(this), DEBOUNCE_DELAY));
    }

    onInput(e) {
        this.cleanAreaMarkup();
        const name = e.target.value.trim();
        if (name === '') return;
        fetchCountries(name)
            .then(countries => {
                if (countries.length > 10) {
                    Notify.info(
                        'Too many matches found. Please enter a more specific name.'
                    );
                } else {
                    if (countries.length === 1) {
                        this.countryMarkupInfo(countries);
                    } else {
                        this.countryMarkupList(countries);
                    }
                }
            })
            .catch(error => {
                Notify.warning(error.message);
            })
            .finally(() => { });
    }

    cleanAreaMarkup() {
        this.countryInfo.innerHTML = '';
        this.countryList.innerHTML = '';
    }

    countryMarkupList(countries) {
        const markup = countries
            .map(({ name, flag }) => {
                return `
                <li>
                <img src="${flag}" alt="${name}" width="25" height="15" />
                <span>${name}</span>
                </li>
                `;
            })
            .join('');
        this.countryList.innerHTML = markup;
        this.countryInfo.innerHTML = '';
    }

    countryMarkupInfo(countries) {
        const markupInfo = countries
            .map(({ name, flag, capital, population, languages }) => {
                return `
                <img src="${flag}" alt="${name}" width="25" height="15" />
                <span>${name}</span>
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p>Languages: ${languages.map(el => el.name).join(', ')}</p>
                `;
            })
            .join('');
        this.countryInfo.innerHTML = markupInfo;
        this.countryList.innerHTML = '';
    }
}

const app = new App();