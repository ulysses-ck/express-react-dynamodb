import React from 'react';
import '../styles/input.css';

import { useAddLanguageMutation } from '../services/languages';

import { v4 as uuidv4 } from 'uuid';

const FormCreate = () => {
	const [trigger, result] = useAddLanguageMutation();

	const { isSuccess, isLoading } = result;

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const formElement = document.forms[0];
		const formData = new FormData(formElement);
		const postData = {
			Id: { S: uuidv4() },
			ProgrammingLanguage: { S: formData.get('language') as string },
			Info: {
				M: {
					Designer: { S: formData.get('designer') as string },
					Year: { S: formData.get('year') as string },
				},
			},
			IsActive: {
				BOOL: formData.get('isactive') === 'on' ? true : false,
			},
		};
		console.log(postData);
		trigger(postData);
	};

	return (
		<div className='flex flex-col m-2'>
			<h2 className='text-4xl text-center p-2 m-2'>
				{isSuccess ? 'Success' : isLoading ? 'Loading' : 'Add language'}
			</h2>
			<form
				className='flex flex-col justify-center w-96 content-center items-center p-2'
				action=''
				method='post'
				id='addlanguage'
				name='addlanguage'
			>
				<div className='w-full p-2'>
					<label htmlFor='language' className='w-full block px-4'>
						Name
					</label>
					<input
						type='text'
						id='language'
						name='language'
						placeholder='ABC'
						className='border-b-2 w-full bg-sky-100 appearance px-4 py-2'
					/>
				</div>

				<div className='w-full p-2'>
					<label htmlFor='designer' className='w-full block px-4'>
						Designer
					</label>
					<input
						type='text'
						id='designer'
						name='designer'
						placeholder='Leo Geurts, Lambert Meertens, Steven Pemberton'
						className='border-b-2 w-full  bg-sky-100 appearance px-4 py-2'
					/>
				</div>

				<div className='w-full p-2'>
					<label htmlFor='year' className='w-full block px-4'>
						Year
					</label>
					<input
						type='text'
						id='year'
						name='year'
						placeholder='1987'
						className='border-b-4 w-full bg-sky-100 appearance px-4 py-2'
					/>
				</div>
				<div className='w-full p-2 flex flex-row content-around border-2 rounded-md mt-2'>
					<input
						type='checkbox'
						id='isactive'
						name='isactive'
						className='w-full bg-sky-100 mx-4 my-2'
						defaultChecked
					/>
					<label htmlFor='isactive' className='w-full px-4 py-2'>
						is Active?
					</label>
				</div>
				<button
					className='m-4 border-2 rounded-md border-sky-200 w-32 self-center p-2 hover:bg-sky-400 hover:text-sky-50'
					onClick={handleSubmit}
					type='submit'
				>
					Add
				</button>
			</form>
		</div>
	);
};

export default FormCreate;
