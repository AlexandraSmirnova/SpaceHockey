define([
    'backbone',
    'tmpl/main',
    'models/userProfile',
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
        
        events: {
            "click .menu__item_logout": "logout"
        },
        
        initialize: function () {            
            $('.page').append(this.el);
            console.log("initialize");
            this.render();
            that = this;
            this.listenTo(User, 'change', function(){                                 
                that.render();} );                         
        },

        logout: function(){
            SignoutManager.exitRequest(this.model);            
            this.render();
        },
                
        render: function () {        
            //console.log(User);
            //console.log(User.get('login'));
            userlogin = User.get('login');
            var userData = {
                "login": userlogin
            }
            this.$el.html(this.template(userData));
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },
        
    });

    return new Main({model: User});
});
