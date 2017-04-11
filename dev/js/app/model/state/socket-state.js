define([
	// Models
	'model/base/base-model'
], function (
	// Models
	BaseModel
) {

	'use strict';

	const SocketState = BaseModel.extend({

		defaults: {
			pinCode: null,
			isLocked: false
		},


		// Constructor
		// -----------
		initialize: function () {}
	});

	return new SocketState();
});