define([
    'backbone',
    'game/socket',
    'tmpl/game'
], function(
    Backbone,
    socket,
    tmpl

){

    var View = Backbone.View.extend({
        template: tmpl, 
        user: null,

        events: {
            "click .win_button": "sendMessage"
        },

        initialize: function () {
            this.user = JSON.parse(localStorage.getItem('user'));
	        $('.page').append(this.el);   
                        
            if(this.user)         
                this.render();  
        },

        render: function () {
            

            this.$el.html(this.template(this.user));

            //if ( this.user != null){
                
             //   socket.init();    
            //}        
            return this;
        },

        sendMessage: function(){
            socket.sendMessage();
        },

        show: function () {
            this.$el.show();
            if(this.user)
                socket.init(this.user);
            this.trigger("show", this);
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});
