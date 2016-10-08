//@flow

import type { Action } from './actions';

import {
	ReduxInit,
	CollectionInsert,
	CollectionMutate,
	CollectionDestroy
} from './actions';
import {
	collectionInsert,
	collectionMutate,
	collectionDestroy
} from './utils';

export type Reducer = (state: any, action: Action) => any;

export function wireReducer (reducer: Reducer, options: any = {}): any {
	const initialState = reducer(undefined, { type: ReduxInit }),
	  mergedOptions = { ...defaultOptions, ...options };

	return function (state: any = initialState, action: Action) {
		let liveMeta = mergedOptions.lives[action.collection],
			newState = { ...state };

		switch (action.type) {
			case CollectionInsert:
				if (liveMeta) for (let key of Object.keys(liveMeta)) {
					let currentList = state[key];
					if (currentList) newState[key] = collectionInsert(currentList, action.instance);
				}

				return newState;
			case CollectionMutate:
				if (liveMeta) for (let key of Object.keys(liveMeta)) {
					let currentList = state[key];
					if (currentList) newState[key] = collectionMutate(currentList, action.instance);
				}

				return newState;
			case CollectionDestroy:
				if (liveMeta) for (let key of Object.keys(liveMeta)) {
					let currentList = state[key];
					if (currentList) newState[key] = collectionDestroy(currentList, action.instance);
				}

				return newState;
			default:
				return reducer(state, action);
		}
	}
}

const defaultOptions = {
	key: 'id',
	lives: {
		articles: {
			post: {
				filter: (item) => item.private == true
			},
			articles: {},
		}
		// products: {
		// 	allProducts: {},
		// },
		// purchases: {
		// 	allPurchases: {}
		// }
	}
};