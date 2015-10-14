define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(	
    Backbone,
    tmpl,
    playerCollection
){

    var ScoreBoardView = Backbone.View.extend({				
	el: $("#page"),
        template: tmpl,
		
	initialize: function () {
           
	    $.ajax({
		url: "utils/score_list.html",
		context: this,
		success: function(response) {
		    this.playerTemplate = response;
		    this.renderPlayerTemplate();
		}
	    });
        },

        render: function () {
            this.$el.html(this.template);
			
	    if (this.playerTemplate) {
                this.renderPlayerTemplate(); 
            }
        },
		
	renderPlayerTemplate: function() {
            var players  = this.collection.toJSON();
            var playersHtml = _.template( this.playerTemplate, {players: players});
            $('.score-list').html(playersHtml); 
        },

        show: function () {
            this.$el.render();
        },
        hide: function () {
            this.$el.empty();
        }

    });
 
    return  new ScoreBoardView({collection: playerCollection});
});

