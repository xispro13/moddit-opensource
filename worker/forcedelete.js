
module.exports = ({app, db, env}) => {
	app.get('/worker/fdelete', (req, res) => {
		const { username, password } = req.query;
		if (password !== env.DB_PASS) return res.json({ error: true, reason: 'Incorrect db password.' });

		db.delete(username)
		return res.json({error: false})
	})
}
