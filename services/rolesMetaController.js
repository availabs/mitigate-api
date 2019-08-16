module.exports = {
    select: (db_service) => {
        const sql = `
			SELECT *
			FROM roles.roles_meta
		`
        console.log(sql)
        return db_service.promise(sql);
    },
}