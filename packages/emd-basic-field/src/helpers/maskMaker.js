import iMask from 'imask';

// This monkey patch fixes the way iMask detects if an input is currently
// active since, in our case, we must look for the shadowRoot.activeElement
// and not the document.activeElement.

Object.defineProperty(iMask.HTMLMaskElement.prototype, 'isActive', {
  get () {
    const rootElement = this.input.getRootNode
      ? this.input.getRootNode() || document
      : document;

    return this.input === rootElement.activeElement;
  }
});

export const maskMaker = config => domEl => iMask(domEl, config);
