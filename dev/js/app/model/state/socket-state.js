define([
	// Models
	'model/base/base-model'
], function (
	// Models
	BaseModel
) {

	'use strict';

	/** @constructor */
	const SocketState = BaseModel.extend({

		defaults: {
			pinCode: null,
			isLocked: false
		}
	});

	return new SocketState();
});