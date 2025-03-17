import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MOCK_CONVERSATIONS } from '../../../constants/MOCK_CONVERSATIONS';

export const fetchConversations = createAsyncThunk(
    'conversations/fetchAll',
    async () => {
        //  API call later
        return MOCK_CONVERSATIONS;
    }
);

const conversationSlice = createSlice({
    name: 'conversations',
    initialState: {
        items: [],
        activeConversation: null,
        searchQuery: '',
        status: 'idle',
        error: null
    },
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        addConversation: (state, action) => {
            state.items.unshift(action.payload);
        }
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
                state.error = action.error.message;
            });
    }
});

export const { setActiveConversation, setSearchQuery, addConversation } = conversationSlice.actions;
export default conversationSlice.reducer;