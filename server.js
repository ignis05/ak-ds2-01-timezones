var http = require('http')
var AutoRouting = require('./modules/AutoRouting')
const routing = new AutoRouting(`./pages/time_zones.html`, [
	{ url: '/selected', path: './pages/selected.html' },
	{ url: '/zones', path: './data/zones.json' },
])

var selectedTimezones = []

var server = http.createServer(function(req, res) {
	switch (req.method) {
		case 'GET':
			routing.get(req, res)
			break
		case 'POST':
			switch (req.url) {
				case '/getSelected':
					getSelected(req, res)
					break
				case '/updateSelected':
					updateSelected(req, res)
					break
			}
			break
		default:
			break
	}
})
function getSelected(req, res) {
	var allData = ''
	req.on('data', data => {
		allData += data
	})
	req.on('end', async () => {
		var data = JSON.parse(allData)
		console.log(data)
		res.end(JSON.stringify({ msg: 'OK', data: selectedTimezones }))
	})
}
function updateSelected(req, res) {
	var allData = ''
	req.on('data', data => {
		allData += data
	})
	req.on('end', async () => {
		var data = JSON.parse(allData)
		console.log(data)

		if (!data.data.value) {
			res.end(JSON.stringify({ msg: 'ERROR' }))
		}

		if (data.status) {
			selectedTimezones.push(data.data)
		} else {
			selectedTimezones.splice(
				selectedTimezones.findIndex(el => el.value === data.data.value),
				1
			)
		}

		res.end(JSON.stringify({ msg: 'OK', data: selectedTimezones }))
	})
}
server.listen(3000, () => {
	console.log('server started on port 3000')
})
