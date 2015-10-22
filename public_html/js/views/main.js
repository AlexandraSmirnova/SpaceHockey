define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var Main = Backbone.View.extend({
        template: tmpl,
	
	initialize: function () {
            $('.page').append(this.el);            
            this.render();
        },
        
     	render: function () {
            this.$el.html(this.template);
        },
        show: function () {
	    this.trigger('show', this);
	    this.$el.show();

        },
        hide: function () {
            this.$el.hide();
        }

    });
    var main = new Main();
    return main;
});
