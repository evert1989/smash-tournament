'use strict';

// Generation
// ----------
function generatePinCode() {
	let min = 0,
		max = 9999;
	return ('000' + Math.floor(Math.random() * (max - min + 1))).substr(-4);
}


// Lookup
// ------
function findWithAttr(array, attr, value) {
	for(let i = 0; i < array.length; i += 1) {
		if(array[i][attr] === value) {
			return true;
		}
	}
	return false;
}



// Module
// ------
module.exports = {

	// General
	// -------
	general: {
		disconnected: function () {}
	},


	// Application socket
	// ------------------
	application: {
		onRequest: function (obj) {
			switch (obj.message) {
				case 'pin-code':
					let responseCode = generatePinCode();

					global.activeServers.push({code: responseCode, socket: this});

					this.emit('server:response-code', responseCode);
					break;

				case 'lock-down':
					global.io.emit('players-' + obj.code + ':lock');
					break;
			}
		},

		onUpdate: function(obj){
			switch(obj.message){
				case 'player-points':
					global.io.emit('player-' + obj.id + ':update-points', obj.points);
					break;

				case 'player-ranking':
					global.io.emit('player-' + obj.id + ':update-ranking', obj.ranking);
					break;

				case 'player-eliminated':
					global.io.emit('player-' + obj.id + ':update-eliminated', obj.eliminated);
					break;

				case 'player-knockout':
					global.io.emit('player-' + obj.id + ':update-knockout');
					break;

				case 'player-winner':
					global.io.emit('player-' + obj.id + ':update-winner');
					break;
			}
		},

		onPlayerFound: function(obj){
			global.io.emit('player-found', obj);
		}
	},


	// Player socket
	// -------------
	player: {
		joinGame: function (obj) {
			let isActiveGame = findWithAttr(global.activeServers, 'code', obj.code);

			if (isActiveGame) {
				global.io.emit(obj.id + '-join:success');
				global.io.emit('application-' + obj.code + ':join', obj);

			} else {
				global.io.emit(obj.id + '-join:not-found');
			}
		},

		requestData: function(obj){
			global.io.emit('request:player-data', obj);
		}
	}
};