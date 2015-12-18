define([
	'backbone',
	'views/game',
	'views/mobile',
	'views/main',
	'views/login',
	'views/scoreboard',
	'views/register',
	'views/manager'
], function (Backbone,
             gamePage,
             mobilePage,
             mainPage,
             loginPage,
             scoreboardPage,
             registerPage,
             viewManager) {

	var Router = Backbone.Router.extend({
		routes: {
			'scoreboard': 'scoreboardAction',
			'game': 'gameAction',
			'mobile': 'mobileAction',
			'login': 'loginAction',
			'register': 'registerAction',
			'*default': 'defaultActions'
		},

		initialize: function () {
			viewManager.addView(scoreboardPage);
			viewManager.addView(loginPage);
			viewManager.addView(mainPage);
			viewManager.addView(gamePage);
			viewManager.addView(mobilePage);
			viewManager.addView(registerPage);
		},

		defaultActions: function () {
			mainPage.show();
		},

		scoreboardAction: function () {
			scoreboardPage.show();
		},

		gameAction: function () {
			gamePage.show();
		},

		mobileAction: function () {
			mobilePage.show();
		},

		loginAction: function () {
			loginPage.show();
		},

		registerAction: function () {
			registerPage.show();
		}
	});

	return new Router();
});
