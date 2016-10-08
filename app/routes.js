import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './app';
import Home from './pages/home';

export default function ({store, history}) {
	return <Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
			</Route>
		</Router>
	</Provider>
}