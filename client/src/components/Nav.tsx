import GithubLogo from './GithubLogo';
import './Nav.css';

const Nav = () => {
	return (
		<nav className='bg-sky-700 flex flex-row justify-between nav'>
			<h2 className='p-4 text-white'>Programming Languages</h2>
			<GithubLogo />
		</nav>
	);
};

export default Nav;
