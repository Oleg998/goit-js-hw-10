import { fetchCatByBreed, fetchBreeds } from './js/сatLibrary';
const breedSelect = document.querySelector('.breed-select');
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector(' .lds-hourglass ');

function showSelect() {
  breedSelect.style.display = 'block';
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
    console.log(err);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
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
      console.log(err);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
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
