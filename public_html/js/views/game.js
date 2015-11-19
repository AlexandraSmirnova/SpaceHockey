define([
    'backbone',
    'game/socket',
    'tmpl/game',
    'models/user'
], function(
    Backbone,
    socket,
    tmpl,
    User
){

    var View = Backbone.View.extend({
        template: tmpl, 
        

        events: {
            "click .win_button": "sendMessage"
        },

        initialize: function () {        
	        $('.page').append(this.el);                             
            this.render();
            self = this;
            this.listenTo(User, 'change', function(){ self.render(); } );                                 
        },

        render: function () {     
            console.log("render");   
            user = User.get('login'); 
            console.log("Game" + user);       
            if(user){
                console.log("if");
                var userData = {
                    'login': user
                }
                socket.init(userData);
                this.$el.html(this.template(userData));
                
            }
            else{
                Backbone.history.navigate('login', {trigger: true});                
            }
            return this;
        },

        sendMessage: function(){
            socket.sendMessage();
        },

        show: function () {
            this.$el.show();            
            this.trigger("show", this);
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View({model: User});
});
