import '../src/index.js';

Array
  .from(document.querySelectorAll('emd-pill-select'))
  .forEach(el => {
    el.options = ['Spring Love', 'Summer', 'Fall', 'Winter'];
  });

document
  .getElementById('object-options')
  .options = [
    { value: 'SPR', content: 'Spring Love' },
    { value: 'SUM', content: 'Summer' },
    { value: 'FAL', content: 'Fall' },
    { value: 'WIN', content: 'Winter' }
  ];
