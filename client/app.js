import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import {Route} from 'react-router-dom';

const App = () => {
	return (
		<div>
			<Route component={Navbar} />
			<Routes />
		</div>
	);
};

export default App;
