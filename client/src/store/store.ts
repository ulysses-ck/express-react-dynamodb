import { configureStore } from '@reduxjs/toolkit';
import { languagesApi } from '../services/languages';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
	reducer: {
		language: languageReducer,

		// RTK Query reducer
		[languagesApi.reducerPath]: languagesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(languagesApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
