define([
	'models/userProfile'
], function (userModel) {
	console.log('GAMEWEBSOCKET');
	function initConnect() {
		console.log("entered gamewebsocket initconnect");
		var ws = new WebSocket("ws://localhost:8080/gameplay");
		ws.onopen = function () {
			console.log("Open");
		};
		//var playerName = null;
//		var enemyName = "";
		ws.onclose = function () {
			console.log('connection closed');
		};

		return ws;
	}

	function sendMessage(ws, message) {
		ws.send(message);
	}

	return {
		initConnect: initConnect,
		sendMessage: sendMessage
	};
});