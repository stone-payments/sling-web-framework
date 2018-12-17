import CancelablePromise from 'bluebird';

CancelablePromise.config({
  cancellation: true,
});

export const cancelableDelay = delay => new CancelablePromise((resolve) => {
  setTimeout(resolve, delay);
});
