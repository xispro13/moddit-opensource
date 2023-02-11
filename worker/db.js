module.exports = ({app, db, env}) => {
	app.get('/db', (req, res) => {
        if (req.query.pass !== env.DB_PASS) return res.json({ error: true, reason: 'Invalid db pass. Your ip is logged.'})
        return res.json(db.raw())
    })
}
