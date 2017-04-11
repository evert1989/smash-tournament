define([
	// Views
	'view/base/base-view',
	// Templates
	'text!template/app/page/lobby/lobby-player.hbs'
], function (
	// Views
	BaseView,
	// Template
	template
) {

	'use strict';

	return BaseView.extend({

		// Vars
		// ----
		model: null,


		/** @constructor */
		initialize: function (options) {
			this._super(options);
		},


		// Template
		// --------
		render: function($parent){
			this._super(template, $parent, this.model.toJSON());
		}
	});
});