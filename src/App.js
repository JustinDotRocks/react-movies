import React, { useEffect, useState } from 'react';

import Movies from './components/Movies';

const FEATURED_API =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e63a091cef08c55d4c8870292c4471df&page=1';

const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?&api_key=e63a091cef08c55d4c8870292c4471df&query=';

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(async () => {
		getMovies(FEATURED_API);
	}, []);

	const getMovies = API => {
		fetch(API)
			.then(res => res.json())
			.then(data => {
				setMovies(data.results);
			});
	};

	const handleOnSubmit = e => {
		e.preventDefault();

		if (searchTerm) {
			getMovies(SEARCH_API + searchTerm);

			setSearchTerm('');
		}
	};

	const handleOnChange = e => {
		setSearchTerm(e.target.value);
	};

	return (
		<>
			<header>
				<div>
					<form onSubmit={handleOnSubmit}>
						<input
							className="search"
							type="text"
							placeholder="Search..."
							value={searchTerm}
							onChange={handleOnChange}
						/>
					</form>
				</div>
			</header>

			<div className="movie-container">
				{movies.length > 0 &&
					movies.map(movie => <Movies key={movie.id} {...movie} />)}
			</div>
		</>
	);
}

export default App;
