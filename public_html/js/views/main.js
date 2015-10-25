define([
    'backbone',
    'tmpl/main',
    'models/user'
], function(
    Backbone,
    tmpl,
    User
){
  // var user = new User({logged_in: false});
    
    var Main = Backbone.View.extend({
        template: tmpl,
	user: User,

	initialize: function () {
            $('.page').append(this.el);            
            this.render();
	    this.listenTo(this.user, 'change', this.render);
        },
        
     	render: function () {
            this.$el.html(this.template(this.user.toJSON()));
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
