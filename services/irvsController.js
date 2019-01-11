module.exports = {
	getMeta: (db_service, options) => {
		const sql = `
			SELECT names.column_id AS option,
				name,
				ARRAY_AGG(value) AS values
			FROM irvs.irvs_names AS names
			INNER JOIN irvs.irvs_values AS values
			ON names.column_id = values.column_id
			WHERE names.column_id IN ('${ options.join(`', '`) }')
			GROUP BY names.column_id, names.name
		`
// console.log("SQL:",sql)
		return db_service.promise(sql);
	}
}