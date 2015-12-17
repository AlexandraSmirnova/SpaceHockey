define([
	'backbone'
], function () {

	return function (method, collection) {
		var url;
		var requestType;
		var successFunc;
		var errorFunc;

		if (method == 'read') {
			url = '/score?limit=10';
			requestType = "GET";
			successFunc = function (response) {
				var resp = JSON.parse(response);
				console.log(resp.body);
				collection.set(resp.body.scoreList);
			};
			errorFunc = function (error) {
				console.log(error.statusText);
			}
		}

		$.ajax({
			type: requestType,
			url: url,
			async: false,
			success: successFunc,
			error: errorFunc
		});

	};
});