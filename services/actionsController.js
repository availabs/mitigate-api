const ATTRIBUTES = [
    "project_name",
    "project_number",
    "county",
    "cousub",
    "hazard_of_concern",
    "problem_description",
    "solution_description",
    "critical_facility",
    "protection_level",
    "useful_life",
    "estimated_cost",
    "estimated_benefits",
    "priority",
    "estimated_implementation_time",
    "organization_responsible",
    "desired_implementation_time",
    "funding_source",
    "planning_mechanism",
    "alternative_action_1",
    "alternative_estimated_cost_1",
    "alternative_evaluation_1",
    "alternative_action_2",
    "alternative_estimated_cost_2",
    "alternative_evaluation_2",
    "alternative_action_3",
    "alternative_estimated_cost_3",
    "alternative_evaluation_3",
    "date_of_report",
    "progress_report",
    "updated_evaluation",
    "id",
    "as_json"

]

const length = db_service => {
    const sql = `
		SELECT count(1) AS length
		FROM actions.actions_worksheet
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
			FROM actions.actions_worksheet
		`
        return db_service.promise(sql);
    },


    get: (db_service, ids) => {

        const sql = `
			SELECT *
			FROM actions.actions_worksheet
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
							UPDATE actions.actions_worksheet
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
			INSERT INTO actions.actions_worksheet(${ ATTRIBUTES.slice(0,ATTRIBUTES.length -2) })
				VALUES (${ ATTRIBUTES.slice(0,ATTRIBUTES.length -2).map((attr, i) => `$${ i + 1 }`) })
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
			DELETE FROM actions.actions_worksheet
			WHERE id IN (${ ids });
		`;

        return db_service.promise(sql)
            .then(() => length(db_service))
    }

}