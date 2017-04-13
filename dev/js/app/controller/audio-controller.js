define([
	// Vendors
	'backbone',
	'underscore'
], function (
	// Vendors
	Backbone,
	_
) {

	'use strict';

	/** @constructor */
	const AudioController = function () {
		this.initialize.apply(this);
	};

	_.extend(AudioController.prototype, Backbone.Events, {

		// Vars
		// ----
		// Sound
		activeSound: null,

		// Files
		AUDIO: {
			INTRO: 'asset/audio/intro.mp3',
			GAME_READY_GO: 'asset/audio/announcer/announcer_game_ready_go.mp3',
			ONE_ON_ONE: 'asset/audio/announcer/announcer_one_on_one.mp3',
			FINAL_BATTLE: 'asset/audio/announcer/announcer_final_battle.mp3',
			THE_WINNER_IS: 'asset/audio/announcer/announcer_the_winner_is.mp3'
		},


		// Init
		// ----
		initialize: function(){},


		// Sounds
		// ------
		/**
		 * @desc Play the audio file that is selected and loop if set to loop.
		 * @param {string} audioType
		 * @param {boolean} isLooping
		 */
		playSound: function(audioType, isLooping){
			this.pauseSound();

			this.activeSound = new Audio(audioType);
			this.activeSound.loop = isLooping || false;
			this.activeSound.play();
		},

		pauseSound: function(){
			if(!this.activeSound) {
				return;
			}

			this.activeSound.pause();
			this.activeSound = null;
		}
	});

	return new AudioController();
});