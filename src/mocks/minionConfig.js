export const llmProviders = [
  { id: 'openai', name: 'OpenAI' },
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'together', name: 'Together AI' },
  { id: 'perplexity', name: 'Perplexity' },
  { id: 'openrouter', name: 'OpenRouter' },
  { id: 'groq', name: 'Groq' },
  { id: 'deepseek', name: 'DeepSeek' }
];

export const localModels = [
  { 
    id: 'llama3.2', 
    name: 'Llama 3.2',
    provider: 'ollama',
    icon: '🦙'
  },
  { 
    id: 'phi3', 
    name: 'Phi-3',
    provider: 'ollama',
    icon: 'Φ'
  },
  { 
    id: 'mistral', 
    name: 'Mistral',
    provider: 'ollama',
    icon: '🌪️'
  }
];

export const remoteModels = [
  { 
    id: 'gpt-4o', 
    name: 'GPT-4o',
    provider: 'openai',
    icon: '🤖'
  },
  { 
    id: 'claude-3-opus', 
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    icon: '🧠'
  },
  { 
    id: 'gemini-1.5-pro', 
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    icon: '💎'
  }
];

export const protocols = [
  { id: 'minion', name: 'Minion', description: 'Single local model assists a remote model' },
  { id: 'minions', name: 'Minions', description: 'Multiple local models work with a remote model' }
];

export const defaultConfig = {
  provider: 'openai',
  localModel: 'llama3.2',
  remoteModel: 'gpt-4o',
  protocol: 'minion',
  apiKey: '*****',
  temperature: 0.7,
  maxOutputTokens: 1024
}; 