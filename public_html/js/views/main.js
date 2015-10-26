define([
    'backbone',
    'tmpl/main',
    'models/user',
    'utils/signout'
], function(
    Backbone,
    tmpl,
    User,
    SignoutManager
){
  // var user = new User({logged_in: false});
    var logoutItem = ".menu__item_logout";

    var Main = Backbone.View.extend({
        template: tmpl,
	user: User,
	
	events: {
	    "click .menu__item_logout": "logout"
	},
	
	logout: function(){
	    SignoutManager.exitRequest();
	    this.render();
	},

	initialize: function () {
            $('.page').append(this.el);
            this.render();
	    this.listenTo(this.user, 'change', this.render);	   
        },
        
     	render: function () {
            this.$el.html(this.template(JSON.parse(localStorage.getItem("user"))));//this.user.toJSON());
        },

        show: function () {
	    this.trigger('show', this);
	    this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },
	


    });


    var main = new Main();
    return main;
});
