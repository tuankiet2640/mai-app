import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ragService from '../../services/ragService';

// Thunk to fetch all KBs
export const fetchKnowledgeBases = createAsyncThunk(
  'rag/fetchKnowledgeBases',
  async (_, { rejectWithValue }) => {
    try {
      return await ragService.listKnowledgeBases();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to query a KB
export const queryKnowledgeBase = createAsyncThunk(
  'rag/queryKnowledgeBase',
  async ({ kbId, query }, { rejectWithValue }) => {
    try {
      return await ragService.queryKnowledgeBase(kbId, query);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ragSlice = createSlice({
  name: 'rag',
  initialState: {
    knowledgeBases: [],
    kbStatus: 'idle',
    kbError: null,
    lastQuery: null,
    lastAnswer: null,
    queryStatus: 'idle',
    queryError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch KBs
      .addCase(fetchKnowledgeBases.pending, (state) => {
        state.kbStatus = 'loading';
        state.kbError = null;
      })
      .addCase(fetchKnowledgeBases.fulfilled, (state, action) => {
        state.kbStatus = 'succeeded';
        state.knowledgeBases = action.payload;
      })
      .addCase(fetchKnowledgeBases.rejected, (state, action) => {
        state.kbStatus = 'failed';
        state.kbError = action.payload;
      })
      // Query KB
      .addCase(queryKnowledgeBase.pending, (state) => {
        state.queryStatus = 'loading';
        state.queryError = null;
      })
      .addCase(queryKnowledgeBase.fulfilled, (state, action) => {
        state.queryStatus = 'succeeded';
        state.lastAnswer = action.payload;
      })
      .addCase(queryKnowledgeBase.rejected, (state, action) => {
        state.queryStatus = 'failed';
        state.queryError = action.payload;
      });
  }
});

export default ragSlice.reducer;
