define([
	// Models
	'model/player-model', // Singleton
	// Views
	'view/base/page-view',
	// Overlays
	'view/overlay/wait-overlay',
	'view/overlay/eliminated-overlay',
	'view/overlay/knockout-overlay',
	'view/overlay/winner-overlay',
	// Templates
	'text!template/player/page/stats/stats-page.hbs'
], function (
	// Models
	PlayerModel,
	// Views
	PageView,
	// Overlays
	WaitOverLay,
	EliminatedOverlay,
	KnockoutOverlay,
	WinnerOverlay,
	// Templates
	template
) {

	'use strict';

	return PageView.extend({

		// Vars
		// ----
		waitOverlay: null,
		eliminatedOverlay: null,
		knockoutOverlay: null,
		winnerOverlay: null,

		// DOM
		$points: {},
		$ranking: {},


		/** @constructor */
		initialize: function (options) {
			this._super(options);
		},


		// Toggle Class
		// ------------
		start: function ($parent) {
			if (this._super(template, $parent, PlayerModel.toJSON())) {
				return;
			}

			this.$points = this.$('.points-js');
			this.$ranking = this.$('.ranking-js');

			this.waitOverlay = new WaitOverLay();
			this.eliminatedOverlay = new EliminatedOverlay();
			this.knockoutOverlay = new KnockoutOverlay();
			this.winnerOverlay = new WinnerOverlay();

			this.addListeners();
		},

		stop: function () {
			if(this._super()){
				return;
			}

			this.waitOverlay.stop();
			this.waitOverlay = null;

			this.eliminatedOverlay.stop();
			this.eliminatedOverlay = null;

			this.knockoutOverlay.stop();
			this.knockoutOverlay = null;

			this.winnerOverlay.stop();
			this.winnerOverlay = null;

			this.removeListeners();
			this.$el.remove();
		},


		// Events
		// ------
		onChangePoints: function(){
			this.$points.text(PlayerModel.get('points'));
		},

		onChangeRanking: function(){
			this.$ranking.text(PlayerModel.get('ranking'));
		},


		// Listeners
		// ---------
		addListeners: function(){
			this.listenTo(PlayerModel, 'change:points', this.onChangePoints);
			this.listenTo(PlayerModel, 'change:ranking', this.onChangeRanking);
		},

		removeListeners: function(){
			this.stopListening(PlayerModel, 'change:points', this.onChangePoints);
			this.stopListening(PlayerModel, 'change:ranking', this.onChangeRanking);
		}
	});
});