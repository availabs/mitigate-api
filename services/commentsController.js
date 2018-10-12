module.exports = {

	length: db_service => {
		const sql = `
			SELECT count(1) AS length
			FROM public.comments;
		`
		return db_service.promise(sql)
			.then(rows => +rows[0].length)
	},

	commentIds: db_service => {
		const sql = `
			SELECT id
			FROM public.comments
		`
		return db_service.promise(sql);
	},

	commentsById: (db_service, ids) => {
		const sql = `
			SELECT
				name,
				email,
				comment,
				id,
				created_at::TEXT
			FROM public.comments
			WHERE id IN (${ ids });
		`
		return db_service.promise(sql)
	},

	post: (db_service, args) => {
		const sql = `
			INSERT INTO public.comments(name, email, comment)
			VALUES ($1, $2, $3)
			RETURNING *;
		`
		return db_service.promise(sql, args)
			.then(rows => rows[0])
	},

	remove: (db_service, ids) => {
		const sql = `
			DELETE FROM public.comments
			WHERE id IN (${ ids });
		`
		return db_service.promise(sql);
	}

}