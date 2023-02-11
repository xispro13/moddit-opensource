const crypto = require("crypto")

function hash(pass) {
    return crypto.createHash('sha256').update(pass).end().digest('hex');
}
module.exports = ({app, db}) => {
	app.post('/worker/register', (req, res) => {
		const { username, password } = req.body;
		if (username.length > 16) {
			return res.json({error: true, reason: 'Username too long. Max length is 16 characters.'})
		} else if (username.length < 1) {
			return res.json({error: true, reason: 'Username empty.'})
		}

		const valid = Array.from(username).every(l => /[a-zA-Z\d_$-]/.test(l))
		const valed = Array.from(username).map(k => /[a-zA-Z\d_$-]/.test(k) ? k : "-").join("")
		if (!valid) return res.json({error: true, reason: "Invalid username. Maybe change it to ${valed}"})

		if (db.exists(username)) {
			return res.json({error: true, reason: "That username is taken."})
		}

		db.create(username);
		db.set(username, {
			tokens: ~~(Math.random() * 70),
			creation: Date.now(),
			lastlogin: Date.now(),
			claim: 0,
			username: username,
			password: hash(password),
			banned: 0,
			muted: 0,
			role: 'Basic',
			perm: 1,
			blooks: {Moddit:1},
			packsopened: 0,
			messagessent: 0,
			ip: req.ip
		})
		return res.json({error: false})
	})
}
