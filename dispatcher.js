/**
 * return specfied JSON object
 */
var out = function(succ, data) {
	return {message: succ ? 'success' : 'fail', success: !!succ, data: data || {}};
};

function Dispatcher() {

	this.__unexpect = function(req) {
		console.log('this is the unexpected request: ' + req.url);
		return out(false, {url: req.url});
	};

	this.__default = function(req) {
		console.log('this is the default request: /');
		return out(true, {url: '/', params: req.params});
	};

}

/**
 * Request Dispatcher Handler
 */
function DispatcherHandler() {

	Dispatcher.apply(this);

	this.test = function(req) {
		console.log('this is the request: /test');
		return out(true, {url: '/test', params: req.params, now: new Date().toString()});
	};

	this.user = {
		__default: function(req) { // handle default /user or /user/
			console.log('this is the request: /user/');
			return out(true, {url: '/user/', params: req.params, now: new Date().toString()});
		},
		get: function(req) {
			console.log('this is the request: /user/get');
			// response json
			return out(true, {url: '/user/get', params: req.params, now: new Date().toString()});
		},
		info: function(req) {
			console.log('this is the request: /user/info');
			// response html
			return {html: '<h2>this is the request: /user/info<br>Now: ' + new Date().toString() + '<h2>'};
		},
		jacky: {
			age: function(req) {
				console.log('this is the request: /user/jacky/age');
				return {html: 'Age: 23'};
			}
		}
	};

	this.item = {
		get: function(req) {
			console.log('this is the request: /item/get');
			return out(true, {url: '/item/get', params: req.params, now: new Date().toString()});
		}
	};

}

exports.dispatcher = new DispatcherHandler();
