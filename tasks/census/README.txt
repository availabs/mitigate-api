Work done:

1) counties for all variables in Config for the year = 2010,2011,2012,2013,2014,2017
2) cousubs for all variables in Config for the year = 2010,2011,2012,2013,2014,2017
3) tracts for all variables in Config for the year = 2010,2011,2012,2013,2014,2017
4) state for all variables in Config for the year = 2010,2011,2012,2013,2014,2017
//-----------not working for groups functionality-------------------
'B15003':{
        'name': 'Educational Attainment among adults 25  and older',
        'variables':[
            {'name':'Total','value':'B15003_001E'},
            {'name':'No schooling completed','value':'B15003_002E'},
            {'name':'Nursery school','value':'B15003_003E'},
            {'name':'Kindergarten','value':'B15003_004E'},
            {'name':'1st grade','value':'B15003_005E'},
            {'name':'2nd grade','value':'B15003_006E'},
            {'name':'3rd grade','value':'B15003_007E'},
            {'name':'4th grade','value':'B15003_008E'},
            {'name':'5th grade','value':'B15003_009E'},
            {'name':'6th grade','value':'B15003_010E'},
            {'name':'7th grade','value':'B15003_011E'},
            {'name':'8th grade','value':'B15003_012E'},
            {'name':'9th grade','value':'B15003_013E'},
            {'name':'10th grade','value':'B15003_014E'},
            {'name':'11th grade','value':'B15003_015E'},
            {'name':'12th grade, no diploma','value':'B15003_016E'},
            {'name':'Regular high school diploma','value':'B15003_017E'},
            {'name':'GED or alternative credential','value':'B15003_018E'},
            {'name':'Some college, less than 1 year','value':'B15003_019E'},
            {'name':'Some college, 1 or more years, no degree','value':'B15003_020E'},
            {'name':'Associate`s degree','value':'B15003_021E'},
            {'name':'Bachelor`s degree','value':'B15003_022E'},
            {'name':'Bachelor`s degree','value':'B15003_023E'},
            {'name':'Professional school degree','value':'B15003_024E'},
            {'name':'Doctorate degree','value':'B15003_025E'}
        ]
    },
    'B23025': {
        'name': 'Employment Status',
        'variables':[
              {'name':'Total','value':'B23025_001E'},
              {'name':'In labor force','value':'B23025_002E'},
              {'name':'Civilian labor force','value':'B23025_003E'},
              {'name':'Employed','value':'B23025_004E'},
              {'name':'Unemployed','value':'B23025_005E'},
              {'name':'Armed Forces','value':'B23025_006E'},
              {'name':'Not in labor force','value':'B23025_007E'}
        ]
   },
   'B08604':{
        'name': 'Worker Population',
        'variables': [
            {'name':'Total','value':'B08604_001E'}
        ]
    },

//-------------------------Issues-----------
group functionality currently not working for Year= 2015
Group functionality does not have GEO_ID for year = 2016