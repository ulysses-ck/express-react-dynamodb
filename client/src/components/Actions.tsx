import React, { useState } from 'react';
import FormCreate from './FormCreate';
import FormSearch from './FormSearch';

const Actions = () => {
	const [view, setView] = useState(false);

	const handleClick = () => {
		setView(!view);
	};

	return (
		<div className='flex flex-col'>
			<button
				onClick={handleClick}
				className='m-4 border-2 rounded-md border-sky-200 w-32 self-center p-2 hover:bg-sky-400 hover:text-sky-50'
			>
				{view ? '- Actions' : '+ Actions'}
			</button>
			{view ? (
				<>
					<div className='container md flex flex-row px-4 justify-center content-center items-start p-4'>
						<FormCreate />
						<FormSearch />
					</div>
					<hr className='bg-black h-0.5 w-5/6 self-center' />
				</>
			) : (
				''
			)}
		</div>
	);
};

export default Actions;
