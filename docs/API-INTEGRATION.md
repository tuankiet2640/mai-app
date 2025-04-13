# API Integration Guide for Analytics Dashboard

This document provides instructions for transitioning from mock data to real API endpoints for the Mai App Analytics Dashboard.

## Environment Configuration

The Mai App already has the necessary environment configuration for smoothly transitioning between mock data and real APIs:

```
# API Configuration
# Mode can be 'mock' or 'production'
REACT_APP_API_MODE=mock

# Base URL for production API (only used when API_MODE=production)
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

To switch from mock data to a real API:

1. Change `REACT_APP_API_MODE` to `production` in your `.env` file
2. Ensure `REACT_APP_API_BASE_URL` points to your actual backend API endpoint

## Analytics Service Implementation

The `analyticsService.js` file has been created to work with both mock data and real API endpoints. It automatically uses the appropriate data source based on your environment configuration:

```javascript
// src/services/analyticsService.js
import axios from 'axios';
import {
  getSystemMetrics as getMockSystemMetrics,
  getModelUsage as getMockModelUsage,
  getKnowledgeBaseUsage as getMockKnowledgeBaseUsage,
  getUserActivity as getMockUserActivity,
  getSystemLogs as getMockSystemLogs
} from '../mock-data/analytics';

// Get environment configuration
const API_MODE = process.env.REACT_APP_API_MODE || 'mock';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authentication interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Analytics service methods that work with both mock and real data
export const analyticsService = {
  getSystemMetrics: async (params = {}) => {
    if (API_MODE === 'mock') {
      return getMockSystemMetrics(params);
    }
    
    try {
      const response = await apiClient.get('/analytics/system-metrics', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      throw error;
    }
  },
  
  // Other service methods follow same pattern...
};

export default analyticsService;
```

## Required Backend API Endpoints

To work with the real API mode, your backend needs to implement these endpoints:

| Endpoint | Method | Description | Query Parameters |
|----------|--------|-------------|------------------|
| `/analytics/system-metrics` | GET | Get system performance metrics | `days` (number of days to return) |
| `/analytics/model-usage` | GET | Get model usage statistics | `days`, `model_id` (optional) |
| `/analytics/kb-usage` | GET | Get knowledge base usage | `days`, `kb_id` (optional) |
| `/analytics/user-activity` | GET | Get user activity statistics | `days` |
| `/analytics/system-logs` | GET | Get system logs | `page`, `limit`, `level`, `service` |

## Expected API Response Formats

Your backend API endpoints should return data in the same format as the mock data to ensure compatibility. The expected formats are:

### System Metrics

```json
{
  "days": 30,
  "metrics": [
    {
      "date": "2025-03-15",
      "metrics": {
        "request_count": 1250,
        "avg_response_time_ms": 345,
        "error_rate_percent": 0.5,
        "token_usage": 85000,
        "active_users": 75,
        "concurrent_sessions": 25
      }
    }
  ]
}
```

### Model Usage

```json
{
  "days": 30,
  "models": [
    {
      "model_id": "gpt-4",
      "total_tokens": 2500000,
      "total_requests": 12500,
      "avg_tokens_per_request": 200,
      "usage_by_day": [
        {
          "date": "2025-03-15",
          "requests": 415,
          "tokens": 83000
        }
      ]
    }
  ]
}
```

### Knowledge Base Usage

```json
{
  "days": 30,
  "knowledge_bases": [
    {
      "kb_id": "kb-1",
      "total_queries": 8500,
      "total_retrievals": 25500,
      "relevance_score": 0.85,
      "usage_by_day": [
        {
          "date": "2025-03-15",
          "queries": 285,
          "retrievals": 855,
          "relevance": 0.82
        }
      ]
    }
  ]
}
```

### User Activity

```json
{
  "days": 30,
  "activity": {
    "new_users": [
      {
        "date": "2025-03-15",
        "count": 12
      }
    ],
    "active_users": [
      {
        "date": "2025-03-15",
        "total": 150,
        "returning": 138
      }
    ],
    "user_engagement": [
      {
        "date": "2025-03-15",
        "avg_session_minutes": 18.5,
        "avg_interactions": 25.3
      }
    ]
  }
}
```

### System Logs

```json
{
  "logs": [
    {
      "id": "log-1234",
      "timestamp": "2025-03-15T14:32:15.000Z",
      "level": "INFO",
      "service": "chat-service",
      "message": "Request processed successfully",
      "details": null
    }
  ],
  "pagination": {
    "total": 1250,
    "page": 1,
    "limit": 20,
    "pages": 63
  }
}
```

## Development Workflow

1. During development, keep `REACT_APP_API_MODE=mock` to work with mock data
2. Implement your backend API endpoints following the expected response formats
3. When ready to test with real data, switch to `REACT_APP_API_MODE=production`
4. For production deployment, ensure `.env` is configured with `REACT_APP_API_MODE=production`

This approach allows for seamless development and testing, with the ability to easily switch between mock and real API data.
