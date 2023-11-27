import { fetchCatByBreed, fetchBreeds } from './js/cat-api';
const breedSelect = document.querySelector('.breed-select');
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector(' .lds-hourglass ');
const error = document.querySelector(".error")

function showSelect() {
  breedSelect.style.display = 'flex';
}

function hideSelect() {
  breedSelect.style.display = 'none';
}
function showLoader() {
  loader.style.display = 'block';
  catInfo.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  catInfo.style.display = 'flex ';
}

function showEroor(){
  loader.style.display = 'none';
  Notiflix.Notify.warning(error.textContent);
}

error.style.display="none"
hideSelect();
showLoader();

fetchBreeds()
  .then(data => {
    breedSelect.insertAdjacentHTML('beforeend', createSelector(data));
    hideLoader();
    showSelect();
    new SlimSelect({ select: breedSelect });
  })
  .catch(err => {
    showEroor()
    
  });

function createSelector(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

breedSelect.addEventListener('change', setOutput);



function setOutput(evt) {
  const breedId = evt.target.value;
  showLoader();
  fetchCatByBreed(breedId)
    .then(data => {
      catInfo.innerHTML = createInfo(data);
      hideLoader();
    })
    .catch(err => {
      showEroor()
    });
}


function createInfo(array) {
  return array
    .map(
      ({
        id,
        url,
        breeds: [{ name, description, temperament }],
      }) => ` <img class="image" src="${url}" alt="${id}">
      <div class="content"> <h1>${name}</h1
    <p>${description}</p>
    <p><b>Temperament:</b>${temperament}</p></div>
    `
    )
    .join('');
}
