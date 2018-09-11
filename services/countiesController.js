module.exports = {
	byFips: (db_service, fips) => {
		const sql = `
			SELECT
				fips,
				plan_expiration::TEXT,
				plan_consultant,
				plan_url
			FROM public.county_plan_status
			WHERE fips IN ('${ fips.join("','") }')
		`
// console.log(sql);
		return db_service.promise(sql);
	}
}