export let ReduxInit                          = '@@redux/INIT';
export let ResetState                         = 'STAGE:RESET-STATE';
export let CollectionMutate                   = 'STAGE:COLLECTION-MUTATE';
export let CollectionInsert                   = 'STAGE:COLLECTION-INSERT';
export let CollectionDestroy                  = 'STAGE:COLLECTION-DESTROY';

export type ReduxInitAction = { type: '@@redux/INIT' };

export type Action = ReduxInitAction
	| { type: any }
	| { type: 'STAGE:COLLECTION-INSERT', instance: Object }
	| { type: 'STAGE:COLLECTION-MUTATE', instance: Object }
	| { type: 'STAGE:COLLECTION-DESTROY', instance: Object }