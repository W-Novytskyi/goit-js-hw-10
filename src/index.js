import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';


import './css/styles.css';

const DEBOUNCE_DELAY = 300;


const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const inputForm = document.querySelector('#search-box');
