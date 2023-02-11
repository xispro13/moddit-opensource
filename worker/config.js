module.exports = ({app}) => {
	app.get('/worker/config', (req, res) => {
		res.json(require('../game-config.js'))
	})
}
