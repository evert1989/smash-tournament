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

	/** @constructor */
	return BaseView.extend({

		// Vars
		// ----
		model: null,


		// Template
		// --------
		/**
		 * @desc Renders the page and adds it to the given $parent.
		 * @param {object} $parent
		 */
		render: function($parent){
			this._super(template, $parent, this.model.toJSON());
		}
	});
});