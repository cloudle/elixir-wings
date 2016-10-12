import * as debug from '../debug';

export function collectionMutate (collection, instance, merge = true, additionalMerge = {}) {
	if (!instance || !instance.id) {
		debug.warn('Immutable collection MUTATE require [id] field of the new instance... return original collection.', instance);
		return collection;
	}

	let itemIndex = collection.findIndex(item => item.id == instance.id);
	if (itemIndex < 0) return collection;

	let liveItem = merge ? { ...collection[itemIndex], ...instance, ...additionalMerge } : instance,
		headItems = collection.slice(0, itemIndex),
		tailItems = collection.slice(itemIndex + 1);

	return [ ...headItems, liveItem, ...tailItems ];
}

export function collectionInsert (collection, instance, pop = true) {
	return pop ? [ instance, ...collection ] : [ ...collection, instance ];
}

export function collectionDestroy (collection, instance) {
	if (!instance || !instance.id) {
		debug.warn('Immutable collection DESTROY require [id] field of the new instance... return original collection.', instance);
		return collection;
	}

	let itemIndex = collection.findIndex(item => item.id == instance.id);
	if (itemIndex < 0) return collection;

	let headItems = collection.slice(0, itemIndex),
		tailItems = collection.slice(itemIndex + 1);

	return [ ...headItems, ...tailItems ];
}

export function firstKeyOf(instance: Object, address?: string) {
	let result = instance[Object.keys(instance)[0]];

	if (address && result[address]) {
		return result[address]
	} else {
		return result;
	}
}