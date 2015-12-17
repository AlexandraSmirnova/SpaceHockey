define([
	'backbone'
], function (Backbone) {
	var methodMap = {
		'create': 'POST',
		'update': 'POST',
		'delete': 'POST',
		'read': 'POST'
	};

	var urlMap = {
		'signup': '/auth/signup',
		'signin': '/auth/signin',
		'signout': '/auth/signout',
		'check': '/profile'
	};

	return function (method, model, options) {
		var requestType = "";
		var url = "";
		var data = {};
		var successFunc;
		var errorFunc;

		if (options.callback && options.callback.success) {
			successFunc = options.callback.success;
		}
		else {
			successFunc = function () {
				console.log("OK");
			};
		}
		;

		if (options.callback && options.callback.error) {
			errorFunc = options.callback.error;
		}
		else {
			errorFunc = function (xhr, status, error) {
				console.log(error.statusText);
			};
		}
		;

		if (method == 'create') {
			console.log("create");
			console.log(data);
			requestType = methodMap['create'];
			url = urlMap['signup'];
			data = options.param;
		}
		else if (method == 'update') {
			requestType = methodMap['update'];
			url = urlMap['signin'];
			data = options.param;
		}
		else if (method == 'delete') {
			requestType = methodMap['delete'];
			url = urlMap['signout'];
			data = {};
		}
		else if (method == 'read') {
			requestType = methodMap['read'];
			url = urlMap['check'];
			successFunc = function (response) {
				resp = JSON.parse(response);
				console.log(resp.body);
				if (resp.status == '200')
					model.set(resp.body);
				else
					console.log("UNAUTHORIZED");
			}
		}

		$.ajax({
			type: requestType,
			url: url,
			data: JSON.stringify(data),
			success: successFunc,
			error: errorFunc
		});
	}

});