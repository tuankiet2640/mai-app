import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sample data for conversations
const sampleConversations = [
  {
    id: '1',
    title: 'Help with JavaScript promises',
    preview: 'Can you explain how async/await works?',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
  },
  {
    id: '2',
    title: 'React component optimization',
    preview: 'I need to improve performance in my app',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    title: 'CSS Grid layout help',
    preview: 'How do I create a responsive grid?',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

// Async thunk for fetching conversations
export const fetchConversations = createAsyncThunk(
  'conversations/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just return our sample data after a short delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return sampleConversations;
    } catch (error) {
      return rejectWithValue('Failed to fetch conversations');
    }
  }
);

const initialState = {
  items: sampleConversations,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  activeConversation: null,
  searchQuery: '',
};

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addConversation: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateConversation: (state, action) => {
      const index = state.items.findIndex(conv => conv.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteConversation: (state, action) => {
      state.items = state.items.filter(conv => conv.id !== action.payload);
      if (state.activeConversation === action.payload) {
        state.activeConversation = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch conversations';
      });
  },
});

export const {
  setActiveConversation,
  setSearchQuery,
  addConversation,
  updateConversation,
  deleteConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer; 