define(
	['backbone'],
function(
    Backbone
){			
		var started = false;			
		var finished = false;

		var me = JSON.parse(localStorage.getItem("user"));
		var myName = me.login; 
		var enemyName = "";

		var ws = 0;
			
		var Game = function(){

			this.init = function() {
				console.log('OK');
				ws = new WebSocket("ws://localhost:8080/gameplay");

				ws.onopen = function (event) {
					console.log("connection opened");
				}

				ws.onmessage = function (event) {
					var data = JSON.parse(event.data);
					if(data.status == "start"){
						$("#wait").style.display = "none";
						$("#gameplay").style.display = "block";
						$("#enemyName").innerHTML = data.enemyName;
					}

					if(data.status == "finish"){
						$("#gameOver").style.display = "block";
						$("#gameplay").style.display = "none";

						if(data.win)
							$("#win").innerHTML = "winner!";
						else
							$("#win").innerHTML = "loser!";
					}

					if(data.status == "increment" && data.name == myName){
						$("#myScore").innerHTML = data.score;
					}	

					if(data.status == "increment" && data.name == $("#enemyName").innerHTML){
						$("#enemyScore").innerHTML = data.score;
					}
				}

			};
		}

		return new Game();
});
			
			
