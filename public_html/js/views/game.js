define([
	'backbone',
	'game/socket',
	'tmpl/game',
	'models/userProfile',
	'game/gamePlay'
], function (Backbone,
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
			var user = User.get('login');
			if (user) {
				var userData = {
					'login': user
				};
				// socket.init(userData);
				console.log('in game.js gamestarted: ' + gamePlay.gameStarted);
				this.$el.html(this.template(userData));
				var canvas = document.getElementById('gamefield');
				if (gamePlay.gameStarted === false) {
					console.log("gameStarted");
					gamePlay.start(canvas);
					console.log('in if' + gamePlay.gameStarted);
				}
				//else{
				//	Backbone.history.navigate('', {trigger: true});			
				//}
			}
			else {
				Backbone.history.navigate('login', {trigger: true});
			}
			return this;
		},

		restart: function () {
			console.log("restart!");
			this.render();
		},

		show: function () {
			console.log(this.started);
			if (this.started == false) {
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
