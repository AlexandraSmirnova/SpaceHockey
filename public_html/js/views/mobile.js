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

	/*window.addEventListener('orientationchange',function () {
			if (window.orientation%180===0) {
				console.log("portrait");
				// portrait
			} else {
				console.log("landscape");
				// landscape
			}
	});*/

	var View = Backbone.View.extend({
		template: tmpl,
		started: false,

		events: {
			"click .submit-btn": "restart"
			//"orientationchange": "changeTmpl"		
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
			//if(!Modernizr.deviceorientation || !Modernizr.devicemotion || !Modernizr.touchevents) {
			if(!Modernizr.deviceorientation || !Modernizr.devicemotion) {
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
				console.log(gamePlay.gameStarted);
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

		/*changetmpl: function(){
			if (window.orientation%180===0) {
				console.log("portrait");
				// portrait
			} else {
				console.log("landscape");
				// landscape
			}
		},*/

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
