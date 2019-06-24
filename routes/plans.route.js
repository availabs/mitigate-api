const falcorJsonGraph = require('falcor-json-graph'),
    $atom = falcorJsonGraph.atom,

    plansController = require("../services/plansController"),
    ATTRIBUTES = plansController.ATTRIBUTES;

module.exports = [

    {
        route: `plans.county.byIndex[{integers:indices}].id`,
        get: function(pathSet) {
            return plansController.byIndex(this.db_service)
                .then(rows => {
                    const result = [];
                    pathSet.indices.forEach(index => {
                        const row = rows[index];
                        if (!row) {
                            result.push({
                                path: ['plans','county','byIndex', index],
                                value: $atom(null)
                            })
                        }
                        else {
                            result.push({
                                path: ['plans','county','byIndex', index, 'id'],
                                value: $atom(row['id'])
                            })
                        }
                    })
                    return result;
                });
        }
    },

    {
        route: 'plans.county.length',
        get: function(pathSet) {
            return plansController.length(this.db_service)
                .then(length => {
                    console.log('length',length)
                    return [
                        {
                            path: ['plans','county','length'],
                            value: $atom(+length)
                        }
                    ]
                });
        }
    },

    {
        route: 'plans.county.insert',
        call: function(callPath, args, refPaths, thisPaths) {
            return plansController.insert(this.db_service, args)
                .then(([length, row]) => {
                    return [
                        {
                            path: ['plans','county','length'],
                            value: length
                        },
                        {
                            path: ['plans','county','byIndex'],
                            invalidated: true
                        },
                        ...Object.keys(row).map(key => ({
                            path: ['plans','county', 'byId', row.id, key],
                            value: row[key]
                        }))
                    ]
                })
        }
    },
    {
        route: `plans.county.byId[{keys:ids}]['${ ATTRIBUTES.join("','") }']`,
        get: function(pathSet) {
            const IDs = pathSet.ids;
            return plansController.get(this.db_service, IDs)
                .then(rows => {
                    const result = [];
                    IDs.forEach(id => {
                        const row = rows.reduce((a, c) => c.id == id ? c : a, null);
                        if (!row) {
                            result.push({
                                path: ['plans','county','byId', id],
                                value: $atom(null)
                            })
                        }
                        else {
                            pathSet[4].forEach(attribute => {
                                result.push({
                                    path: ['plans','county','byId', id, attribute],
                                    value: $atom(row[attribute])
                                })
                            })
                        }
                    })
                    return result;
                })
        },
        set: function(jsonGraph) {
            const actionsById = jsonGraph.plans.county.byId,
                ids = Object.keys(actionsById);
            return plansController.update(this.db_service, actionsById)
                .then(rows => {
                    const result = [];
                    ids.forEach(id => {
                        const row = rows.reduce((a, c) => c.id == id ? c : a, null);
                        if (!row) {
                            result.push({
                                path: ['plans','county','byId', id],
                                value: $atom(null)
                            })
                        }
                        else {
                            for (const key in row) {
                                //console.log('key',key)
                                result.push({
                                    path: ['plans','county','byId', id, key],
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
        route: 'plans.county.remove',
        call: function(callPath, args, refPaths, thisPaths) {
            return plansController.remove(this.db_service, args)
                .then(length => {
                    const result = args.map(id => ({
                        path: ['plans','county','byId', id],
                        invalidated: true
                    }))
                    return [
                        {
                            path: ['plans','county','byIndex'],
                            invalidated: true,
                        },
                        {
                            path: ['plans','county','length'],
                            value: length
                        },
                        ...result
                    ]
                })
        }
    }


]

