define([
    'backbone',
    'syncs/userSync'
    
],function(
    Backbone,
    UserSync

){
    var UserModel = Backbone.Model.extend({
	
	sync: UserSync,
	
	defaults: {	    
	    url: "/",
	    login: "",
	    password: "",
	    email: "",
	    logged_in: false	    
	},
	
	loginSuccess: function (data) {
            this.login = data.name;
	    this.password = data.password;
            this.logged_in = true;
            //this.trigger(this.loginCompleteEvent);
        },
    });

    return new UserModel();


});
