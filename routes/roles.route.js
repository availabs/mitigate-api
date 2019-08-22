const falcorJsonGraph = require('falcor-json-graph'),
    $atom = falcorJsonGraph.atom,
    rolesController = require("../services/rolesController"),
    cols = rolesController.cols;

module.exports = [
    {
        route: 'roles.insert',
        call: function(callPath, args, refPaths, thisPaths) {
            console.log('inresting...', args);
            return rolesController.insert(this.db_service, args)
                .then(([length, row]) => {
                    return [
                        {
                            path: ['roles', 'length'],
                            value: length
                        },
                        {
                            path: ['roles', 'byIndex'],
                            invalidated: true
                        },
                        ...Object.keys(row).map(key => ({
                            path: ['roles', 'byId', row.id, key],
                            value: row[key]
                        }))
                    ]
                })
        }
    },

    {
        route: `roles.remove`,
        call: function(callPath, args) {
            console.log('remove: ', callPath, args)
            return rolesController.remove(this.db_service, args)
                .then(length => {
                    const result = args.map(id => ({
                        path: ['roles', 'byId', id],
                        invalidated: true
                    }))
                    return [
                        {
                            path: ['roles', 'byIndex'],
                            invalidated: true,
                        },
                        {
                            path: ['roles', 'length'],
                            value: length
                        },
                        ...result
                    ]
                })
        }
    },
    {
        route: `roles.byId[{keys:ids}]['${ cols.join("','") }']`,
        get: function(pathSet) {
            const IDs = pathSet.ids;
            return rolesController
                .byId(this.db_service, IDs)
                .then(rows => {
                    const result = [];
                    IDs.forEach(id => {
                        const row = rows.reduce((a, c) => c.id === id ? c : a, null);
                        if (!row) {
                            result.push({
                                path: ['roles','byId', id],
                                value: $atom(null)
                            })
                        }
                        else {
                            pathSet[3].forEach(col => {
                                result.push({
                                    path: ['roles','byId', id, col],
                                    value: $atom(row[col])
                                })
                            })
                        }
                    })
                    return result;
                })
        },

        set: function(jsonGraph) {
            console.log('jsonGraph', jsonGraph)
            const actionsById = jsonGraph.roles.byId,
                ids = Object.keys(actionsById);
            return rolesController.update(this.db_service,  actionsById)
                .then(rows => {
                    const result = [];
                    ids.forEach(id => {
                        id = parseInt(id);
                        const row = rows.reduce((a, c) => c.id === id ? c : a, null);
                        if (!row) {
                            result.push({
                                path: ['roles', 'byId', id],
                                value: $atom(null)
                            })
                        }
                        else {
                            for (const key in row) {
                                result.push({
                                    path: ['roles', 'byId', id, key],
                                    value: row[key]
                                })
                            }
                        }
                    })
                    return result;
                })
        }
    },
    {
        route: `roles.byPlanId[{keys:ids}]['${ cols.join("','") }']`,
        get: function(pathSet) {
            const IDs = pathSet.ids;
            return rolesController
                .byPlanId(this.db_service, IDs)
                .then(rows => {
                    const result = [];
                    IDs.forEach(id => {
                        console.log(id)
                        const row = rows.reduce((a, c) => c.associated_plan === id ? c : a, null);
                        if (!row) {
                            result.push({
                                path: ['roles','byPlanId', id],
                                value: $atom(null)
                            })
                        }
                        else {
                            pathSet[3].forEach(col => {
                                result.push({
                                    path: ['roles','byPlanId', id, col],
                                    value: $atom(row[col])
                                })
                            })
                        }
                    })
                    console.log('byPlanId', result)
                    return result;
                })
        },
    },
    {
        route: `roles.byIndex[{integers:indices}].id`,
        get: function(pathSet) {
            return rolesController.byIndex(this.db_service)
                .then(rows => {
                    const result = [];
                    pathSet.indices.forEach(index => {
                        const row = rows[index];
                        if (!row) {
                            result.push({
                                path: ['roles', 'byIndex', index],
                                value: $atom(null)
                            })
                        }
                        else {
                            result.push({
                                path: ['roles', 'byIndex', index, 'id'],
                                value: $atom(row['id'])
                            })
                        }
                    })
                    return result;
                });
        }
    },

    {
        route: 'roles.length',
        get: function(pathSet) {
            return rolesController.length(this.db_service)
                .then(length => {
                    console.log('length',length)
                    return [
                        {
                            path: ['roles', 'length'],
                            value: $atom(+length)
                        }
                    ]
                });
        }
    },

]