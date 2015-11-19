define([
    'backbone',
    'syncs/userSync'
    
],function(
    Backbone,
    userSync
){
    
    var UserModel = Backbone.Model.extend({
        //sync: userSync,   // <-- it's very strange thing!
        url: "/auth/signin",
    
        defaults: {        
            
            login: "",
            password: "",
            email: "",
            logged_in: false        
        },

        initialize: function() {
            console.log("This model has been initialized");
        },
        isLoggedIn: function() {
            console.log("Check login");
        },

        loginSuccess: function (data) {
            this.set(data);           
        },
    });

    return new UserModel();


});
