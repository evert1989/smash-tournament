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

	/** @constructor */
	return BaseView.extend({

		// Vars
		// ----
		model: null,

		// DOM
		$score: {},


		// Template
		// --------
		/**
		 * @desc Renders the page and adds it to the given $parent.
		 * @param {object} $parent
		 */
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