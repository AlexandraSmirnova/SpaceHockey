define([
    'backbone'
], function(
    Backbone
){

    var PlayerModel = Backbone.Model.extend({
        url: '/scoreboard',
        idAttribute: 'id_event',
    	defaults: {
    		name: 'Unnamed player',
    		score: 0
    	}	
    });

    return PlayerModel;
});
