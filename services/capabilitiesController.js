const ATTRIBUTES = [
	"name",
	"description",
	"contact",
	"contact_email",
	"contact_title",
	"contact_department",
	"agency",
	"partners",
	"status_new_shmp",
	"status_carryover_shmp",
	"status_in_progess",
	"status_on_going",
	"status_unchanged",
	"status_completed",
	"status_discontinued",
	"admin_statewide",
	"admin_regional",
	"admin_county",
	"admin_local",
	"file_type_shp",
	"file_type_lat_lon",
	"file_type_address",
	"file_type_not_tracked",
	"budget_provided",
	"primary_funding",
	"secondary_funding",
	"num_staff",
	"num_contract_staff",
	"hazards",
	"capability_mitigation",
	"capability_preparedness",
	"capability_response",
	"capability_recovery",
	"capability_climate",
	"capability_critical",
	"capability_preservation",
	"capability_environmental",
	"capability_risk_assessment",
	"capability_administer_funding",

	"funding_amount",

	"capability_tech_support",
	"capability_construction",
	"capability_outreach",
	"capability_project_management",
	"capability_research",
	"capability_policy",
	"capability_regulatory",
	"related_policy",
	"url",
	"goal",
	"objective",

	"priority",
	"priority_1",
	"priority_2",
	"priority_3",
	"priority_4",
	"priority_5",
	"priority_6",
	"priority_7",
	"priority_total",

	"benefit_cost_analysis",

	"engineering_required",
	"engineering_complete",

	"type",

	"municipality",
	"county",

	"capability_resiliency",

	"repetitive_loss",

	"origin_plan_name",
	"origin_plan_year",

	"funding_received",

	"design_percent_complete",
	"scope_percent_complete",

	"status_proposed",

	"start_date",
	"completed_date",

	"justification",
	
	"id",
	"created_at",
	"updated_at"
]

const length = db_service => {
	const sql = `
		SELECT count(1) AS length
		FROM public.capabilities
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
			FROM public.capabilities
		`
		return db_service.promise(sql);
	},

	get: (db_service, ids) => {
		const sql = `
			SELECT *
			FROM public.capabilities
			WHERE id IN (${ ids })
		`
		return db_service.promise(sql);
	},

	update: (db_service, updates) => {
		return Promise.all(
			Object.keys(updates)
				.map(id => {
					const keys = Object.keys(updates[id]).filter(key => !['id', 'updated_at', 'created_at'].includes(key)),
						sql = `
							UPDATE public.capabilities
							SET ${ keys.map((key, i) => `${ key } = $${ i + 1 }`) },
								updated_at = now()
							WHERE id = $${ keys.length + 1 }
							RETURNING *;
						`,
						args = [
							...keys.map(key => updates[id][key] === null ? null : updates[id][key].value || updates[id][key]),
							id
						]
// console.log("<capabilitiesController.update>",sql,keys,args);
					return db_service.promise(sql, args);
				})
		)
		.then(results => [].concat(...results));
	},

	insert: (db_service, args) => {
		const sql = `
			INSERT INTO public.capabilities(${ ATTRIBUTES.slice(0, ATTRIBUTES.length - 3) })
				VALUES (${ ATTRIBUTES.slice(0, ATTRIBUTES.length - 3).map((attr, i) => `$${ i + 1 }`) })
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
			DELETE FROM public.capabilities
			WHERE id IN (${ ids });
		`;
		return db_service.promise(sql)
			.then(() => length(db_service))
	}
}