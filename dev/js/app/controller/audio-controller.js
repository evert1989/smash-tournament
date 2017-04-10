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

	const AudioController = function () {
		this.initialize.apply(this);
	};

	_.extend(AudioController.prototype, Backbone.Events, {

		// Vars
		// ----
		// sound
		activeSound: null,

		// Files
		AUDIO: {
			INTRO: 'asset/audio/intro.mp3'
		},

		/** @constructor */
		initialize: function () {},


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