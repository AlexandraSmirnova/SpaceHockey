define(['backbone'],
function(
    Backbone
){
    var UserModel = Backbone.Model.extend({
	defaults: {
	    url: "",
	    login: "",
	    password: "",
	    email: "",
	    logged_in: "false"	    
	},
	
	is_logged: function(){
	    return this.logged_in;
	}
	
    });

    return UserModel;


});
