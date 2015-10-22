define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
	//el: $("#page"),
        template: tmpl,
     
	initialize: function () {
	    $('.page').append(this.el);            
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        },
        show: function () {
            this.$el.show();
	    this.trigger("show", this);
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});
