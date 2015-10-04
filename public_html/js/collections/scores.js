define([
    'backbone',
		'models/score'
], function(
    Backbone,
		PlayerModel
){
		
		var	players = [
			new PlayerModel({name:'Jane', score: 1240}),
			new PlayerModel({name:'Jhon', score: 350}),
			new PlayerModel({name:'Jim', score: 3400}),
			new PlayerModel({name:'Nonna', score: 3240}),
			new PlayerModel({name:'Max', score: 1340}),
			new PlayerModel({name:'Rita', score: 2240}),
			new PlayerModel({name:'Tom', score: 3420}),
			new PlayerModel({name:'David', score: 3410})
		];

    var PlayerCollection = Backbone.Collection.extend({
			model: PlayerModel
    });

    return new PlayerCollection(players);
});
