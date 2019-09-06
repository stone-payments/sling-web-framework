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

const adapters = {
  default ({ value, currency, brand, date }, index, dispatch) {
    return [
      `<emd-date date="${date}" format="DD/MM [às] HH[h]mm" />`,
      `<emd-brand-icon icon="${brand}" @click="${dispatch('icon')}" />`,
      `<emd-money value="${value}" currency="${currency}" />`
    ];
  }
};

const styles = {
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

const stringifyStyle = style => {
  if (typeof style !== 'object') {
    return '';
  }

  const max = Math.max(...Object.values(style).map(arr => arr.length));

  return Array(max).fill().map((item, index) => {
    return Object
      .entries(style)
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
  adapters,
  styles,
  chooseAdapter,
  chooseStyle
}) => {
  return rows.map((row, index) => {
    const adapterKey = getKey(adapters, chooseAdapter, row, index);
    const styleKey = getKey(styles, chooseStyle, row, index);

    const adapter = adapters && typeof adapters[adapterKey] === 'function'
      ? adapters[adapterKey]
      : Object.keys;

    const stringifiedStyles = typeof styles === 'object'
      ? stringifyStyle(styles[styleKey])
      : '';

    return adapter(row, index, makeDispatch)
      .map((cellContent, cellIndex) => {
        const cellStyle = stringifiedStyles[cellIndex];

        return cellStyle != null
          ? `<td style="${cellStyle}">${cellContent}</td>`
          : `<td>${cellContent}</td>`;
      });
  });
};

const chooseAdapter = () => 'default';

const chooseStyle = () => 'default';

renderContent({
  rows,
  styles,
  chooseStyle,
  adapters,
  chooseAdapter
}); // ?

export const mock = [
  'titles',
  'headerAdapter',
  'headerStyle',
  'rows',
  'adapter',
  'adapters',
  'chooseAdapter',
  'styles',
  'styles',
  'chooseStyle'
];
