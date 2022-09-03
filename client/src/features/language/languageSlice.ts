import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ILanguage } from '../../types/LanguageType';

export interface LanguageState {
	Items: ILanguage[];
}

const initialState: LanguageState = {
	Items: [],
};

export const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		addLanguage: (state, action: PayloadAction<ILanguage>) => {
			state.Items.push(action.payload);
		},
	},
});

export const { addLanguage } = languageSlice.actions;

export default languageSlice.reducer;
