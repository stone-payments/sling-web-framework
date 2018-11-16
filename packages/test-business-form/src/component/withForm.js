export const withForm = Base => class extends Base {
  constructor() {
    super();
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.formState = {
      initialValues: {},
      errors: {},
      values: {},
      touched: {},
      focused: {},
      dirty: false,
      isValid: false,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('formupdate', this.handleFormUpdate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.removeEventListener('formupdate', this.handleFormUpdate);
  }

  handleFormUpdate({ detail }) {
    this.formState = detail;
  }
};
