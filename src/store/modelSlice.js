import { createSlice } from '@reduxjs/toolkit';

const models = [
    { label: 'GPT-4', id: 'gpt-4' },
    { label: 'GPT-3.5 Turbo', id: 'gpt-3.5-turbo' },
    { label: 'Claude 3 Opus', id: 'claude-opus' },
    { label: 'Claude 3 Sonnet', id: 'claude-sonnet' },
    { label: 'Claude 3 Haiku', id: 'claude-haiku' },
];

const initialState = {
    availableModels: models,
    selectedModel: models[0], // Default to GPT-4
};

const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        setSelectedModel: (state, action) => {
            const modelId = action.payload;
            const model = state.availableModels.find(m => m.id === modelId);
            if (model) {
                state.selectedModel = model;
            }
        },
        addModel: (state, action) => {
            const newModel = action.payload;
            if (!state.availableModels.some(m => m.id === newModel.id)) {
                state.availableModels.push(newModel);
            }
        },
        removeModel: (state, action) => {
            const modelId = action.payload;
            state.availableModels = state.availableModels.filter(m => m.id !== modelId);
            
            // If the selected model is removed, default to the first available model
            if (state.selectedModel.id === modelId && state.availableModels.length > 0) {
                state.selectedModel = state.availableModels[0];
            }
        }
    }
});

export const { setSelectedModel, addModel, removeModel } = modelSlice.actions;

export default modelSlice.reducer; 