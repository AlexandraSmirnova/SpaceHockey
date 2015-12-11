define([
	'backbone',
	'syncs/playerSync'
], function (Backbone,
             playerSync) {

	var UserModel = Backbone.Model.extend({
		sync: playerSync,
		url: "/profile",

		defaults: {
			login: "",
			password: "",
			email: "",
			logged_in: false
		},

        registration: function(param, callback){              
            this.sync('create', this, {callback: callback, param: param});
        },

        login: function(param, callback){
            this.sync('update', this, {callback: callback, param: param});
        },

        logout: function(callback){
            this.sync('delete', this, {callback: callback});
        },

		isLoggedIn: function () {
			return this.logged_in;
		},

		loginSuccess: function (data) {
            console.log(data.login)
			this.login = data.login;
		},

        loginUnsuccess: function (data) {
            
        },

        regSuccess: function (data) {
            
        },

        regUnsuccess: function (data) {
            
        },


        logoutSuccess: function (data) {
            
        },

        logoutUnsuccess: function (data) {
            
        },


	});

	var user = new UserModel();
	user.fetch();
	return user;
});
