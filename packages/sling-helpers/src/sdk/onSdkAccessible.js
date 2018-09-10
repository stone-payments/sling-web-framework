import * as domHelper from '../dom/domHelper.js';

export const onSdkAccessible = async () => {
  const { waitUntilEvent, waitUntilTagIsAppended } = domHelper;

  if (document.body == null) {
    await waitUntilEvent('DOMContentLoaded');
  }

  let $sdk = document.querySelector('slung-sdk-connect');

  if ($sdk == null) {
    $sdk = await waitUntilTagIsAppended('slung-sdk-connect', document.body);
  }

  if ($sdk.store == null) {
    await waitUntilEvent('storecreated', document);
  }

  return $sdk;
};
