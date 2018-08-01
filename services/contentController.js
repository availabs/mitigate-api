const contentByIndexLengthSql = `
	SELECT count(1) AS length FROM public.content;
`
const contentByIndexLength = db_service =>
	db_service.promise(contentByIndexLengthSql)
		.then(row => ({ ...row[0] }));


const contentByIndexSql = `
	SELECT content_id FROM public.content;
`
const contentByIndex = db_service =>
	db_service.promise(contentByIndexSql)


const getContentByIdSql = content_ids => `
	SELECT * FROM public.content
	WHERE content_id IN ('${ content_ids.join("','")}');
`
const getContentById = (db_service, content_ids) =>
	db_service.promise(getContentByIdSql(content_ids));


const setContentByIdSql = (content_id, values) => `
	UPDATE public.content
	SET ${ Object.keys(values).map(key => `${ key } = '${ values[key] }'`) },
	updated_at = now()
	WHERE content_id = '${ content_id }'
	RETURNING *;
`
const setContentById = (db_service, contentById) =>
	Promise.all(
		Object.keys(contentById)
			.map(content_id =>
				db_service.promise(setContentByIdSql(content_id, contentById[content_id]))
			)
	).then(values => [].concat(...values));


const contentInsertSql = `
	INSERT INTO public.content(content_id, attributes, body)
	VALUES ($1, $2, $3)
	RETURNING *;
`
const contentInsert = (db_service, args) =>
	db_service.promise(contentInsertSql, args)
		.then(insertedRow =>
			contentByIndexLength(db_service)
				.then(length => ({ ...insertedRow[0], ...length }))
		)


const contentByIdRemoveSql = content_ids => `
	DELETE FROM public.content
	WHERE content_id IN ('${ content_ids.join("','") }');
`
const contentByIdRemove = (db_service, args) =>
	db_service.promise(contentByIdRemoveSql(args))
		.then(() => contentByIndexLength(db_service))

module.exports = {
	contentByIndexLength,
	contentByIndex,
	getContentById,
	setContentById,
	contentInsert,
	contentByIdRemove
}