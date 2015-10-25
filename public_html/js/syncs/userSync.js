define([
    'backbone'
], function(
    Backbone
){

    return function(method, model, options) {

        var methods = {
            'create': {
                send: function() {
                    $.ajax({
			type: "POST",
			url: '/auth/signin',
                        data: JSON.stringify(model.toJSON())
		    });//ajax
                }//send
            },//create
        };//methods

        return methods[method].send();
    };//function
});
