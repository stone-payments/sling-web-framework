import { sleep } from 'sling-helpers/src';

import {
  validateField,
  validateForm,
  onValidationStart,
  onValidationComplete,
} from './FormActions.js';

// VALIDATION FUNCTIONS

const validateTakenUsername = value => sleep(200).then(() => {
  if (value === 'admin' || value === 'leofavre' || value === 'user') {
    throw new Error('This username is already taken');
  }
});

const validateRequiredField = value => (!value
  ? 'This field is required'
  : undefined);

const validateGroupedFields = (values) => {
  const errors = {};

  if (!values.phone || (!values.phone.personal && !values.phone.work)) {
    errors.onePhoneMinimum = 'Please enter at least one phone number';
  }

  return errors;
};


// MUST BE IMPLEMENTED

onValidationStart(() => console.log('started'));
onValidationComplete(console.log);


// TYPING SIMULATION

(async () => {
  validateField(validateTakenUsername, 'a', 'name');

  await sleep(30);

  validateField(validateTakenUsername, 'ad', 'name');

  await sleep(30);

  validateField(validateTakenUsername, 'adm', 'name');

  await sleep(30);

  validateField(validateTakenUsername, 'admi', 'name');

  await sleep(30);

  validateField(validateTakenUsername, 'admin', 'name');

  await sleep(300);

  validateField(validateTakenUsername, 'zadmin', 'name');

  await sleep(30);

  validateField(validateRequiredField, '', 'email');

  await sleep(30);

  validateField(validateRequiredField, 'leo', 'email');

  await sleep(30);

  validateField(validateRequiredField, 'leo@leo', 'email');

  await sleep(30);

  validateField(validateRequiredField, 'leo@leofa', 'email');

  await sleep(30);

  validateField(validateRequiredField, 'leo@leofavre', 'email');

  await sleep(30);

  validateForm(validateGroupedFields, {});

  await sleep(300);

  validateForm(validateGroupedFields, { phone: { personal: 'a' } });

  await sleep(30);

  validateForm(validateGroupedFields, { phone: { personal: 'alter' } });

  await sleep(30);

  validateForm(validateGroupedFields, { phone: { personal: 'altern8' } });

  await sleep(30);

  validateForm(validateGroupedFields, { phone: { personal: 'altern8 xpre' } });
})();
