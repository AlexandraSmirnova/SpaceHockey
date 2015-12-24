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

		render: function () {
			var user = User.get('login');
			if (user) {
				var userData = {
					'login': user
				};
				this.$el.html(this.template(userData));
				var canvas = document.getElementById('gamefield');
				if (gamePlay.gameStarted === false) {
					gamePlay.start(canvas);
				}
			}
			else {
				Backbone.history.navigate('login', {trigger: true});
			}
			return this;
		},

		restart: function () {
			this.render();
		},

		show: function () {
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
