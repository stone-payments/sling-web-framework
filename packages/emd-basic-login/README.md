# Login

Login component with two steps: e-mail entry and password entry.

## Usage

```
npm install @stone-payments/emd-basic-login
```

```js
import '@stone-payments/emd-basic-login';
```

```html
<emd-login></emd-login>

<emd-login email="some.email@stone.com.br" step="2"></emd-login>
```

## Attributes and Properties

#### `email`

Controls the user e-mail.

- Type: String
- Attribute and property

#### `step`

Controls navigation steps: `1` for e-mail and `2` for password.

- Type: Number
- Attribute and property

## Events

#### `forgotemail`

Dispatched when the `Esqueci meu e-mail` button is clicked.

- Detail: `null`

#### `forgotpassword`

Dispatched when the `Esqueci minha senha` button is clicked.

- Detail: `null`

#### `emailsubmitsuccess`

Dispatched when the user successfully enters their e-mail on the first step and then clicks the `Próximo` button.

- Detail:

```javascript
{
  email: 'some.email@stone.com.br'
}
```

#### `passwordsubmitsuccess`

Dispatched when the user successfully enters their e-mail and password on the first and second steps and then clicks the `Entrar` button.

- Detail:

```javascript
{
  email: 'some.email@stone.com.br',
  password: 'some.password'
}
```

## Methods

#### `nextStep()`

The `nextStep()` method should be called after `emailsubmitsuccess` and `passwordsubmitsuccess` to continue the user flow.

```javascript
const login = document.querySelector('emd-login');

login.addEventListener('emailsubmitsuccess', async evt => {
  const { email } = evt.detail;
  await doSomethingWith(email);
  evt.target.nextStep();
});
```

#### `quit()`

If something goes wrong after `emailsubmitsuccess` or `passwordsubmitsuccess`, the `quit()` method should be called to finish the loading process.

```javascript
const login = document.querySelector('emd-login');

login.addEventListener('emailsubmitsuccess', async evt => {
  const { email } = evt.detail;

  try {
    await doSomethingWith(email);
    evt.target.nextStep();
  } catch (err) {
    evt.target.quit();
  }
});
```

## Slots

#### Default

Allows the developer to change the `Acesse Sua Conta` message.
