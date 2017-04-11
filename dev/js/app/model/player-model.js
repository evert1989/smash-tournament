define([
	// Vendors
	'backbone'
], function (
	// Vendors
	Backbone
) {

	'use strict';

	return Backbone.Model.extend({

		defaults: {
			id: null,
			name: null,
			code: null
		},


		// Constructor
		// -----------
		initialize: function () {},
	});
});