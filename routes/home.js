const path = require("path")

module.exports = function({app}) {
	app.get('/', (req,res) => {
		res.sendFile('home.html', { root: path.join(__dirname, '../views/') })
	})
}
