define([
    'backbone',
    'views/game',
    'views/main',
    'views/login',
    'views/scoreboard'
], function(
    Backbone,
    game,
    main,
    login,
    scoreboard
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            main.render();
        },
        scoreboardAction: function () {
            //scoreboard.initialize();
            scoreboard.render();
        },
        gameAction: function () {
            game.render();
        },
        loginAction: function () {
            login.render();
        }
    });

    return new Router();
});
