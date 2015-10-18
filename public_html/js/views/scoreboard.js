define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores'
], function(	
    Backbone,
    tmpl,
    playerModel,
    playerCollection
){
     var scoremodel = new playerModel();

    var ScoreBoardView = Backbone.View.extend({				
	el: $("#page"),
        template: tmpl,
	collection: playerCollection,
		
	initialize: function () {
           
        },

        render: function () {
            this.$el.html(this.template(this.collection.toJSON()));
        },
		

        show: function () {
            this.$el.render();
        },
        hide: function () {
            this.$el.empty();
        }

    });
 
    return  new ScoreBoardView({model: scoremodel});
});

