define([
	// Vendors
	'backbone',
	'handlebars',
	'backbone-super'
], function (
	// Vendors
	Backbone,
	Handlebars
) {

	'use strict';

	/** @constructor */
	return Backbone.View.extend({

		// Vars
		// ----
		// States
		isStarted: false,


		// Template
		// --------
		/**
		 * @desc Builds template and appends it to target DOM element. Called from 'start' method.
		 * @param {string} template
		 * @param {object} $parent
		 * @param {object} templateData
		 */
		render: function(template, $parent, templateData){
			let compiledTemplate = this.compileTemplate(template);
			let data = templateData || {};

			this.setElement(compiledTemplate(data));
			this.$el.appendTo($parent);
		},

		/**
		 * @desc Compiles a handlebars template.
		 * @param {string} template
		 * @returns {object} Handlebars template.
		 */
		compileTemplate: function(template){
			return Handlebars.compile(template);
		},


		// Toggle Class
		// ------------
		/**
		 * @desc Starts function and returns true if already started.
		 * @returns {boolean}
		 */
		start: function () {
			if (this.isStarted) { return true; }

			this.isStarted = true;
			return false;
		},

		/**
		 * @desc Stops function and returns true if already stops.
		 * @returns {boolean}
		 */
		stop: function () {
			if (!this.isStarted) { return true; }

			this.isStarted = false;
			return false;
		}
	});
});