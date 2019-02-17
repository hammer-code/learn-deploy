const ENDPOINT_BASE_URL = getEndpointBaseUrl();

function getEndpointBaseUrl () {
  const hostname = window.location.hostname;
  const isDev = hostname === 'localhost';

  return isDev
    ? 'http://localhost:8080'
    : 'https://meatup-ijal-api.now.sh';
}
