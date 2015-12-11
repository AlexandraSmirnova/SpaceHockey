define([
	'backbone'
], function (Backbone) {

	return function (method, collection, options) {
        var url;
        var requestType;
        var successFunc;
        var errorFunc;

		if (method == 'read'){
            url = '/score?limit=10';
            requestType = "GET";  
            successFunc = function   (response) {               
                resp = JSON.parse(response);
                console.log(resp.body);
                collection.set(resp.body.scoreList);
            },
            errorFunc = function (error) {
                console.log(error.statusText);
            }            
        }

        var xhr = $.ajax({
            type: requestType,
            url: url,  
            async: false,                              
            success: successFunc,
            error: errorFunc
        });    

	};
});