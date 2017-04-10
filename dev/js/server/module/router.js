// Libraries
// ---------
const express = require('express');


// Module
// ------
module.exports = function(){

	// Vars
	// ----
	const root = global.rootPath;
	const router = express.Router();


	// Static
	// ------
	router.use(express.static(root));


	// Routes
	// ------
	// Application
	router.get('/', function(req, res){
		res.sendFile(root + '/index.html');
	});

	// User


	// 404
	router.get('*', function(req, res){
		res.sendFile(root + '/404.html');
	});

	return router;
};