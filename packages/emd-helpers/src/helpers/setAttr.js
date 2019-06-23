export const setAttr = (domEl, attrName, attrValue) => {
  if (!attrValue && attrValue !== 0 && attrValue !== '') {
    domEl.removeAttribute(attrName);
  } else {
    const parsedAttribute = (attrValue === true) ? '' : attrValue;
    domEl.setAttribute(attrName, parsedAttribute);
  }
};
