import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import type { Action } from './actions';
import { wireReducer } from './reducer';

export type Store = {
	dispatch: (action: Action) => any;
}

const initialAppState = {
	articles: []
};

function appReducer (state: any = initialAppState, action: Action): any {
	switch (action.type) {
		default:
			return state;
	}
}

let wireAppState = wireReducer(appReducer, {});

const reducers = combineReducers({
	routing: routerReducer,
	app: wireAppState,
});

export let store:Store = compose(
	applyMiddleware(thunk),
)(createStore)(reducers);

export let history = syncHistoryWithStore(browserHistory, store);
window.store = store;