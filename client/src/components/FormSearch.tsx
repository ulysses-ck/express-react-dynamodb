import { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addLanguage } from '../features/language/languageSlice';

import { useLazyGetLanguageByNameQuery } from '../services/languages';
import { RootState } from '../store/store';

const FormSearch = () => {
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const inputElement = useRef<HTMLInputElement>(null);

	const languages = useSelector((state: RootState) => state.language.Items);
	const arrIds = languages.map((el) => el.Id.S);

	const [trigger, result] = useLazyGetLanguageByNameQuery({
		pollingInterval: 0,
		refetchOnFocus: false,
		refetchOnReconnect: false,
	});
	const { data } = result;

	const handleClick = () => {
		const value = inputElement.current?.value!;
		if (value) {
			setSearch(value);
			trigger(encodeURIComponent(value), true);
			data?.Items.forEach((el) => {
				if (!arrIds.includes(el.Id.S)) {
					dispatch(addLanguage(el));
				}
			});
		}
	};

	return (
		<div className='flex flex-col m-2'>
			<h2 className='text-4xl text-center p-2 m-2'>
				{search ? search : 'Search'}
			</h2>
			<div className='flex flex-col justify-center content-center items-center p-2 w-96'>
				<div className='w-full p-2'>
					<label
						htmlFor='name-language'
						className='w-full block px-4'
					>
						Name
					</label>
					<input
						type='text'
						id='name-language'
						name='name-language'
						ref={inputElement}
						placeholder='Javascript'
						className='box-border border-b-2 w-full bg-sky-100 appearance-none appearance px-4 py-2'
					/>
				</div>
				<button
					className='m-4 border-2 rounded-md border-sky-200 w-32 self-center p-2 hover:bg-sky-400 hover:text-sky-50'
					onClick={handleClick}
				>
					Search
				</button>
			</div>
		</div>
	);
};

export default FormSearch;
