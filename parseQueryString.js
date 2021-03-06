( function() {
	function queryStringConstructor() {
		this.params = {};
		var qs = location.search.substring(1, location.search.length),
		i = 0,
		args;
		if (qs.length > 0) {
			// Turn <plus> back to <space>
			// See:
			// http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
			qs = qs.replace(/\+/g, ' ');
			// parse out name/value pairs separated via &
			args = qs.split('&');
			// split out each name=value pair
			for ( i = 0; i < args.length; i = i + 1) {
				var pair = args[i].split('=');
				var name = decodeURIComponent(pair[0]);
				var value = (pair.length === 2) ? decodeURIComponent(pair[1]) : null;
				this.params[name] = value;
			}
		}
		return this;
	}
	function parseQueryString() {
		return new queryStringConstructor(arguments);
	}

	queryStringConstructor.prototype = {
		getValue : function(key, defaultText) {
			var value = this.params[key];
			return (value !== null) ? value : defaultText;
		},
		contains : function(key) {
			var value = this.params[key];
			return (value !== null);
		},
		getKeys : function() {
			var keys = [],
			key;
			for ( key in this.params) {
				keys.push(key);
			}
			return keys;
		}
	}

	window.parseQueryString = parseQueryString;
})();