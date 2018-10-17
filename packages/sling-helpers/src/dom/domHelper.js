export const waitUntilEvent = (name, $el = document) =>
  new Promise((resolve) => {
    const handleEvent = () => {
      $el.removeEventListener(name, handleEvent);
      resolve();
    };
    $el.addEventListener(name, handleEvent);
  });

export const waitUntilTagIsAppended = (name, $el) =>
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

    observer.observe($el, {
      childList: true,
      subtree: true,
    });
  });

export const registerComponent = (name, DefinitionClass) => {
  if (window.customElements.get(name) == null) {
    window.customElements.define(name, DefinitionClass);
  }
};
