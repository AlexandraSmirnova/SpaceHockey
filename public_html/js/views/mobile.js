define([
	'backbone',
	'modernizr',
	'game/socket',
	'tmpl/mobile',
	'models/userProfile',
	'game/mobilePlay'
], function (Backbone,
             Modernizr,
             socket,
             tmpl,
             User,
             gamePlay) {

	var View = Backbone.View.extend({
		template: tmpl,
		started: false,

		events: {
			"click .submit-btn": "restart"
		},

		initialize: function () {
			//this.render();
			//var self = this;
			//this.listenTo(User, 'change', function () {
				//self.render();
			//});
		},

		render: function () {
			console.log('MOBILE RENDER START');
			var user = User.get('login');
			console.log(Modernizr);
			if(!Modernizr.deviceorientation || !Modernizr.devicemotion || !Modernizr.touchevents) {
				this.$el.html('cant®');
				return this;
			}
			if (user) {
				var userData = {
					'login': user
				};
				// socket.init(userData);
				console.log(gamePlay.gameStarted);
				this.$el.html(this.template(userData));
				var canvas = document.getElementById('gamefield');
				//if(gamePlay.gameStarted == false){
				console.log("gameStarted");
				gamePlay.start(canvas);
				console.log(gamePlay.gameStarted);
				//}
				//else{
				//	Backbone.history.navigate('', {trigger: true});
				//}
				console.log("piu");
			}
			else {
				Backbone.history.navigate('login', {trigger: true});
			}
			console.log('CONSOLE RENDER STOP');
			return this;
		},

		restart: function () {
			console.log("restart!");
			this.render();
		},

		show: function () {
			if(this.started == false) {
				this.render();
			}
			this.started = true;
			this.$el.show();
			this.trigger("show", this);
		},
		hide: function () {
			this.$el.hide();
		}

	});

	return new View({model: User});
});
