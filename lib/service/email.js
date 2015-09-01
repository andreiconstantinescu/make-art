var app = require('../app');

app.factory('emailService', ['', function ($http, $rootScope){
	function resetFields (item) {
		item.name = '';
		item.message = '';
		item.email = '';
  	}

	function buildEmailObject (item) {
		return {
			name            : item.name ? item.name : item.username,
			message         : item.message,
			title           : item.shareTitle ? item.shareTitle : item.short_title,
			world_url       : item.world_url,
			cover_url       : item.cover_url ? item.cover_url : 'http://art.kano.me/' + item.img,
			user_email      : item.user_email,
			email           : item.email
		};
	}

	function emailer (item, successCB, errorCB) {
		var host = 'http://localhost:7000/summercamp/send';

		if (CONFIG.PRODUCTION) {
			host = 'http://kanofathersday.herokuapp.com/summercamp/send';
		}

		var req = {
			method  : 'POST',
			url     : host,
			headers : {
			  'Content-Type': 'application/json'
			},
			data	: JSON.stringify(item)
		};

		$http(req).then(successCB, errorCB);
	}

	return {
		reset 		: resetFields,
		buildObject : buildEmailObject,
		send		: emailer
	};
}]);