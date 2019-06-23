export const flatten = (obj) => {
  const step = (currentKey, into, target) => {
    Object
      .keys(into)
      .forEach((key) => {
        let newKey = key;
        const newVal = into[key];

        if (currentKey.length > 0) {
          const endKey = Number.isNaN(Number(key)) ? key : `[${key}]`;
          newKey = `${currentKey}.${endKey}`.replace('.[', '[');
        }

        if (typeof newVal === 'object') {
          step(newKey, newVal, target);
        } else {
          target[newKey] = newVal;
        }
      });
  };

  const result = {};
  step('', obj, result);
  return result;
};
