define([
    'backbone',
    'models/score',
    'syncs/sync',
    'utils/ajax'
    ], function(
    Backbone,
    PlayerModel,
    sync,
    ajax
){

        
    
    var PlayerCollection = Backbone.Collection.extend({
        model: PlayerModel,
        url: '/score?limit=10',
        sync: sync,

        comparator: function (playerA, playerB) {
            var scoreDiff = playerB.get('score') - playerA.get('score');
            if (scoreDiff === 0) {
            return playerA.get('name') < playerB.get('name') ? -1 : 1;
            }
            return scoreDiff;
        }
    });
    var players = [];

    $.when(ajax.sendAjax({},"/score?limit=10", "GET")).then(
                function(response){                 
                    response =  JSON.parse(response);                   
                    console.log(response.status)
                    if(response.status == "200"){                
                        for(i = 0; i < response.body.scoreList.length; i++) {
                            console.log(response.body.scoreList[i]);
                            players.push(response.body.scoreList[i]);
                            console.log(players[i]);
                        }
                    }
                },
                function (error) {
                    console.log(error.statusText);
                }
            ); 
    console.log(players);
    var playerCollection = new PlayerCollection(players);
    //playerCollection.fetch();
    return playerCollection;
});
