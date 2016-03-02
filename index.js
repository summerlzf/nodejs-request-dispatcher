var http = require('http');
var dispatcher = require('./dispatcher.js').dispatcher;

http.createServer(function(req, res) {
	try {
		req.url != '/favicon.ico' && handle(req, res);
		// handle(req, res);
	} catch(e) {
		var err = '\n[Error] ' + new Date().toString() + ' ' + req.url;
		err += '\n' + (e.stack || e.message || 'Unknown Error') + '\n';
		console.log(err);
		res.end('<pre>' + err + '</pre>');
	}
}).listen(9898);

function handle(req, res) {
	console.log('\nurl: ' + req.url + '   time: ' + new Date().toString());
	var url = req.url, params = null, ctx = '/nodejs'; // context path (defined by user)
	if(url.indexOf('#') > -1) {
		url = url.substr(0, url.indexOf('#')); // isolate #
	}
	if(url.indexOf('?') > -1) {
		params = url.substr(url.indexOf('?') + 1).split('&');
		url = url.substr(0, url.indexOf('?'));
	}
	if(url.indexOf(ctx) > -1) {
		url = url.substr(ctx.length); // handle context path
	}
	// fill parameters to req object
	var ps = {};
	params && params.forEach(function(p) {
		ps[p.split('=')[0]] = p.split('=')[1];
	});
	req['params'] = ps;

	// translate URL to method of dispatcher
	var df = url == '/' || url.lastIndexOf('/') == url.length - 1 ? '__default' : '';
	var fn = eval('dispatcher' + url.replace(/\//g, '.') + df);
	if(fn && !(fn instanceof Function)) {
		fn = fn['__default'];
	}
	var json = fn ? fn(req) : dispatcher.__unexpect(req);

	var html = json ? json.html : '<h1>Error</h1>';
	res.writeHead(200, {'Content-Type': 'text/' + (html ? 'html' : 'plain') + ';charset=utf-8'});
	res.end(html || JSON.stringify(json));
}

console.log('NodeJS Server start ...');