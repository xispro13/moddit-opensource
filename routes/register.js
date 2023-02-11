const path = require("path")

module.exports = function({app}) {
	app.get('/register', (req,res) => {
		res.sendFile('register.html', { root: path.join(__dirname, '../views/') })
	})
}
