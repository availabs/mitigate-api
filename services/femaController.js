const femadisasterLengthsSql = (geoids, disasters, years) =>
`
	SELECT geoid,
		incidenttype AS disaster,
		extract(year FROM incidentbegindate) AS year,
		count(1) AS length
	FROM public.fema_disaster_declarations
	WHERE geoid IN ('${ geoids.join("','") }')
	AND incidenttype IN ('${ disasters.join("','") }')
	AND extract(year FROM incidentbegindate) IN (${ years })
	GROUP BY 1, 2, 3;
`
const femadisasterLengths = (db_service, geoids, disasters, years) =>
	db_service.promise(femadisasterLengthsSql(geoids, disasters, years))


const femadisasterDisasterNumbersSql = (geoids, disasters, years) =>
`
	SELECT geoid,
		incidenttype AS disaster,
		extract(year FROM incidentbegindate) AS year,
		disasternumber
	FROM public.fema_disaster_declarations
	WHERE geoid IN ('${ geoids.join("','") }')
	AND incidenttype IN ('${ disasters.join("','") }')
	AND extract(year FROM incidentbegindate) IN (${ years });
`
const femadisasterDisasterNumbers = (db_service, geoids, disasters, years) =>
	db_service.promise(femadisasterDisasterNumbersSql(geoids, disasters, years))


const DISASTER_ATTRIUBUTES = [
	'disasternumber',
	'disastername',
	'declarationtype',
	'geoid',
	'year',
	'date'
]
const femadisasterByDisasterNumberSql = (disasternumbers) =>
`
	SELECT disasternumber,
		disastername,
		declarationtype,
		geoid,
		extract(year FROM incidentbegindate) AS year,
		incidentbegindate::TIMESTAMP::TEXT AS date
	FROM public.fema_disaster_declarations
	WHERE disasternumber IN (${ disasternumbers });
`
const femadisasterByDisasterNumber = (db_service, disasternumbers) =>
	db_service.promise(femadisasterByDisasterNumberSql(disasternumbers))


module.exports = {
	femadisasterLengths,
	femadisasterDisasterNumbers,
	DISASTER_ATTRIUBUTES,
	femadisasterByDisasterNumber
}