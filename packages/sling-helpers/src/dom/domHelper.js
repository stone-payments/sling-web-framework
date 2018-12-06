export { makeRequest } from './makeRequest.js';

export const waitUntilEvent = (name, domEl = document) =>
  new Promise((resolve) => {
    const handleEvent = () => {
      domEl.removeEventListener(name, handleEvent);
      resolve();
    };
    domEl.addEventListener(name, handleEvent);
  });

export const waitUntilTagIsAppended = (name, domEl) =>
  new Promise((resolve) => {
    let observer;

    const handleMutations = (mutations) => {
      mutations.forEach((mutation) => {
        const $child = Array
          .from(mutation.addedNodes)
          .find(node => node.tagName
            && node.tagName.toLowerCase() === name);

        if ($child != null) {
          observer.disconnect();
          resolve($child);
        }
      });
    };

    observer = new MutationObserver(handleMutations);

    observer.observe(domEl, {
      childList: true,
      subtree: true,
    });
  });

export const registerComponent = (name, DefinitionClass) => {
  if (window.customElements.get(name) == null) {
    window.customElements.define(name, DefinitionClass);
  }
};

export const setAttr = (domEl, attrName, value) => {
  if (value != null && value !== false) {
    domEl.setAttribute(attrName, '');
  } else {
    domEl.removeAttribute(attrName);
  }
};
