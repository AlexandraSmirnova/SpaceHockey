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
    var logoutItem = ".menu__item_logout";

    var Main = Backbone.View.extend({
        template: tmpl,
	user: User,
	
	events: {
	    "click .menu__item_logout": "logout"
	},
	
	initialize: function () {
            $('.page').append(this.el);
            this.render();
	    that = this;
	    this.listenTo(this.user, 'change', function(){ alert("Model changed!"); that.render();} );	   
	    	   
        },

	logout: function(){
	    SignoutManager.exitRequest(this.user);
	    this.render();
	},
	        
     	render: function () {
            this.$el.html(this.template(JSON.parse(localStorage.getItem("user"))));
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
