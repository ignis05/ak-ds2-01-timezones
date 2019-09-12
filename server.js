var zones = require('./zones.json')
var http = require('http')
var AutoRouting = require('./modules/AutoRouting')
const routing = new AutoRouting(`./time_zones.html`, [
	{ url: '/selected', path: './selected.html' },
	{ url: '/zones', path: './zones.json' }
])

var server = http.createServer(function(req, res) {
	switch (req.method) {
		case 'GET':
			routing.get(req, res)
			break
		case 'POST':
			switch (req.url) {
			}
			break
		default:
			break
	}
})
server.listen(3000, () => {
	console.log('server started on port 3000')
})
