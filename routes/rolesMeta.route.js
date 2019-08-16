const falcorJsonGraph = require('falcor-json-graph'),
    $atom = falcorJsonGraph.atom,
    rolesMetaController = require("../services/rolesMetaController");
const cols = ["field"]

module.exports = [
    {
        route: `rolesmeta.roles['${ cols.join("','") }']`,
        // cols: field, name, value
        get: function(pathSet) {
            return rolesMetaController
                .select(this.db_service)
                .then(rows => {
                    const result = [];
                    if (!rows) {
                        result.push({
                            path: ['rolesmeta','roles'],
                            value: $atom(null)
                        })
                    }
                    else {
                        result.push({
                            path: ['rolesmeta','roles', 'field'],
                            value: $atom(rows)
                        })
                    }
                    console.log(result)
                    return result;
                })
        },

    }
]