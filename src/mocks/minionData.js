export const mockTasks = [
  {
    id: 1,
    name: 'Code Review Assistant',
    description: 'AI agent that helps review code changes and suggest improvements',
    status: 'completed',
    context: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

function applyDiscount(total, discountCode) {
  if (discountCode === 'SAVE10') {
    return total * 0.9;
  }
  return total;
}

// Main function
function checkout(items, discountCode) {
  const total = calculateTotal(items);
  return applyDiscount(total, discountCode);
}`,
    query: "What improvements can be made to this code?",
    results: {
      suggestions: [
        'Consider adding error handling in the calculateTotal function',
        'The applyDiscount function should validate the discount code format',
        'Add type checking or JSDoc annotations for better maintainability'
      ],
      answer: "This code needs several improvements: error handling for invalid inputs, validation for the discount code, and better type annotations. It could also benefit from using modern JavaScript methods like reduce() instead of for loops.",
      timeSpent: '2.5 minutes'
    },
    config: {
      provider: 'openai',
      localModel: 'llama3.2',
      remoteModel: 'gpt-4o',
      protocol: 'minion'
    }
  },
  {
    id: 2,
    name: 'Documentation Generator',
    description: 'Generate comprehensive documentation from codebase',
    status: 'running',
    context: `class AuthService {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.token = null;
  }

  async login(username, password) {
    try {
      const response = await this.apiClient.post('/auth/login', { username, password });
      this.token = response.data.token;
      localStorage.setItem('auth_token', this.token);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated() {
    return !!this.token;
  }
}`,
    query: "Generate JSDoc documentation for this AuthService class",
    results: null,
    config: {
      provider: 'anthropic',
      localModel: 'phi3',
      remoteModel: 'claude-3-opus',
      protocol: 'minions'
    }
  },
  {
    id: 3,
    name: 'Security Audit',
    description: 'Analyze codebase for potential security vulnerabilities',
    status: 'pending',
    context: `app.post('/api/users', (req, res) => {
  const { username, password } = req.body;
  
  // Create new user
  db.query(
    \`INSERT INTO users (username, password) VALUES ('\${username}', '\${password}')\`, 
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.status(201).json({ id: result.insertId, username });
    }
  );
});

app.get('/api/data', (req, res) => {
  const query = req.query.search;
  
  // Search for data
  db.query(
    \`SELECT * FROM data WHERE content LIKE '%\${query}%'\`, 
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json(results);
    }
  );
});`,
    query: "Identify security vulnerabilities in this Express.js code",
    results: null,
    config: {
      provider: 'openai',
      localModel: 'mistral',
      remoteModel: 'gpt-4o',
      protocol: 'minion'
    }
  }
]; 