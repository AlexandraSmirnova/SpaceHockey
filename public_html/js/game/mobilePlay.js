define([
	'backbone',
	'game/gameWebSocket',
	'models/userProfile'
], function (Backbone,
			 gameWebSocket,
			 User) {


	var context;
	var CANVAS_WIDTH;
	var CANVAS_HEIGHT;
	var ws = undefined;
	var alphaLeft;
	var alphaRight;

	window.addEventListener('deviceorientation', function(event) {
		if(event.alpha) {
			var alphaX = event.alpha;
			if(alphaX > 20 && !alphaLeft) {
				alphaLeft = true;
				alphaRight = false;
			} else if(alphaX < -20 && !alphaRight) {
				alphaRight = true;
				alphaLeft = false;
			} else {
				//console.log('mid® 20');
				alphaLeft = false;
				alphaRight = false;
			}
		}
	});

	var orientationchange = function () {
		console.log("orientation: " + window.orientation);
		var gameF = $(".score");
		if (window.orientation%180==0) {
			var header = $(".header");
			header.hide();
			gameF.style.width = "100%";
			gameF.style.height = "100%";
		} else {
			gameF.style.width = "50%";
			gameF.style.height = "50%";
			// landscape
		}
	};

	window.addEventListener('orientationchange', orientationchange);

	function PlayField(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;

		this.draw = function () {
			context.strokeStyle = this.color;
			context.strokeRect(this.x, this.y, this.width, this.height);
		};
		this.clear = function () {
			context.clearRect(this.x, this.y, this.width, this.height);
		}
	}

	function Platform(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.draw = function () {
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	function Ball(centerX, centerY, radius) {
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
		this.image = new Image();
		this.image.src = 'img/ball.png';

		this.draw = function () {
			context.drawImage(this.image,this.centerX-this.radius,this.centerY-this.radius, 20, 20);
		};
	}

	var gameField = new PlayField(40, 40, 500, 630, "green");
	var myPlatform = new Platform(235, 80, 100, 20, "red");
	var enemyPlatform = new Platform(235, 610, 100, 20, "red");
	var ball = new Ball(100, 100, 10);
	var left = false, right = false, send = false;



	function draw() {
		gameField.clear();
		gameField.draw();
		myPlatform.draw();
		enemyPlatform.draw();
		ball.draw();
	}

	function update() {
		if (alphaLeft && !right) {
			left = true;
			right = false;
			if (!send) {
				var message = {
					"status": "movePlatform",
					"direction": "LEFT"
				}
				gameWebSocket.sendMessage(ws, JSON.stringify(message));
				send = true;
			}
		}
		if (!alphaLeft && left) {
			left = false;
			send = false;
			var message = {
				"status": "movePlatform",
				"direction": "STOP"
			}
			gameWebSocket.sendMessage(ws, JSON.stringify(message));
		}
		if (alphaRight && !left) {
			right = true;
			left = false;
			if (!send) {
				var message = {
					"status": "movePlatform",
					"direction": "RIGHT"
				}
				gameWebSocket.sendMessage(ws, JSON.stringify(message));
				send = true;
			}
		}
		if (!alphaRight && right) {
			right = false;
			send = false;
			var message = {
				"status": "movePlatform",
				"direction": "STOP"
			}
			gameWebSocket.sendMessage(ws, JSON.stringify(message));
		}
	}



	var Game = Backbone.View.extend({
		gameStarted: false,
		playerName: null,

		start: function(canvas) {
			this.gameStarted = true;
			this.playerName = User.get("login");
			ws = gameWebSocket.initConnect();
			console.log(this.gameStarted);
			console.log("INIT CONNECT");
			this.analizeMessage();
			var FPS = 60;
			CANVAS_WIDTH = canvas.width;
			CANVAS_HEIGHT = canvas.height;
			context = canvas.getContext('2d');

			setInterval(function () {
				update();
				draw();
			}, 1000 / FPS);
		},

		analizeMessage: 	function() {
			var self = this;

			ws.onmessage = function (event) {
				var data = JSON.parse(event.data);
				if (data.status == "worldInfo") {
					myPlatform.x = parseInt(data.first.positionX, 10);
					enemyPlatform.x = parseInt(data.second.positionX, 10);
					ball.centerX = parseInt(data.ball.positionX, 10);
					ball.centerY = parseInt(data.ball.positionY, 10);
				}
				if (data.status == "start" && data.second.name != data.first.name) {
					$(".wait").hide();
					$(".gameplay").show();

					$(".firstPlayer").html(data.first.name);
					$(".secondPlayer").html(data.second.name);

				}
				if (data.status == "finish") {
					console.log(data);
					$(".gameOver").show();
					$(".gameplay").hide()
					if (data.gameState == 0)
						$(".gameOver__winner").html("dead heat!");
					else if (data.gameState == 1)
						$(".gameOver__winner").html("first winner!");
					else if (data.gameState == 2)
						$(".gameOver__winner").html("second winner!");
					if(data.first.name == self.playerName)
						$(".gameOver__score").html("wwr!");
					else
						$(".gameOver__score").html("2!");
					self.gameStarted = false;
				}
				if (data.status == "incrementScore") {
					$(".myScore").html(data.first.score);
					$(".enemyScore").html(data.second.score);
				}
			}
		}
	});

	return new Game();
});