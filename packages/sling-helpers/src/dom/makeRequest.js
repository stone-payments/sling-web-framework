const defaultStatusChecker = response => response.ok;

const defaultResponseParser = response => response.json();

const defaultBodyParser = body => JSON.stringify(body);

const defaultErrorHandler = error => error;

export const makeRequest =
  (url, requestParams = {}, requestConfig = {}, fetchMaker = fetch) => {
    const {
      statusChecker = defaultStatusChecker,
      responseParser = defaultResponseParser,
      bodyParser = defaultBodyParser,
      errorHandler = defaultErrorHandler,
    } = requestConfig;

    const { body } = requestParams;
    let requestParamsWithParsedBody = requestParams;

    if (body != null) {
      requestParamsWithParsedBody = {
        ...requestParams,
        body: bodyParser(body),
      };
    }

    return fetchMaker(url, requestParamsWithParsedBody)
      .then((response) => {
        if (statusChecker(response) === true) {
          return responseParser(response);
        }
        throw errorHandler(response);
      })
      .catch((error) => {
        throw errorHandler(error);
      });
  };
