// Generation
// ----------
function generatePinCode() {
	let min = 0,
		max = 9999;
	return ("000" + Math.floor(Math.random() * (max - min + 1))).substr(-4);
};


// Module
// ------
module.exports = {

	application: {

		disconnected: function () {
			console.log("SOCKET - application disconnected.");
		},

		onRequest: function (message) {
			switch (message) {
				case 'pin-code':
					let responseCode = generatePinCode();

					console.log("SOCKET - pin code generated: " + responseCode);
					this.emit('server:response-code', responseCode);

					break;
			}

		}
	},

	player: {

		joinGame: function(obj){
			console.log('socket -> joinGame', obj);
			global.io.emit('application-' + obj.code + ':join', obj);
		}
	}
};