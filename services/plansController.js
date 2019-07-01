const ATTRIBUTES = [
    "fips",
    "plan_consultant",
    "plan_expiration",
    "plan_grant",
    "plan_url",
    "plan_status",
    "groups",
    "id",

]

const length = db_service => {
    const sql = `
		SELECT count(1) AS length
		FROM plans.county
	    `
    return db_service.promise(sql)
        .then(rows => rows.pop().length)
}


module.exports = {
    ATTRIBUTES,

    length,

    byIndex: db_service => {
        const sql = `
			SELECT id
			FROM plans.county
		`
        return db_service.promise(sql);
    },


    get: (db_service, ids) => {

        const sql = `
			SELECT *
			FROM plans.county
			WHERE id IN (${ ids })
		`
        return db_service.promise(sql);
    },


    update: (db_service, updates) => {
        return Promise.all(
            Object.keys(updates)
                .map(id => {
                    const keys = Object.keys(updates[id]).filter(key => !['id'].includes(key)),
                        sql = `
							UPDATE plans.county
							SET ${ keys.map((key, i) => `${ key } = $${ i + 1 }`) }
							WHERE id = $${ keys.length + 1 }
							RETURNING *;
						`,
                        args = [
                            ...keys.map(key => updates[id][key] === null ? null : updates[id][key].value || updates[id][key]),
                            id
                        ]
                    return db_service.promise(sql, args);
                })
        )
            .then(results => [].concat(...results));
    },


    insert: (db_service, args) => {
        const sql = `
			INSERT INTO plans.county(${ ATTRIBUTES.slice(0,ATTRIBUTES.length -1) })
				VALUES (${ ATTRIBUTES.slice(0,ATTRIBUTES.length -1).map((attr, i) => `$${ i + 1 }`) })
				RETURNING *;
		`
        args = args.map(arg => arg === null ? null : arg.value || arg)

        return db_service.promise(sql, args)
            .then(rows => {
                return length(db_service)
                    .then(length => [length, rows.pop()])
            })
    },

    remove: (db_service, ids) => {
        const sql = `
			DELETE FROM plans.county
			WHERE id IN (${ ids });
		`;
        return db_service.promise(sql)
            .then(() => length(db_service))
    }

}