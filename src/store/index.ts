import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import { baseApi } from './api/baseApi';
import customChatbotSlice from './slices/customChatbotSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    customChatbot: customChatbotSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['api'],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
