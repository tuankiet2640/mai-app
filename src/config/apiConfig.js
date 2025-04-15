const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';
const AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL || 'http://localhost:8080/api/v1';

const apiConfig = {
  getRagBaseUrl: () => API_BASE_URL,
  getAuthBaseUrl: () => AUTH_BASE_URL,
};

export default apiConfig;
