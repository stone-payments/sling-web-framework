export const registerComponent = (name, fn) => {
  if (customElements && customElements.get && !customElements.get(name)) {
    customElements.define(name, fn);
  }
};
