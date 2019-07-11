const falcorJsonGraph = require('falcor-json-graph'),
    $atom = falcorJsonGraph.atom,

    actionsController = require("../services/actionsController"),
    ATTRIBUTES = actionsController.ATTRIBUTES;

module.exports = [

    {
        route: `actions.worksheet.byIndex[{integers:indices}].id`,
        get: function(pathSet) {
            return actionsController.byIndex(this.db_service)
                .then(rows => {
                    const result = [];
                    pathSet.indices.forEach(index => {
                        const row = rows[index];
                        if (!row) {
                            result.push({
                                path: ['actions','worksheet','byIndex', index],
                                value: $atom(null)
                            })
                        }
                        else {
                            result.push({
                                path: ['actions','worksheet','byIndex', index, 'id'],
                                value: $atom(row['id'])
                            })
                        }
                    })
                    return result;
                });
        }
    },

    {
        route: 'actions.worksheet.length',
        get: function(pathSet) {
            return actionsController.length(this.db_service)
                .then(length => {
                    console.log('length',length)
                    return [
                        {
                            path: ['actions','worksheet','length'],
                            value: $atom(+length)
                        }
                    ]
                });
        }
    },

    {
        route: 'actions.worksheet.insert',
        call: function(callPath, args, refPaths, thisPaths) {
            return actionsController.insert(this.db_service, args)
                .then(([length, row]) => {
                    return [
                        {
                            path: ['actions','worksheet','length'],
                            value: length
                        },
                        {
                            path: ['actions','worksheet','byIndex'],
                            invalidated: true
                        },
                        ...Object.keys(row).map(key => ({
                            path: ['actions','worksheet', 'byId', row.id, key],
                            value: row[key]
                        }))
                    ]
                })
        }
    },
    {
        route: `actions.worksheet.byId[{keys:ids}]['${ ATTRIBUTES.join("','") }']`,
        get: function(pathSet) {
            const IDs = pathSet.ids;
            return actionsController.get(this.db_service, IDs)
                .then(rows => {
                    const result = [];
                    IDs.forEach(id => {
                        const row = rows.reduce((a, c) => c.id == id ? c : a, null);
                        if (!row) {
                            result.push({
                                path: ['actions','worksheet','byId', id],
                                value: $atom(null)
                            })
                        }
                        else {
                            pathSet[4].forEach(attribute => {
                                result.push({
                                    path: ['actions','worksheet','byId', id, attribute],
                                    value: $atom(row[attribute])
                                })
                            })
                        }
                    })
                    return result;
                })
        },
        set: function(jsonGraph) {
            const actionsById = jsonGraph.actions.worksheet.byId,
                ids = Object.keys(actionsById);
            return actionsController.update(this.db_service, actionsById)
                .then(rows => {
                    const result = [];
                    ids.forEach(id => {
                        const row = rows.reduce((a, c) => c.id == id ? c : a, null);
                        if (!row) {
                            result.push({
                                path: ['actions','worksheet','byId', id],
                                value: $atom(null)
                            })
                        }
                        else {
                            for (const key in row) {
                                //console.log('key',key)
                                result.push({
                                    path: ['actions','worksheet','byId', id, key],
                                    value: $atom(row[key])
                                })
                            }
                        }
                    })
                    return result;
                });
        }
    },
    {
        route: 'actions.worksheet.remove',
        call: function(callPath, args, refPaths, thisPaths) {
            return actionsController.remove(this.db_service, args)
                .then(length => {
                    const result = args.map(id => ({
                        path: ['actions','worksheet','byId', id],
                        invalidated: true
                    }))
                    return [
                        {
                            path: ['actions','worksheet','byIndex'],
                            invalidated: true,
                        },
                        {
                            path: ['actions','worksheet','length'],
                            value: length
                        },
                        ...result
                    ]
                })
        }
    }


]

