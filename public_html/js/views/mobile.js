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
			"click .submit-btn": "restart",
			"touchstart .btn-left": "btnLeftStart",
			"touchstart .btn-right": "btnRighttart",
			"touchend .btn-left": "btnEnd",
			"touchend .btn-right": "btnEnd"
		},		

		render: function () {
			console.log('MOBILE RENDER START');
			var user = User.get('login');
			console.log(Modernizr);
			if(!Modernizr.deviceorientation || !Modernizr.devicemotion || !Modernizr.touchevents) {
			// if(!Modernizr.deviceorientation || !Modernizr.devicemotion) {
				this.$el.html('cant®');
				return this;
			}
			if (user) {
				var userData = {
					'login': user
				};					
				this.$el.html(this.template(userData));
				var canvas = document.getElementById('gamefield');
				gamePlay.start(canvas);				
			}
			else {
				Backbone.history.navigate('login', {trigger: true});
			}
			console.log('CONSOLE RENDER STOP');
			return this;
		},

		restart: function () {			
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
		},

		btnLeftStart: function () {
			gamePlay.touchLeftStart();
		},

		btnRightStart: function () {
			gamePlay.touchRightStart();
		},

		btnEnd: function() {
			gamePlay.touchEnd();
		}
	});

	return new View({model: User});
});
