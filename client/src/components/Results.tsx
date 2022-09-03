import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Results = () => {
	const languages = useSelector((state: RootState) => state.language);
	console.log(languages.Items);

	return (
		<div className='flex flex-col m-16 w-2/6 self-center'>
			{languages.Items.length
				? languages.Items.map((language) => (
						<div
							className='p-6 border-2 rounded-md border-cyan-200 shadow-md my-6 flex flex-row justify-between'
							key={language.Id.S}
						>
							<div>
								<p className='text-2xl'>
									{language.ProgrammingLanguage.S}
								</p>
								<p>{language.Info.M.Designer.S}</p>
								<p>{language.Info.M.Year.S}</p>
							</div>
							<span
								className={`w-8 h-8 rounded-full block border-2 ${
									language.IsActive?.BOOL
										? 'bg-green-400 border-green-500'
										: 'bg-red-400 border-red-500'
								}`}
							></span>
						</div>
				  ))
				: ''}
		</div>
	);
};

export default Results;
