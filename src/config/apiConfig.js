// Main API base URL for mai-services (user/auth)
const AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL || 'http://localhost:8080/api/v1';
const RAG_BASE_URL = process.env.REACT_APP_RAG_BASE_URL || 'http://localhost:8000/api/v1';

const apiConfig = {
  getAuthBaseUrl: () => AUTH_BASE_URL,
  getRagBaseUrl: () => RAG_BASE_URL,
};

export default apiConfig;
