import '../src/index.js';

const options = [
  'Daft Punk Is Playing At My House',
  'Dance Yrself Clean',
  'Get Innocuous!',
  'Home',
  'I Can Change',
  'Sound Of Silver'
];

Array
  .from(document.querySelectorAll('emd-select'))
  .forEach(element => {
    element.options = options;
  });

document
  .querySelector('emd-select[autoselectsingle]')
  .options = [options[3]];

const programmaticSelect = document.createElement('emd-select');
programmaticSelect.options = options;
programmaticSelect.value = 'Get Innocuous!';
document.body.appendChild(programmaticSelect);
