require.config({

	baseUrl: 'js/app',

	paths: {
		// Vendor paths
		'jquery': 			'../vendor/jquery/dist/jquery.min',
		'underscore': 		'../vendor/underscore/underscore-min',
		'backbone': 		'../vendor/backbone/backbone-min',
		'text': 			'../vendor/text/text',
		'handlebars': 		'../vendor/handlebars/handlebars.min',
		'backbone-super': 	'../vendor/backbone-super/backbone-super/backbone-super-min',

		// Socket.io
		'socket.io':		'/socket.io/socket.io',

		// Directory paths
		'template':			'../../template'
	}
});

require(['app'], function (App) {
	var app = new App();
	app.start();
});