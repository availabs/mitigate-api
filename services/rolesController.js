const cols = [
    "contact_name",
    "contact_email",
    "contact_phone",
    "contact_address",
    "contact_title_role",
    "contact_department",
    "contact_agency",
    "contact_municipality",
    "contact_county",
    "associated_plan"
]

const length = db_service => {
    const sql = `
		SELECT count(1) AS length
		FROM roles.roles
	    `
    return db_service.promise(sql)
        .then(rows => rows.pop().length)
}

module.exports = {
    cols,

    insert: (db_service, args) => {
        const sql = `
        INSERT INTO roles.roles(${cols})
        VALUES (${args.map( (a,i) => `$${i+1}`)})
        returning *
        `;
        console.log(sql)
        args = args.map(arg => arg === null ? null : arg.value || arg)
        return db_service.promise(sql, args)
            .then(rows => {
                return length(db_service)
                    .then(length => [length, rows.pop()])
            })
    },

    remove: (db_service, ids) => {
        const sql = `
			DELETE FROM roles.roles
			WHERE id IN (${ ids })
		`
        console.log(sql)
        return db_service.promise(sql)
            .then(() => length(db_service));
    },

    byId: (db_service, ids) => {
        const sql = `
			SELECT *
			FROM roles.roles
			WHERE id IN (${ ids })

		`
        console.log(sql)
        return db_service.promise(sql);
    },
    
    update: (db_service, updates) => {
        return Promise.all(
            Object.keys(updates)
                .map(id => {
                    const keys = Object.keys(updates[id]).filter(key => !['id'].includes(key)),
                        sql = `
							UPDATE roles.roles
							SET ${ keys.map((key, i) => `${ key } = $${ i + 1 }`) }
							WHERE id = $${ keys.length + 1 }
							RETURNING *;
						`,
                        args = [
                            ...keys.map(key => updates[id][key] === null ? null : updates[id][key].value || updates[id][key]),
                            id
                        ]
                    console.log(sql)
                    return db_service.promise(sql, args);
                })
        )
            .then(results => [].concat(...results));
    },

}