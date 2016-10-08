//@flow

import { Socket as PhoenixSocket } from 'phoenix';
import * as debug from '../debug';

export type Wire = {
	socket: any,
	channels: Object,
}

export function wire (address: string, options:any = {}, successCallback? : Function, errorCallback? : Function): Wire {
	let socket = new PhoenixSocket(`ws://${address}/socket`, {params: options}),
		wireInstance = {
			socket,
			channels: {},
		};

	socket.connect();
	socket.onOpen(() => debug.info('Connection established..'));
	join(wireInstance, 'wire:core', {}, successCallback, errorCallback);

	return wireInstance;
}

export function join (wire: Wire, channel: string, params: Object, successCallback? : Function, errorCallback? : Function) {
	let currentChannel = wire.channels[channel];

	// if (wire.channels[channel]) debug.warn()
	if (currentChannel) {
		console.log(`Already joined ${channel} room!`);
		return wire;
	} else {
		let channelInstance = wire.socket.channel(channel, params);
		wire.channels[channel] = channelInstance;

		channelInstance.join()
			.receive('error', response => {
				debug.error(`Failed to connect to "${channel}" channel`, response);
				errorCallback && errorCallback(channelInstance, response);
			})
			.receive('timeout', response => {
				debug.error(`Join ${channel} timeout!`, response);
			})
			.receive('ok', response => {
				wire.channels[channel] = channelInstance;
				debug.info(`Joined ${channel} channel.`);
				successCallback && successCallback(channel, response);
			});

		return channelInstance;
	}
}

export function leave (wire: Wire, channel: string, successCallback? : Function, errorCallback? : Function) {
	let currentChannel = wire.channels[channel];

	if (currentChannel) {
		currentChannel.leave().receive('ok', () => {
			debug.info(`Left ${channel} channel...`);
			delete wire.channels[channel];
			successCallback && successCallback();
		})
	} else {
		errorCallback && errorCallback(`Channel ${channel} not found..`);
	}
}

export function execute (wire: Wire, query: string, variables: Object, successCallback?: Function, errorCallback?: Function): void {
	let coreChannel = wire.channels['wire:core'];
	let meta = coreChannel.push('execute', {query, variables});

	coreChannel.on(meta.refEvent, payload => {
		coreChannel.off(meta.refEvent);

		console.log(payload);
		successCallback && successCallback(payload.response);
	});
}

window.Relay = {
	QL: (fragments, ...params) => {
		let pureQuery = '';
		for (let i = 0; i < params.length; i++) {
			pureQuery += fragments[i] + params[i];
		}
		pureQuery += fragments[params.length];

		return {
			statement: pureQuery,
			mutation: pureQuery.substring(0, pureQuery.indexOf(' ')) == 'mutation',
		}
	}
};