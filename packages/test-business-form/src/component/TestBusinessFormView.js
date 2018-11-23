import { html } from 'sling-framework';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-button';

export const TestBusinessFormView = ({
  values = {},
  errors = {},
  touched = {},
  isValid,
  isValidating,
  isSubmitting,
  validateRequiredField,
  validateTakenUsername,
  validateRequiredEmail,
  validateOptionalPhone,
  validateForm,
  handleFormUpdate,
  handleFormSubmission,
}) => {
  return html`
    <sling-form
      validation="${validateForm}"
      onformupdate="${handleFormUpdate}"
      onformsubmit="${handleFormSubmission}">
      <label>
        <h4>Apelido</h4>
        <sling-input
          name="username"
          type="text"
          value="${values.username}"
          validation="${validateRequiredField}"></sling-input>
      </label>

      ${touched.username && errors.username ? html`
        <p>${errors.username}</p>
      ` : ''}

      <label>
        <h4>E-mail</h4>
        <sling-input
          name="email"
          type="email"
          value="${values.email}"
          validation="${validateRequiredEmail}"></sling-input>
      </label>

      ${touched.email && errors.email ? html`
        <p>${errors.email}</p>
      ` : ''}

      <h4>Telefone(s)</h4>

      ${touched.phone && touched.phone.work && errors.onePhoneMinimum ? html`
        <p>${errors.onePhoneMinimum}</p>
      ` : ''}

      <label>
        <span>Pessoal</span>
        <sling-input
          name="phone.personal"
          type="phone"
          value="${values.phone && values.phone.personal}"
          validation="${validateOptionalPhone}"></sling-input>
      </label>

      ${touched.phone && touched.phone.personal && errors.phone && errors.phone.personal ? html`
        <p>${errors.phone.personal}</p>
      ` : ''}

      <label>
        <span>Trabalho</span>
        <sling-input
          name="phone.work"
          type="phone"
          value="${values.phone && values.phone.work}"
          validation="${validateOptionalPhone}"></sling-input>
      </label>

      ${touched.phone && touched.phone.work && errors.phone && errors.phone.work ? html`
        <p>${errors.phone.work}</p>
      ` : ''}

      <sling-button
        type="submit"
        disabled="${!isValid || isSubmitting}">
        Enviar
      </sling-button>
    </sling-form>
  `;
};
