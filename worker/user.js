const crypto = require("crypto")

function hash(pass) {
    return crypto.createHash('sha256').update(pass).end().digest('hex');
}
module.exports = ({app, db}) => {
	app.get('/worker/user', (req, res) => {
		const q = req.query;

		if (!db.exists(q.username)) return res.json({error: true, reason: 'User does not exist.'})
        const {
            tokens,
            creation,
            lastlogin,
            claim,
            username,
            role,
            blooks,
            packsopened,
            messagessent
        } = db.get(q.username);
		return res.json({
            tokens,
            creation,
            lastlogin,
            claim,
            username,
            role,
            blooks,
            packsopened,
            messagessent
        })
	})
}
