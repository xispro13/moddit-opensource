const crypto = require("crypto")

function hash(pass) {
    return crypto.createHash('sha256').update(pass).end().digest('hex');
}
module.exports = ({app, db}) => {
	app.get('/worker/delete', (req, res) => {
		const { username, password } = req.query;
		if (hash(password) !== db.get(username).password) return res.json({ error: true, reason: 'Incorrect password.' });

		db.delete(username)
		return res.json({error: false})
	})
}
