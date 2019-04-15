**Work done:

1) counties for all variables in Config for the year = 2010,2011,2012,2013,2014,2015,2016,2017
2) cousubs for all variables in Config for the year = 2010,2011,2012,2013,2014,2015,2016,2017
3) tracts for all variables in Config for the year = 2010,2011,2012,2013,2014,2015,2016,2017
4) state for all variables in Config for the year = 2010,2011,2012,2013,2014,2015,2016,2017
5) code running for blockgroups, will be done for all years except 2009
6) written code for fetching county level data for the year = 2016
7) written code for fetching cousub level data for the year = 2016
8) written code for fetching tract level data for the year = 2016
9) written code for fetching state level data for the year = 2016
10) County level data for years for C02003 = 2010,2011,2012,2013,2014,2015,2016,2017
11) Cousub level data for years for C02003 = 2010,2011,2012,2013,2014,2015,2016,2017
12) tract level data for years for C02003 = 2010,2011,2012,2013,2014,2015,2016,2017
13) state level data for years for C02003 = 2010,2011,2012,2013,2014,2015,2016,2017
14) database has B01003 = 2016,2017 : B19057=2017,2016 : B23025=2017,2016 :B02001= 2017,2016 for blockgroup

**Work to do:
1) the variables for graph should also be there for blockgroups for the year 2014,2015,2016,2017
2) for graphs : need to check and insert variables like 'B19013','B23008','B01001','B16001'
3) insert more data for blockgroup other than point 13
4) THE BLOCKGROUP DATA IS INCOMPLETE
5) run blockgroups for the year 2009 but with remConfig
6) run code for blockgroups level for all years but the below variables only. (the current group functionality works for below variables but not for the year 2016)
-> 7) run code for the year 2009 for all levels, just remove /acs/ from the files starting with (fetch_) as the group functionality for the year 2009 doesn't work

//-----------not working for groups functionality-------------------
1) B08604 : doesn`t work for the year 2009,2010 ( both the api`s)
2) B23025 : doesn`t work for the year 2009,2010 (both the api`s)
3) B15003 : doesn`t work for the year 2009,2010,2011 (both the api`s)


//-------------------------Issues-----------
group functionality currently not working for Year= 2015
Group functionality does not have GEO_ID for year = 2016
for the census variable B19083: The blockgroups data is completely null
#------------------------issues with subvars--------------------
    'B25102':{
        'name': 'Mortgage Status by Real Estate Taxes Paid',
        'variables':[
            {'name':'Total','value':'B25102_001E'},
            {'name':'With a mortgage','value':'B25102_001E'},
            {'name':'Less than $800','value':'B25102_001E'},
            {'name':'$800 to $1,499','value':'B25102_001E'},
            {'name':'$1,500 to $1,999','value':'B25102_001E'},
            {'name':'$2,000 to $2,999','value':'B25102_001E'},
            {'name':'$3,000 or more','value':'B25102_001E'},
            {'name':'No real estate taxes paid','value':'B25102_001E'},
            {'name':'Not mortgaged','value':'B25102_001E'},
            {'name':'Less than $800','value':'B25102_001E'},
            {'name':'$800 to $1,499','value':'B25102_001E'},
            {'name':'$1,500 to $1,999','value':'B25102_001E'},
            {'name':'$2,000 to $2,999','value':'B25102_001E'},
            {'name':'$3,000 or more','value':'B25102_001E'},
            {'name':'No real estate taxes paid','value':'B25102_001E'}
        ]
    },
