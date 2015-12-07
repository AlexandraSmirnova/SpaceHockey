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


		events: {
			"click .win_button": "sendMessage"
		},

		initialize: function () {
			this.render();
			var self = this;
			this.listenTo(User, 'change', function () {
				self.render();
			});
		},

		render: function () {
			var user = User.get('login');
			if (user) {
				var userData = {
					'login': user
				};
				// socket.init(userData);
				this.$el.html(this.template(userData));
				var canvas = document.getElementById('gamefield');
				gamePlay.start(canvas);
			}
			else {
				Backbone.history.navigate('login', {trigger: true});
			}
			return this;
		},

		sendMessage: function () {
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
