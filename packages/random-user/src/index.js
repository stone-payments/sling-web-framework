import { SlingElement, html, withRequest, withSetState } from 'sling-framework';

class RandomUser extends withSetState(withRequest(SlingElement)) {
  constructor() {
    super();
    this.state = {
      name: '',
      picture: null,
    };
  }

  static get properties() {
    return {
      state: {
        type: Object,
        reflectToAttribute: false,
      },
      isLoading: {
        type: Boolean,
        reflectToAttribute: false,
      },
      requestErrors: {
        type: Array,
        reflectToAttribute: false,
      },
    };
  }

  static get requestParamNames() {
    return ['nat'];
  }

  requestParamsChangedCallback(requestParams) {
    if (requestParams.nat != null) {
      this.fetchUser(requestParams);
    }
  }

  fetchUser({ nat }) {
    this
      .request(window.fetch(`https://randomuser.me/api/?nat=${nat}`))
      .then(async (response) => {
        const data = await response.json();
        const [user] = data.results;

        this.setState({
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.large,
        });
      });
  }

  render() {
    return html`
      <style>
        img { width: 128px; height: 128px; }
      </style>
      ${this.requestErrors.length > 0 ? html`
        <ul>
          ${this.requestErrors.map(error => html`<li>${error}</li>`)}
        </ul>
      ` : ''}
      <div>
        ${this.isLoading ? html`<p><em>loading</em></p>` : ''}
        ${this.state.picture ? html`<img src="${this.state.picture}">` : ''}
        <h4>${this.state.name}</h4>
      </div>
    `;
  }
}

window.customElements.define('random-user', RandomUser);
