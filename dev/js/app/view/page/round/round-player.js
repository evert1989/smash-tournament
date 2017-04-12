define([
	// Views
	'view/base/base-view',
	// Templates
	'text!template/app/page/round/round-player.hbs'
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

		// DOM
		$score: {},


		/** @constructor */
		initialize: function (options) {
			this._super(options);
		},


		// Template
		// --------
		render: function($parent){
			this._super(template, $parent, this.model.toJSON());

			this.$score = this.$('.score-js');
		},


		// Update
		// ------
		updateScore: function(){
			let points = this.model.get('points');
			points += parseInt(this.$score.val());

			this.model.set({points: points});
		}
	});
});