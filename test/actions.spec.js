const falcorGraph = require('./graph'),
    get = require('lodash.get');

describe('actions', () => {

    const content_id = `my-special-content-id`


    test('actions.worksheet.insert', (done) => {
        const getEvent = {
            'callPath': ['actions','worksheet','insert'],
            'method': 'call',
            'args': ["hello","123","jhjhhk","jgjhk","ggjkjl","1","r6tuhkjl","jkjkjlkl","100000","45000","ghgjkjkm","tfhjjk","7678yih","vhghh",
            "gjhkl","ggjhhjk","ffgj","10000","ggjhh","ffj","1000","ggjjk","fgj","100","ytuyij","10/12/2019","786879","gjhgjhjk"]
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',response)
            //expect(get(response, 'jsonGraph.actions.worksheet', null)).toBe("number");
            done();
        });
    })




    /*
    test('actions.worksheet.byId', (done) => {
        const getEvent = {
            'paths': [
                ['actions','worksheet','byId', [1],"project_name"]
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done();
        });
    })
     */

    /*
    test('actions.worksheet.byId::set', (done) => {
        const setEvent = {
            'method': 'set',
            'jsonGraph': {
                'paths': [['actions','worksheet','byId',[1], 'project_number',]],
                'jsonGraph': {
                    'actions': {
                        'worksheet':{
                            'byId': {
                                [1]: {
                                    'project_number': '3456'
                                }
                            }
                        }

                    }
                }
            }
        }
        falcorGraph.respond({ queryStringParameters: setEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, `jsonGraph.content.byId.${ content_id }.body.value`)).toBe("New body text here!");
            done();
        });
    })
     */

    /*
    test('actions.worksheet.byIndex', (done) => {
        const getEvent = {
            'paths': [
                ['actions','worksheet','byIndex', [0],"id"]
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done();
        });
    })
     */


})

afterAll(() => {
    return falcorGraph.close();
});