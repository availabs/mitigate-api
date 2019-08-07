const falcorGraph = require('./graph'),
    get = require('lodash.get');

describe('roles test', () => {
    test('roles.select', (done) => {
        const
            getEventInsert = {
                'callPath': ['roles','insert'],
                'method': 'call',
                'args': ['ll','kk','ii','pp',2,'hh','nn','mm','bb',1]
            },
            getEventSelect = {
                'paths': [
                    ['roles','byId', [5], ['contact_name']]
                ],
                'method': 'get'
            },
            getEventUpdate = {
                'method': 'set',
                'jsonGraph': {
                    'paths': [
                        ['roles', 'byId', [5], ['contact_name']]
                    ],
                    'jsonGraph': {
                        'roles': {
                            'byId': {
                                [5]: {
                                    'contact_name': 'new_name_1'
                                }
                            }
                        }
                    }
                }
            },
            getEventRemove = {
                'callPath': ['roles','remove'],
                'method': 'call',
                'args':  [6],
            }

        falcorGraph.respond({ queryStringParameters: getEventInsert }, (error, response) => {
            console.log('response',JSON.stringify(response))
            done();
        });
    })
});

afterAll(() => {
    return falcorGraph.close();
});