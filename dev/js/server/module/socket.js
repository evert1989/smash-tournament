// Generation
// ----------
function generatePinCode() {
	let min = 0,
		max = 9999;
	return ("000" + Math.floor(Math.random() * (max - min + 1))).substr(-4);
};


// Lookup
// ------
function findWithAttr(array, attr, value) {
	for(var i = 0; i < array.length; i += 1) {
		if(array[i][attr] === value) {
			return true;
		}
	}
	return false;
}



// Module
// ------
module.exports = {

	application: {

		disconnected: function () {
			//console.log("SOCKET - application disconnected.");
		},

		onRequest: function (obj) {
			switch (obj.message) {
				case 'pin-code':
					let responseCode = generatePinCode();

					global.activeServers.push({code: responseCode, socket: this});

					console.log('SOCKET - game started on: ' + responseCode);
					this.emit('server:response-code', responseCode);
					break;

				case 'lock-down':
					console.log('SOCKET - game locked down on : ' + obj.code);
					global.io.emit('players-' + obj.code + ':lock');
					break;
			}

		}
	},

	player: {

		joinGame: function (obj) {
			let isActiveGame = findWithAttr(global.activeServers, 'code', obj.code);

			if (isActiveGame) {
				console.log("SOCKET - player joined game: " + obj.name);

				global.io.emit(obj.id + '-join:success');
				global.io.emit('application-' + obj.code + ':join', obj);

			} else {
				global.io.emit(obj.id + '-join:not-found');
			}
		}
	}
};