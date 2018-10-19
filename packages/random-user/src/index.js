import { SlingElement, html, withRequest } from 'sling-framework';

class RandomUser extends withRequest(SlingElement) {
  static get requestParamNames() {
    return ['nat'];
  }

  static get properties() {
    return {
      user: {
        type: Object,
        reflectToAttribute: false,
      },
    };
  }

  fetchUser({ nat }) {
    this.request([
      fetch(`https://randomuser.me/api/?nat=${nat}`),
    ]).then((data) => {
      this.user = data;
    }).catch((err) => {
      console.log(err);
    });
  }

  requestParamsChangedCallback({ nat }) {
    if (nat != null) {
      this.fetchUser({ nat });
    }
  }

  render() {
    return html`
      ${this.isLoading}
      ${JSON.stringify(this.user)}
    `;
  }
}

window.customElements.define('random-user', RandomUser);
