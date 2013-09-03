/** by Celso O. Junior */

(function() {

	var pool = [];

	function Socket(url, port) {
		
		this.isInmate = true;
		this.url = "ws://" + url + ":" + port + "/";
		this.received;
	}

	Socket.prototype = {

		send : function(string) {
			if (!this.isInmate)
				for (p in pool)
					if (pool[p].id == this.id)
						pool[p].socket.send(string);
			else
				console.error("This connection has been terminated or closed.");
		},
				
		start: function() {
			
			var self = this;
			var socket = new WebSocket(this.url);
	
			socket.onopen = function(evt) {
				self.isInmate = false;
				self.id = "WS" + new Date().getTime();
	
				pool.push({
					id : self.id,
					socket : socket
				});
			};
	
			socket.onmessage = this.received;
		}
	};
	
	window.Connect = Socket;

})();