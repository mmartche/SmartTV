var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

/** by Celso O. Junior */

var Launch = (function() {

	var conn = window.pumpikin = new Connect("105.103.70.50", "8887");
	 
	conn.received = function(json) {
		
		var object = jQuery.parseJSON(json.data);
		console.log(json.data);
		
		switch(object.state) {
			case 'open' :
			
				console.remote = true;
				console.log("Ancorado no servidor.");
				
				break;

			case 'exchange' :
				if (object.action == 'selectItem') {
					var properties = object.css;

					for (var i = 0; i < properties.length; i++) {
						$(object.whom).css(properties[i].property, properties[i].value);
					}
					
					var obj = $(object.whom).getStyleObject();
					var str = $.toJSON(obj);
					
					alert(str);
					
					conn.send('{"call":"CSSINSPECTOR", "style":' + str + '}');
				}
				break;
		}
		
	};
		
	function onKeyDown() {
		var keyCode = event.keyCode;
		
		var serializer = new XMLSerializer();
		var htmlstring = serializer.serializeToString(document).replace(/\s+/g, ' ');
		
		conn.send('{"call":"DOM", "structure":"' + htmlstring.replace(/"/g, '\\"') + '"}');
	}

	function init() {
		document.getElementById("anchor").focus();
		widgetAPI.sendReadyEvent();
		conn.start();
	}

	return {
		'init' : init,
		'onKeyDown' : onKeyDown
	};

})();

window.onload = Launch.init;