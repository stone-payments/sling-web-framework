export const getViewCssVariant = (view, element) => {
  let cssClass = `emd-state-wrapper__${element}`;
  cssClass += view ? ` emd-state-wrapper__${element}_view_${view}` : '';
  return cssClass;
};
