import { getIn, setIn } from 'timm';

export const groupByDeep = (collection = [], ...iteratees) => {
  const paths = collection.map(value => iteratees
    .map(iteratee => iteratee(value)));

  return paths.reduce((result, path, index) => {
    const currentValue = getIn(result, path) || [];
    const nextValue = currentValue.concat([collection[index]]);

    return { ...result, ...setIn(result, path, nextValue) };
  }, {});
};
