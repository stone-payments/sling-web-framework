export const rows = [
  {
    date: '2019-03-30T12:25:57.6672005+00:00',
    value: 7.5,
    currency: 'BRL',
    brand: 'elo'
  },
  {
    date: '2019-03-30T12:25:57.5755048+00:00',
    value: 420,
    currency: 'BRL',
    brand: 'mastercard'
  },
  {
    date: '2019-03-30T12:25:57.3247419+00:00',
    value: 40,
    currency: 'BRL',
    brand: 'mastercard'
  },
  {
    date: '2019-03-30T12:25:57.2519149+00:00',
    value: 803.25,
    currency: 'BRL',
    brand: 'mastercard'
  },
  {
    date: '2019-03-30T12:25:56.5328065+00:00',
    value: 82.8,
    currency: 'BRL',
    brand: 'mastercard'
  }
];

const adapter = {
  default ({ value, currency, brand, date }, index, dispatch) {
    return [
      `<emd-date date="${date}" format="DD/MM [às] HH[h]mm" />`,
      `<emd-brand-icon icon="${brand}" @click="${dispatch('icon')}" />`,
      `<emd-money value="${value}" currency="${currency}" />`
    ];
  }
};

const appearance = {
  default: {
    textAlign: [ 'left', 'left', 'left' ],
    borderColor: [ '#909', null, 'rgba(45, 56, 68, 0.1)' ]
  }
};

const makeDispatch = name => `event(${name})`;

const toDashCase = str => str.replace(
  /([A-Z])/g,
  str => `-${str[0].toLowerCase()}`
);

const getMaxCount = namedAppearance => Math
  .max(...Object.values(namedAppearance).map(item => item.length));

const getCellStyles = (namedAppearance) => {
  if (typeof namedAppearance !== 'object') {
    return '';
  }

  const count = getMaxCount(namedAppearance);

  return Array(count).fill().map((item, index) => {
    return Object
      .entries(namedAppearance)
      .reduce((result, [key, values]) => {
        const value = values[index];

        return value != null
          ? `${result} ${[toDashCase(key)]}: ${values[index]};`.trim()
          : result;
      }, '');
  });
};

const getKey = (subject, chooser, row, index) => {
  let result = typeof chooser === 'function'
    ? chooser(row, index)
    : chooser;

  if (result == null && typeof subject === 'object') {
    result = Object.keys(subject)[0];
  }

  return result;
};

const renderContent = ({
  rows,
  adapter,
  appearance,
  chooseAdapter,
  chooseAppearance
}) => {
  return rows.map((row, index) => {
    const adapterKey = getKey(adapter, chooseAdapter, row, index);
    const appearanceKey = getKey(appearance, chooseAppearance, row, index);

    const namedAdapter = adapter && typeof adapter[adapterKey] === 'function'
      ? adapter[adapterKey]
      : Object.keys;

    const styles = appearance
      ? getCellStyles(appearance[appearanceKey])
      : '';

    return namedAdapter(row, index, makeDispatch)
      .map((cell, cellIndex) => {
        const cellStyle = styles[cellIndex];

        return cellStyle != null
          ? `<td style="${styles[cellIndex]}">${cell}</td>`
          : `<td>${cell}</td>`;
      });
  });
};

const chooseAdapter = () => 'default';

const chooseAppearance = () => 'default';

renderContent({
  rows,
  appearance,
  chooseAppearance,
  adapter,
  chooseAdapter
}); // ?
