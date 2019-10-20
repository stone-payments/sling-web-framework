import '../src/index.js';

document
  .getElementById('array-options')
  .options = [
    'Spring',
    'Summer',
    'Fall',
    'Winter'
  ];

document
  .getElementById('object-options')
  .options = [
    { value: 'SPR', content: 'Spring' },
    { value: 'SUM', content: 'Summer' },
    { value: 'FAL', content: 'Fall' },
    { value: 'WIN', content: 'Winter' }
  ];
