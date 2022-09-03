import Actions from './components/Actions';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Results from './components/Results';

const App = () => {
	return (
		<div className='flex flex-col'>
			<Nav />
			<Actions />
			<Results />
			<Footer />
		</div>
	);
};

export default App;
