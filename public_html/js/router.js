define([
    'backbone',
    'views/game',
    'views/main',
    'views/login',
    'views/scoreboard',
    'views/register',
    'views/manager'
], function(
    Backbone,
    gamePage,
    mainPage,
    loginPage,
    ScoreboardPage,
    registerPage,
    viewManager
){
    var $page = $('.page');

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'register': 'registerAction',
            '*default': 'defaultActions'
        },

        views: {},
	
	initialize: function () {

            viewManager.addView();
            viewManager.addView(loginPage);
            viewManager.addView(mainPage);
            viewManager.addView(gamePage);
            viewManager.addView(registerPage);
        },

        defaultActions: function () {
            mainPage.show();
        },

        scoreboardAction: function () {\
            if (!this.views.scoreboard) {

                var scoreboardView = new ScoreboardPage();
                $page.append(scoreboardView.$el);
            }
            scoreboardPage.show();
        },

        gameAction: function () {
            gamePage.show();
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
