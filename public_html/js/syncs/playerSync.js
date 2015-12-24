define([
	'backbone'
], function () {
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

		if (options.callback && options.callback.error) {
			errorFunc = options.callback.error;
		}

		if (method == 'create') {
			requestType = methodMap['create'];
			url = urlMap['signup'];
			data = options.param;
		} else if (method == 'update') {
			requestType = methodMap['update'];
			url = urlMap['signin'];
			data = options.param;
		} else if (method == 'delete') {
			requestType = methodMap['delete'];
			url = urlMap['signout'];
			data = {};
		} else if (method == 'read') {
			requestType = methodMap['read'];
			url = urlMap['check'];
			successFunc = function (response) {
				resp = JSON.parse(response);
				if (resp.status == '200') {
					model.set(resp.body);
				}
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