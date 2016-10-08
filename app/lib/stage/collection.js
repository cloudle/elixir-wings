//@flow

import { v4 as uniqueId } from 'uuid';
import * as debug from '../debug';
import type { Wire } from '../wire';
import { execute } from '../wire';
import type { Store } from '../stage';
import {
	CollectionInsert,
	CollectionMutate,
	CollectionDestroy
} from './actions';

type CollectionOptions = {
	insertGraph?: string,
	mutationGraph?: string,
	destroyGraph?: string,
}

export class Collection {
	store: Store;
	wire: Wire;
	collectionName: string;
	options: CollectionOptions;

	constructor (store: Store, wire: Wire, collectionName: string, options: CollectionOptions = {}) {
		this.store = store;
		this.wire = wire;
		this.collectionName = collectionName;
		this.options = options;
	}

	query (graphQuery: string, variables: Object = {}) {
		let collection = this.collectionName;

		return execute(this.wire, graphQuery, variables, response => {
			for (let item of response.data[collection]) {
				this.store.dispatch({ type: 'STAGE:COLLECTION-INSERT', collection, instance: item });
			}
		});
	}

	insert (instance: any, graphQuery?: string) {
		let insertGraph = graphQuery || this.options.insertGraph;
		return insert(this.store, this.wire, this.collectionName, instance, insertGraph);
	}

	mutate (instance: any) {
		return mutate(this.store, this.wire, this.collectionName, instance);
	}

	destroy (instance: any) {
		return destroy(this.store, this.wire, this.collectionName, instance);
	}
}

export function register (wire: Wire, collection: string) {
	let collectionObject = {}; collectionObject[collection] = {};

	return { ...wire, collections : { ...wire.collections, ...collectionObject } }
}

export function insert (store: Store, wire: Wire, collection: string, instance: Object, graphQuery?: string) {
	instance.id = instance.id || uniqueId();

	/*Script: TODO: Implement this
	* 1. Insert optimistic item in to Redux store, give it a unique transaction name
	* 2. Execute insert query to server, get result and merge it with the store
	*     - Success case will merge the item with response from server
	*     - Failure case will remove the new item from local store
	* 3.
	* */

	store.dispatch({type: CollectionInsert, collection, instance});

	if (graphQuery) {
		execute(wire, graphQuery, instance, response => {
			debugResponse(response);

			if (response.errors) {
				store.dispatch({type: CollectionDestroy, collection, instance});
			} else {
				store.dispatch({
					type: CollectionMutate, collection,
					instance: { ...instance, ...response.data.insertArticle }
				});
			}
		});
	}

	return instance.id;
}

export function destroy (store: Store, wire: Wire, collection: string, instance: Object) {

	/*Script: TODO: Implement this
	* 1. Destroy the item, backup it in local variable (of current lexical scope)
	* 2. Execute the destroy query to server, get result and merge it with the store
	*     - Success case, just let it as it is
	*     - Failure case, bring it back using local variable stored before
	* 3.
	* */

	store.dispatch({type: CollectionDestroy, collection, instance});
}

export function mutate (store: Store, wire: Wire, collection: string, instance: Object) {

	/*Script: TODO: Implement this
	 * 1. Merge the item with the existing one, backup original state in local variable (of current lexical scope)
	 * 2. Execute the mutation query to server, get result and merge it with the store
	 *     - Success case, just let it as it is
	 *     - Failure case, bring it back using local variable stored before
	 * 3.
	 * */

	store.dispatch({type: CollectionMutate, collection, instance});
}

type GraphQlResponse = {
	data: Object;
	errors?: Array<any>
}

function debugResponse (response: GraphQlResponse): void {
	if (response.errors) {
		for (let error of response.errors) {
			debug.error(error.message);
		}
	}
}