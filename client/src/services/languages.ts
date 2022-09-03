// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ILanguage } from '../types/LanguageType';

interface IItemsArray {
	Items: ILanguage[];
}

// Define a service using a base URL and expected endpoints
export const languagesApi = createApi({
	reducerPath: 'languagesApi',
	baseQuery: fetchBaseQuery({
		// your url
		baseUrl: 'http://localhost:3000/',
	}),
	endpoints: (builder) => ({
		getLanguageByName: builder.query<IItemsArray, string>({
			query: (name) => `getLanguageByName?ProgrammingLanguage=${name}`,
		}),
		addLanguage: builder.mutation<ILanguage, Partial<ILanguage>>({
			query: (postData) => ({
				url: 'addLanguage',
				method: 'POST',
				body: postData,
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetLanguageByNameQuery,
	useLazyGetLanguageByNameQuery,
	usePrefetch,
	useAddLanguageMutation,
} = languagesApi;
