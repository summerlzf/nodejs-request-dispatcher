# nodejs-request-dispatcher

It is a simple nodejs project that shows how request dispatch to specific handler in dispatcher.js

<pre>
in function DispatcherHandler(), we use json construction as follows:
<i>
	this.user = {
		__default: function(req) { // handle default /user or /user/
			// ... [url]: /user
		},
		get: function(req) {
			// ... [url]: /user/get
		},
		info: function(req) {
			// ... [url]: /user/info
		},
		jacky: {
			age: function(req) {
				// ... [url]: /user/jacky/age
			}
		}
	};
</i>
to match counter request URL, and it is something like <b>ReSTful</b> API.
</pre>
