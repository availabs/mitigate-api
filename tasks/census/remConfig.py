#TODO: Need to do these two for cousubs

census_config ={
    'B25091':{
        'name':'Mortgage Status by Selected Monthly Owner Costs as a Percentage of Household Income',
        'variables':[
            {'name':'Total','value':'B25091_001E'},
            {'name':'Housing units with a mortgage','value':'B25091_002E'},
            {'name':'Less than 10.0 percent','value':'B25091_003E'},
            {'name':'10.0 to 14.9 percent','value':'B25091_004E'},
            {'name':'15.0 to 19.9 percent','value':'B25091_005E'},
            {'name':'20.0 to 24.9 percent','value':'B25091_006E'},
            {'name':'25.0 to 29.9 percent','value':'B25091_007E'},
            {'name':'30.0 to 34.9 percent','value':'B25091_008E'},
            {'name':'35.0 to 39.9 percent','value':'B25091_009E'},
            {'name':'40.0 to 49.9 percent','value':'B25091_010E'},
            {'name':'50.0 percent or more','value':'B25091_011E'},
            {'name':'not computed','value':'B25091_012E'},
            {'name':'Housing units without a mortgage','value':'B25091_013E'},
            {'name':'Less than 10.0 percent','value':'B25091_014E'},
            {'name':'10.0 to 14.9 percent','value':'B25091_015E'},
            {'name':'15.0 to 19.9 percent','value':'B25091_016E'},
            {'name':'20.0 to 24.9 percent','value':'B25091_017E'},
            {'name':'25.0 to 29.9 percent','value':'B25091_018E'},
            {'name':'30.0 to 34.9 percent','value':'B25091_019E'},
            {'name':'35.0 to 39.9 percent','value':'B25091_020E'},
            {'name':'40.0 to 49.9 percent','value':'B25091_021E'},
            {'name':'50.0 percent or more','value':'B25091_022E'},
            {'name':'not computed','value':'B25091_023E'},
        ]
    }
}


'''

    'B14002':{
        'name':'Sex by School Enrollment by Level of School by Type of School',
        'variables':[
            {'name':'Total','value':'B14002_001E'},
            {'name':'Male','value':'B14002_002E'},
            {'name':'Enrolled in school','value':'B14002_003E'},
            {'name':'Enrolled in nursery school,preschool','value':'B14002_004E'},
            {'name':'Public School','value':'B14002_005E'},
            {'name':'Private School','value':'B14002_006E'},
            {'name':'Enrolled in kindergarten','value':'B14002_007E'},
            {'name':'Public School','value':'B14002_008E'},
            {'name':'Private School','value':'B14002_009E'},
            {'name':'Enrolled in grade 1 to grade 4','value':'B14002_010E'},
            {'name':'Public School','value':'B14002_011E'},
            {'name':'Private School','value':'B14002_012E'},
            {'name':'Enrolled in grade 5 to grade 8','value':'B14002_013E'},
            {'name':'Public School','value':'B14002_014E'},
            {'name':'Private School','value':'B14002_015E'},
            {'name':'Enrolled in grade 9 to grade 12','value':'B14002_016E'},
            {'name':'Public School','value':'B14002_017E'},
            {'name':'Private School','value':'B14002_018E'},
            {'name':'Enrolled in college undergraduate years','value':'B14002_019E'},
            {'name':'Public School','value':'B14002_020E'},
            {'name':'Private School','value':'B14002_021E'},
            {'name':'Enrolled in graduate school or professional school','value':'B14002_022E'},
            {'name':'Public School','value':'B14002_023E'},
            {'name':'Private School','value':'B14002_024E'},
            {'name':'Not enrolled in school','value':'B14002_025E'},
            {'name':'Female','value':'B14002_026E'},
            {'name':'Enrolled in school','value':'B14002_027E'},
            {'name':'Enrolled in nursery school,preschool','value':'B14002_028E'},
            {'name':'Public School','value':'B14002_029E'},
            {'name':'Private School','value':'B14002_030E'},
            {'name':'Enrolled in kindergarten','value':'B14002_031E'},
            {'name':'Public School','value':'B14002_032E'},
            {'name':'Private School','value':'B14002_033E'},
            {'name':'Enrolled in grade 1 to grade 4','value':'B14002_034E'},
            {'name':'Public School','value':'B14002_035E'},
            {'name':'Private School','value':'B14002_036E'},
            {'name':'Enrolled in grade 5 to grade 8','value':'B14002_037E'},
            {'name':'Public School','value':'B14002_038E'},
            {'name':'Private School','value':'B14002_039E'},
            {'name':'Enrolled in grade 9 to grade 12','value':'B14002_040E'},
            {'name':'Public School','value':'B14002_041E'},
            {'name':'Private School','value':'B14002_042E'},
            {'name':'Enrolled in college undergraduate years','value':'B14002_043E'},
            {'name':'Public School','value':'B14002_044E'},
            {'name':'Private School','value':'B14002_045E'},
            {'name':'Enrolled in graduate school or professional school','value':'B14002_046E'},
            {'name':'Public School','value':'B14002_047E'},
            {'name':'Private School','value':'B14002_048E'},
            {'name':'Not enrolled in school','value':'B14002_049E'},

        ]
    }
    
    'B14003':{
        'name':'Sex by School Enrollment by Type of School by Age',
        'variables':[
            {'name':'Total','value':'B14003_001E'},
            {'name':'Male','value':'B14003_002E'},
            {'name':'Enrolled in school','value':'B14003_003E'},
            {'name':'3 and 4 years','value':'B14003_004E'},
            {'name':'5 to 9 years','value':'B14003_005E'},
            {'name':'10 to 14 years','value':'B14003_006E'},
            {'name':'15 to 17 years','value':'B14003_007E'},
            {'name':'18 and 19 years','value':'B14003_008E'},
            {'name':'20 to 24 years','value':'B14003_009E'},
            {'name':'25 to 34 years','value':'B14003_010E'},
            {'name':'35 years and over','value':'B14003_011E'},
            {'name':'Enrolled in private school','value':'B14003_012E'},
            {'name':'3 and 4 years','value':'B14003_013E'},
            {'name':'5 to 9 years','value':'B14003_014E'},
            {'name':'10 to 14 years','value':'B14003_015E'},
            {'name':'15 to 17 years','value':'B14003_016E'},
            {'name':'18 and 19 years','value':'B14003_017E'},
            {'name':'20 to 24 years','value':'B14003_018E'},
            {'name':'25 to 34 years','value':'B14003_019E'},
            {'name':'35 years and over','value':'B14003_020E'},
            {'name':'Not enrolled in school','value':'B14003_021E'},
            {'name':'3 and 4 years','value':'B14003_022E'},
            {'name':'5 to 9 years','value':'B14003_023E'},
            {'name':'10 to 14 years','value':'B14003_024E'},
            {'name':'15 to 17 years','value':'B14003_025E'},
            {'name':'18 and 19 years','value':'B14003_026E'},
            {'name':'20 to 24 years','value':'B14003_027E'},
            {'name':'25 to 34 years','value':'B14003_028E'},
            {'name':'35 years and over','value':'B14003_029E'},
            {'name':'Female','value':'B14003_030E'},
            {'name':'Enrolled in school','value':'B14003_031E'},
            {'name':'3 and 4 years','value':'B14003_032E'},
            {'name':'5 to 9 years','value':'B14003_033E'},
            {'name':'10 to 14 years','value':'B14003_034E'},
            {'name':'15 to 17 years','value':'B14003_035E'},
            {'name':'18 and 19 years','value':'B14003_036E'},
            {'name':'20 to 24 years','value':'B14003_037E'},
            {'name':'25 to 34 years','value':'B14003_038E'},
            {'name':'35 years and over','value':'B14003_039E'},
            {'name':'Enrolled in private school','value':'B14003_040E'},
            {'name':'3 and 4 years','value':'B14003_041E'},
            {'name':'5 to 9 years','value':'B14003_042E'},
            {'name':'10 to 14 years','value':'B14003_043E'},
            {'name':'15 to 17 years','value':'B14003_044E'},
            {'name':'18 and 19 years','value':'B14003_045E'},
            {'name':'20 to 24 years','value':'B14003_046E'},
            {'name':'25 to 34 years','value':'B14003_047E'},
            {'name':'35 years and over','value':'B14003_048E'},
            {'name':'Not enrolled in school','value':'B14003_049E'},
            {'name':'3 and 4 years','value':'B14003_050E'},
            {'name':'5 to 9 years','value':'B14003_051E'},
            {'name':'10 to 14 years','value':'B14003_052E'},
            {'name':'15 to 17 years','value':'B14003_053E'},
            {'name':'18 and 19 years','value':'B14003_054E'},
            {'name':'20 to 24 years','value':'B14003_055E'},
            {'name':'25 to 34 years','value':'B14003_056E'},
            {'name':'35 years and over','value':'B14003_057E'},

        ]
    }
    
    'B25004': {
        'name': 'Vacancy Status',
        'variables': [
            {'name': 'Total','value':'B25004_001E'},
            {'name': 'For rent','value':'B25004_002E'},
            {'name': 'Rented,not occupied','value':'B25004_003E'},
            {'name': 'For sale only','value':'B25004_004E'},
            {'name': 'Sold,not occupied','value':'B25004_005E'},
            {'name':'For seasonal, recreational, or occasional use','value':'B25004_006E'},
            {'name':'For migrant workers','value':'B25004_007E'},
            {'name':'Other vacant','value':'B25004_008E'}
        ]
    },
    'B25118':{
        'name':'Occupied Housing Units',
        'variables': [
            {'name':'Total','value':'B25118_001E'},
            {'name':'Owner Occupied','value':'B25118_002E'},
            {'name':'Less than $5,000','value':'B25118_003E'},
            {'name':'$5,000 to $9,999','value':'B25118_004E'},
            {'name':'$10,000 to $14,999','value':'B25118_005E'},
            {'name':'$15,000 to $19,999','value':'B25118_006E'},
            {'name':'$20,000 to $24,999','value':'B25118_007E'},
            {'name':'$25,000 to $34,999','value':'B25118_008E'},
            {'name':'$35,000 to $49,999','value':'B25118_009E'},
            {'name':'$50,000 to $74,999','value':'B25118_010E'},
            {'name':'$75,000 to $99,999','value':'B25118_011E'},
            {'name':'$100,000 to $149,999','value':'B25118_012E'},
            {'name':'$150,000 or more','value':'B25118_013E'},
            {'name':'Renter Occupied','value':'B25118_014E'},
            {'name':'Less than $5,000','value':'B25118_015E'},
            {'name':'$5,000 to $9,999','value':'B25118_016E'},
            {'name':'$10,000 to $14,999','value':'B25118_017E'},
            {'name':'$15,000 to $19,999','value':'B25118_018E'},
            {'name':'$20,000 to $24,999','value':'B25118_019E'},
            {'name':'$25,000 to $34,999','value':'B25118_020E'},
            {'name':'$35,000 to $49,999','value':'B25118_021E'},
            {'name':'$50,000 to $74,999','value':'B25118_022E'},
            {'name':'$75,000 to $99,999','value':'B25118_023E'},
            {'name':'$100,000 to $149,999','value':'B25118_024E'},
            {'name':'$150,000 or more','value':'B25118_025E'}
        ]
    },
    'B25087':{
        'name' :'Owner-Occupied Housing Units',
        'variables':[
            {'name':'Total','value':'B25087_001E'},
            {'name':'Housing units with a mortgage','value':'B25087_002E'},
            {'name':'Less than $200','value':'B25087_003E'},
            {'name':'$200 to $299','value':'B25087_004E'},
            {'name':'$300 to $399','value':'B25087_005E'},
            {'name':'$400 to $499','value':'B25087_006E'},
            {'name':'$500 to $599','value':'B25087_007E'},
            {'name':'$600 to $699','value':'B25087_008E'},
            {'name':'$700 to $799','value':'B25087_009E'},
            {'name':'$800 to $899','value':'B25087_010E'},
            {'name':'$900 to $999','value':'B25087_011E'},
            {'name':'$1,000 to $1,249','value':'B25087_022E'},
            {'name':'$1,250 to $1,499','value':'B25087_013E'},
            {'name':'$1,500 to $1,999','value':'B25087_014E'},
            {'name':'$2,000 to $2,499','value':'B25087_015E'},
            {'name':'$2,500 to $2,999','value':'B25087_016E'},
            {'name':'$3,000 to $3,499','value':'B25087_017E'},
            {'name':'$3,500 to $3,999','value':'B25087_018E'},
            {'name':'$4,000 or more','value':'B25087_019E'},
            {'name':'Housing units without a mortgage','value':'B25087_020E'},
            {'name':'Less than $100','value':'B25087_021E'},
            {'name':'$100 to $149','value':'B25087_022E'},
            {'name':'$150 to $199','value':'B25087_023E'},
            {'name':'$200 to $249','value':'B25087_024E'},
            {'name':'$250 to $299','value':'B25087_025E'},
            {'name':'$300 to $349','value':'B25087_026E'},
            {'name':'$350 to $399','value':'B25087_027E'},
            {'name':'$400 to $499','value':'B25087_028E'},
            {'name':'$500 to $599','value':'B25087_029E'},
            {'name':'$600 to $699','value':'B25087_030E'},
            {'name':'$700 to $799','value':'B25087_031E'},
            {'name':'$800 to $899','value':'B25087_032E'},
            {'name':'$900 to $999','value':'B25087_033E'},
            {'name':'$1000 to $1099','value':'B25087_034E'},
            {'name':'$1100 to $1199','value':'B25087_035E'},
            {'name':'$1200 to $1299','value':'B25087_036E'},
            {'name':'$1300 to $1399','value':'B25087_037E'},
            {'name':'$1400 to $1499','value':'B25087_038E'},
            {'name':'$1500 or more','value':'B25087_039E'},
        ]
    },
    'B21001' : {
        'name': 'Civilian Population 18 Years and Over',
        'variables' :[
            {'name':'Total','value':'B21001_001E'},
            {'name':'Total veteran','value':'B21001_002E'},
            {'name':'Total non veteran','value':'B21001_003E'},
            {'name':'Total Male','value':'B21001_004E'},
            {'name':'Total Male veteran','value':'B21001_005E'},
            {'name':'Total Male non veteran','value':'B21001_006E'},
            {'name':'Total Male 18-34 years','value':'B21001_007E'},
            {'name':'Male 18-34 years veteran','value':'B21001_008E'},
            {'name':'Male 18-34 years non veteran','value':'B21001_009E'},
            {'name':'Total Male 35-54 years','value':'B21001_010E'},
            {'name':'Male 35-54 years veteran','value':'B21001_011E'},
            {'name':'Male 35-54 years non veteran','value':'B21001_012E'},
            {'name':'Total Male 55 to 64 years','value':'B21001_013E'},
            {'name':'Male 55 to 64 years veteran','value':'B21001_014E'},
            {'name':'Male 55 to 64 years non veteran','value':'B21001_015E'},
            {'name':'Total Male 65 to 74 years','value':'B21001_016E'},
            {'name':'Male 65 to 74 years veteran','value':'B21001_017E'},
            {'name':'Male 65 to 74 years non veteran','value':'B21001_018E'},
            {'name':'Total Male 75 years and over','value':'B21001_019E'},
            {'name':'Male 75 years and over veteran','value':'B21001_020E'},
            {'name':'Male 75 years and over non veteran','value':'B21001_021E'},
            {'name':'Total Female','value':'B21001_022E'},
            {'name':'Total Female veteran','value':'B21001_023E'},
            {'name':'Total Female non veteran','value':'B21001_024E'},
            {'name':'Total Female 18-34 years','value':'B21001_025E'},
            {'name':'Female 18-34 years veteran','value':'B21001_026E'},
            {'name':'Female 18-34 years non veteran','value':'B21001_027E'},
            {'name':'Total Female 35-54 years','value':'B21001_028E'},
            {'name':'Female 35-54 years veteran','value':'B21001_029E'},
            {'name':'Female 35-54 years non veteran','value':'B21001_030E'},
            {'name':'Total Female 55 to 64 years','value':'B21001_031E'},
            {'name':'Female 55 to 64 years veteran','value':'B21001_032E'},
            {'name':'Female 55 to 64 years non veteran','value':'B21001_033E'},
            {'name':'Total Female 65 to 74 years','value':'B21001_034E'},
            {'name':'Female 65 to 74 years veteran','value':'B21001_035E'},
            {'name':'Female 65 to 74 years non veteran','value':'B21001_036E'},
            {'name':'Total Female 75 years and over','value':'B21001_037E'},
            {'name':'Female 75 years and over veteran','value':'B21001_038E'},
            {'name':'Female 75 years and over non veteran','value':'B21001_039E'}

        ]
    },
    
    'B19013A':{
        'name': 'Median household income in the past 12 months',
        'variables' :[
            {'name': 'Median household income for White Alone in the past 12 months', 'value':'B19013A_001E'}
        ]
    },
    'B19013B':{
        'name': 'Median household income in the past 12 months',
        'variables' :[
            {'name': 'Median household income for Black or African American alone in the past 12 months', 'value':'B19013B_001E'}
        ]

    },
    'B19013C': {
        'name': 'Median household income in the past 12 months',
        'variables' :[
            {'name': 'Median household income for American Indian or Alaska Native alone in the past 12 months', 'value':'B19013C_001E'}
        ]
    },
    'B19013D': {
        'name': 'Median household income in the past 12 months',
        'variables' : [
            {'name': 'Median household income for Asian alone in the past 12 months', 'value':'B19013D_001E'}
        ]
    },
    'B19013E': {
        'name': 'Median household income in the past 12 months',
        'variables' :[
            {'name':'Median household income for Native Hawaiian and Other Pacific Islander Alone in the past 12 months','value':'B19013E_001E'}
        ]
    },
    'B19013F': {
        'name': 'Median household income in the past 12 months',
        'variables' :[
            {'name':'Median household income for Some Other Race Alone in the past 12 months','value':'B19013F_001E'}
        ]
    },
    'B19013G': {
        'name': 'Median household income in the past 12 months',
        'variables' : [
            {'name':'Median household income for Two or more races in the past 12 months','value':'B19013G_001E'}
        ]
    },
    'B19013H': {
        'name': 'Median household income in the past 12 months',
        'variables' :[
            {'name':'Median household income for White Alone, Not Hispanic or Latino in the past 12 months','value':'B19013H_001E'}
        ]
    },
    'B19013I': {
        'name': 'Median household income in the past 12 months',
        'variables' :[
            {'name':'Median household income for Hispanic or Latino in the past 12 months','value':'B19013I_001E'}
        ]
    }
    
    'B19119': {
        'name': 'Median Family Income by Family Size',
        'variables': [
            {'name': 'Total', 'value': 'B19119_001E'},
            {'name': '2-person families', 'value': 'B19119_002E'},
            {'name': '3-person families', 'value': 'B19119_003E'},
            {'name': '4-person families', 'value': 'B19119_004E'},
            {'name': '5-person families', 'value': 'B19119_005E'},
            {'name': '6-person families', 'value': 'B19119_006E'},
            {'name': '7-person families', 'value': 'B19119_007E'}

        ]
    }    
     
    'B16001': {
        'name': 'Language Spoken at Home by Ability to Speak English',
        'variables' : [
            {'name':'Spanish or Spanish Creole Speak English very well','value':'B16001_004E'},
            {'name':'Spanish or Spanish Creole Speak English Less than very well','value':'B16001_005E'},
            {'name':'French (incl. Patois,Cajun) Speak English very well','value':'B16001_007E'},
            {'name':'French (incl. Patois,Cajun) Speak English Less than very well','value':'B16001_008E'},
            {'name':'French Creole Speak English very well','value':'B16001_010E'},
            {'name':'French Creole Speak English Less than very well','value':'B16001_011E'},
            {'name':'Italian Speak English very well','value':'B16001_013E'},
            {'name':'Italian Speak English Less than very well','value':'B16001_014E'},
            {'name':'Portuguese or Portuguese Creole Speak English very well','value':'B16001_016E'},
            {'name':'Portuguese or Portuguese Creole Speak English Less than very well','value':'B16001_017E'},
            {'name':'German Speak English very well','value':'B16001_019E'},
            {'name':'German Speak English Less than very well','value':'B16001_020E'},
            {'name':'Yiddish Speak English very well','value':'B16001_022E'},
            {'name':'Yiddish Speak English Less than very well','value':'B16001_023E'},
            {'name':'Tagalog Speak English very well ','value':'B16001_094E'},
            {'name':'Tagalog Speak English Less than very well ','value':'B16001_095E'},
            {'name':'Greek Speak English very well','value':'B16001_031E'},
            {'name':'Greek Speak English Less than very well','value':'B16001_031E'},
            {'name':'Russian Speak English very well','value':'B16001_034E'},
            {'name':'Russian Speak English Less than very well','value':'B16001_035E'},
            {'name':'Polish Speak English very well','value':'B16001_037E'},
            {'name':'Polish Speak English Less than very well','value':'B16001_038E'},
            {'name':'Serbo-Croatian Speak English very well','value':'B16001_040E'},
            {'name':'Serbo-Croatian Speak English Less than very well','value':'B16001_041E'},
            {'name':'Other Salvic Languages Speak English very well','value':'B16001_043E'},
            {'name':'Other Salvic Languages Speak English Less than very well','value':'B16001_044E'},
            {'name':'Other Asian Languages Speak English very well ','value':'B16001_091E'},
            {'name':'Other Asian Languages Speak English Less than very well ','value':'B16001_092E'},
            {'name':'Persian Speak English very well','value':'B16001_049E'},
            {'name':'Persian Speak English Less than very well','value':'B16001_050E'},
            {'name':'Gujarati Speak English very well','value':'B16001_052E'},
            {'name':'Gujarati Speak English Less than very well','value':'B16001_053E'},
            {'name':'Hindi Speak English very well','value':'B16001_055E'},
            {'name':'Hindi Speak English Less than very well','value':'B16001_056E'},
            {'name':'Urdu Speak English very well','value':'B16001_058E'},
            {'name':'Urdu Speak English Less than very well','value':'B16001_059E'},
            {'name':'Other Indic languages Speak English very well','value':'B16001_061E'},
            {'name':'Other Indic languages Speak English Less than very well','value':'B16001_062E'},
            {'name':'Other Indo-European languages Speak English very well','value':'B16001_064E'},
            {'name':'Other Indo-European languages Speak English Less than very well','value':'B16001_065E'},
            {'name':'Chinese Speak English very well','value':'B16001_067E'},
            {'name':'Chinese Speak English Less than very well','value':'B16001_068E'},
            {'name':'Japanese Speak English very well','value':'B16001_070E'},
            {'name':'Japanese Speak English Less than very well','value':'B16001_071E'},
            {'name':'Korean Speak English very well','value':'B16001_073E'},
            {'name':'Korean Speak English Less than very well','value':'B16001_074E'},
            {'name':'Mon-Khmer Cambodian Speak English very well','value':'B16001_076E'},
            {'name':'Mon-Khmer Cambodian Speak English Less than very well','value':'B16001_077E'},
            {'name':'Scandinavian Languages Speak English very well','value':'B16001_028E'},
            {'name':'Scandinavian Languages Speak English Less than very well','value':'B16001_029E'},
            {'name':'Thai Speak English very well ','value':'B16001_082E'},
            {'name':'Thai Speak English Less than very well ','value':'B16001_083E'},
            {'name':'Loatian Speak English very well ','value':'B16001_085E'},
            {'name':'Loatian Speak English Less than very well ','value':'B16001_086E'},
            {'name':'Vietnamese Speak English very well ','value':'B16001_088E'},
            {'name':'Vietnamese Speak English Less than very well ','value':'B16001_089E'},
            {'name':'Armenian Speak English very well','value':'B16001_046E'},
            {'name':'Armenian Speak English Less than very well','value':'B16001_047E'},
            {'name':'Hmong Speak English very well ','value':'B16001_079E'},
            {'name':'Hmong Speak English Less than very well ','value':'B16001_080E'},
            {'name':'Other Pacific Island Languages Speak English very well ','value':'B16001_097E'},
            {'name':'Other Pacific Island Languages Speak English Less than very well ','value':'B16001_098E'},
            {'name':'Other Native North American Languages Speak English very well ','value':'B16001_103E'},
            {'name':'Other Native North American Languages Speak English Less than very well ','value':'B16001_104E'},
            {'name':'Hungarian Speak English very well ','value':'B16001_106E'},
            {'name':'Hungarian Speak English Less than very well ','value':'B16001_107E'},
            {'name':'Arabic Speak English very well ','value':'B16001_109E'},
            {'name':'Arabic Speak English Less than very well ','value':'B16001_110E'},
            {'name':'Hebrew Speak English very well ','value':'B16001_112E'},
            {'name':'Hebrew Speak English Less than very well ','value':'B16001_113E'},
            {'name':'African Languages Speak English very well ','value':'B16001_115E'},
            {'name':'African Languages Speak English Less than very well ','value':'B16001_116E'}

        ]
    }
    
    'B01001': {
        'name': 'Sex by Age',
        'variables': [
            {'name':'Total Population','value':'B01001_001E'},
            {'name':'Male Population','value':'B01001_002E'},
            {'name':'Male Under 5','value':'B01001_003E'},
            {'name':'Male 5-9','value':'B01001_004E'},
            {'name':'Male 10-14','value':'B01001_005E'},
            {'name':'Male 15-17','value':'B01001_006E'},
            {'name':'Male 18-19','value':'B01001_007E'},
            {'name':'Male 20','value':'B01001_008E'},
            {'name':'Male 21','value':'B01001_009E'},
            {'name':'Male 22-24','value':'B01001_010E'},
            {'name':'Male 25-29','value':'B01001_011E'},
            {'name':'Male 30-34','value':'B01001_012E'},
            {'name':'Male 35-39','value':'B01001_013E'},
            {'name':'Male 40-44','value':'B01001_014E'},
            {'name':'Male 45-49','value':'B01001_015E'},
            {'name':'Male 50-54','value':'B01001_016E'},
            {'name':'Male 55-59','value':'B01001_017E'},
            {'name':'Male 60-61','value':'B01001_018E'},
            {'name':'Male 62-64','value':'B01001_019E'},
            {'name':'Male 65-66','value':'B01001_020E'},
            {'name':'Male 67-69','value':'B01001_021E'},
            {'name':'Male 70-74','value':'B01001_022E'},
            {'name':'Male 75-79','value':'B01001_023E'},
            {'name':'Male 80-84','value':'B01001_024E'},
            {'name':'Male 85 over','value':'B01001_025E'},
            {'name':'Female Population','value':'B01001_026E'},
            {'name':'Female Under 5','value':'B01001_027E'},
            {'name':'Female 5-9','value':'B01001_028E'},
            {'name':'Female 10-14','value':'B01001_029E'},
            {'name':'Female 15-17','value':'B01001_030E'},
            {'name':'Female 18-19','value':'B01001_031E'},
            {'name':'Female 20','value':'B01001_032E'},
            {'name':'Female 21','value':'B01001_033E'},
            {'name':'Female 22-24','value':'B01001_034E'},
            {'name':'Female 25-29','value':'B01001_035E'},
            {'name':'Female 30-34','value':'B01001_036E'},
            {'name':'Female 35-39','value':'B01001_037E'},
            {'name':'Female 40-44','value':'B01001_038E'},
            {'name':'Female 45-49','value':'B01001_039E'},
            {'name':'Female 50-54','value':'B01001_040E'},
            {'name':'Female 55-59','value':'B01001_041E'},
            {'name':'Female 60-61','value':'B01001_042E'},
            {'name':'Female 62-64','value':'B01001_043E'},
            {'name':'Female 65-66','value':'B01001_044E'},
            {'name':'Female 67-69','value':'B01001_045E'},
            {'name':'Female 70-74','value':'B01001_046E'},
            {'name':'Female 75-79','value':'B01001_047E'},
            {'name':'Female 80-84','value':'B01001_048E'},
            {'name':'Female 85 over','value':'B01001_049E'}

        ]
    },
    'B19013':{
        'name': 'Median Household Income in the Past 12 Months (In 2010 Inflation-Adjusted Dollars)',
        'variables' :[
            {'name':'Median household income in the past 12 months', 'value':'B19013_001E'}
        ]
    },
    
    'B23008': {
        'name': 'Own children under 18 years in families and subfamilies',
        'variables' : [
            {'name': 'Total','value':'B23008_001E'},
            {'name': 'Under 6 years','value':'B23008_002E'},
            {'name': 'Living with two parents','value':'B23008_003E'},
            {'name': 'Both Parents in labor force','value':'B23008_004E'},
            {'name': 'Father only in labor force','value':'B23008_005E'},
            {'name': 'Mother only in labor force','value':'B23008_006E'},
            {'name': 'Neither parent in labor force','value':'B23008_007E'},
            {'name': 'Living with one parent','value':'B23008_008E'},
            {'name': 'Living with father','value':'B23008_009E'},
            {'name': 'In labor force','value':'B23008_010E'},
            {'name': 'Not in labor force','value':'B23008_011E'},
            {'name': 'Living with mother','value':'B23008_012E'},
            {'name': 'In labor force','value':'B23008_013E'},
            {'name': 'Not in labor force','value':'B23008_014E'},
            {'name': '6 to 17 years','value':'B23008_015E'},
            {'name': 'Living with two parents','value':'B23008_016E'},
            {'name': 'Both Parents in labor force','value':'B23008_017E'},
            {'name': 'Father only in labor force','value':'B23008_018E'},
            {'name': 'Mother only in labor force','value':'B23008_019E'},
            {'name': 'Neither parent in labor force','value':'B23008_020E'},
            {'name': 'Living with one parent','value':'B23008_021E'},
            {'name': 'Living with father','value':'B23008_022E'},
            {'name': 'In labor force','value':'B23008_023E'},
            {'name': 'Not in labor force','value':'B23008_024E'},
            {'name': 'Living with mother','value':'B23008_025E'},
            {'name': 'In labor force','value':'B23008_026E'},
            {'name': 'Not in labor force','value':'B23008_027E'}
        ]
    }
    'B01001': {
        'name': 'Sex by Age',
        'variables': [
            {'name':'Total Population','value':'B01001_001E'},
            {'name':'Male Population','value':'B01001_002E'},
            {'name':'Male Under 5','value':'B01001_003E'},
            {'name':'Male 5-9','value':'B01001_004E'},
            {'name':'Male 10-14','value':'B01001_005E'},
            {'name':'Male 15-17','value':'B01001_006E'},
            {'name':'Male 18-19','value':'B01001_007E'},
            {'name':'Male 20','value':'B01001_008E'},
            {'name':'Male 21','value':'B01001_009E'},
            {'name':'Male 22-24','value':'B01001_010E'},
            {'name':'Male 25-29','value':'B01001_011E'},
            {'name':'Male 30-34','value':'B01001_012E'},
            {'name':'Male 35-39','value':'B01001_013E'},
            {'name':'Male 40-44','value':'B01001_014E'},
            {'name':'Male 45-49','value':'B01001_015E'},
            {'name':'Male 50-54','value':'B01001_016E'},
            {'name':'Male 55-59','value':'B01001_017E'},
            {'name':'Male 60-61','value':'B01001_018E'},
            {'name':'Male 62-64','value':'B01001_019E'},
            {'name':'Male 65-66','value':'B01001_020E'},
            {'name':'Male 67-69','value':'B01001_021E'},
            {'name':'Male 70-74','value':'B01001_022E'},
            {'name':'Male 75-79','value':'B01001_023E'},
            {'name':'Male 80-84','value':'B01001_024E'},
            {'name':'Male 85 over','value':'B01001_025E'},
            {'name':'Female Population','value':'B01001_026E'},
            {'name':'Female Under 5','value':'B01001_027E'},
            {'name':'Female 5-9','value':'B01001_028E'},
            {'name':'Female 10-14','value':'B01001_029E'},
            {'name':'Female 15-17','value':'B01001_030E'},
            {'name':'Female 18-19','value':'B01001_031E'},
            {'name':'Female 20','value':'B01001_032E'},
            {'name':'Female 21','value':'B01001_033E'},
            {'name':'Female 22-24','value':'B01001_034E'},
            {'name':'Female 25-29','value':'B01001_035E'},
            {'name':'Female 30-34','value':'B01001_036E'},
            {'name':'Female 35-39','value':'B01001_037E'},
            {'name':'Female 40-44','value':'B01001_038E'},
            {'name':'Female 45-49','value':'B01001_039E'},
            {'name':'Female 50-54','value':'B01001_040E'},
            {'name':'Female 55-59','value':'B01001_041E'},
            {'name':'Female 60-61','value':'B01001_042E'},
            {'name':'Female 62-64','value':'B01001_043E'},
            {'name':'Female 65-66','value':'B01001_044E'},
            {'name':'Female 67-69','value':'B01001_045E'},
            {'name':'Female 70-74','value':'B01001_046E'},
            {'name':'Female 75-79','value':'B01001_047E'},
            {'name':'Female 80-84','value':'B01001_048E'},
            {'name':'Female 85 over','value':'B01001_049E'}

        ]
    }
    'B01002': {
        'name': 'Median Age by Sex',
        'variables': [
            {'name':'Median Age','value':'B01002_001E'},
            {'name':'Median Age Male','value':'B01002_002E'},
            {'name':'Median Age Female','value':'B01002_003E'}
        ]
    },
    
    'C02003':{
        'name': 'Ethinic Population by Race',
        'variables':[
            {'name':'Total','value':'C02003_001E'},
            {'name':'Not Hispanic or Latino','value':'C02003_002E'},
            {'name':'White Alone','value':'C02003_003E'},
            {'name':'Black or African American alone','value':'C02003_004E'},
            {'name':'American Indian and Alaska Native alone','value':'C02003_005E'},
            {'name':'Asian alone','value':'C02003_006E'},
            {'name':'Native Hawaiian and Other Pacific Islander alone','value':'C02003_007E'},
            {'name':'Some other race alone','value':'C02003_008E'},
            {'name':'Two or more races','value':'C02003_009E'},
            {'name':'Two races including Some other race','value':'C02003_010E'},
            {'name':'Two races excluding Some other race, and three or more races','value':'C02003_011E'},
            {'name':'Hispanic or Latino','value':'C02003_012E'}
        ]
    },
    'B19083':{
        'name':'Gini Index of Income Inequality',
        'variables':[
            {'name':'Gini Index','value':'B19083_001E'}
        ]
    },
    'B19025':{
        'name':'Aggregate Household Income',
        'variables':[
            {'name':'Aggregate household income in the past 12 months (in 2010 inflation-adjusted dollars)','value':'B19025_001E'}
        ]
    },
    'B19301':{
        'name':'Per Capita Income',
        'variables':[
            {'name':'Per capita income in the past 12 months (in 2010 inflation-adjusted dollars)','value':'B19301_001E'}
        ]
    },
    'B23020':{
        'name':'Mean Usual Hours Worked for Workers 16 to 64 ',
        'variables':[
            {'name':'Total','value':'B23020_001E'},
            {'name':'Male','value':'B23020_002E'},
            {'name':'Female','value':'B23020_003E'}
        ]
    },
    'B25003':{
        'name': 'Occupied Housing Units Tenure',
        'variables':[
            {'name':'Total','value':'B25003_001E'},
            {'name':'Owner occupied','value':'B25003_002E'},
            {'name':'Renter occupied','value':'B25003_003E'}
        ]
    },
    'B08301':{
        'name': 'Means of Transportation to Work',
        'variables':[
            {'name':'Total','value':'B08301_001E'},
            {'name':'Car, truck, or van','value':'B08301_002E'},
            {'name':'Drove alone','value':'B08301_003E'},
            {'name':'Carpooled','value':'B08301_004E'},
            {'name':'In 2-person carpool','value':'B08301_005E'},
            {'name':'In 3-person carpool','value':'B08301_006E'},
            {'name':'In 4-person carpool','value':'B08301_007E'},
            {'name':'In 5- or 6-person carpool','value':'B08301_008E'},
            {'name':'In 7-or-more-person carpool','value':'B08301_009E'},
            {'name':'Public transportation (excluding taxicab)','value':'B08301_010E'},
            {'name':'Bus or trolley bus','value':'B08301_011E'},
            {'name':'Streetcar or trolley car (carro publico in Puerto Rico)','value':'B08301_012E'},
            {'name':'Subway or elevated','value':'B08301_013E'},
            {'name':'Railroad','value':'B08301_014E'},
            {'name':'Ferryboat','value':'B08301_015E'},
            {'name':'Taxicab','value':'B08301_016E'},
            {'name':'Motorcycle','value':'B08301_017E'},
            {'name':'Bicycle','value':'B08301_018E'},
            {'name':'Walked','value':'B08301_019E'},
            {'name':'Other means','value':'B08301_020E'},
            {'name':'Worked at home','value':'B08301_021E'}
        ]
    },
    'B08303':{
        'name': 'Travel Time to Work',
        'variables':[
            {'name':'Total','value':'B08303_001E'},
            {'name':'Less than 5 minutes','value':'B08303_002E'},
            {'name':'5 to 9 minutes','value':'B08303_003E'},
            {'name':'10 to 14 minutes','value':'B08303_004E'},
            {'name':'15 to 19 minutes','value':'B08303_005E'},
            {'name':'20 to 24 minutes','value':'B08303_006E'},
            {'name':'25 to 29 minutes','value':'B08303_007E'},
            {'name':'30 to 34 minutes','value':'B08303_008E'},
            {'name':'35 to 39 minutes','value':'B08303_009E'},
            {'name':'40 to 44 minutes','value':'B08303_010E'},
            {'name':'45 to 59 minutes','value':'B08303_011E'},
            {'name':'60 to 89 minutes','value':'B08303_012E'},
            {'name':'90 or more minutes','value':'B08303_013E'}
        ]
    },
    'B25077':{
        'name': 'Housing Units Median value',
        'variables':[
            {'name':'Median value(dollars)','value':'B25077_001E'}
        ]
    },
    'B17001':{
        'name': 'Poverty Status in the Past 12 Months',
        'variables':[
            {'name':'Total','value':'B17001_001E'},
            {'name':'Income in the past 12 months below poverty level','value':'B17001_002E'},
            {'name':'Male','value':'B17001_003E'},
            {'name':'Under 5 years','value':'B17001_004E'},
            {'name':'5 years','value':'B17001_005E'},
            {'name':'6 to 11 years','value':'B17001_006E'},
            {'name':'12 to 14 years','value':'B17001_007E'},
            {'name':'15 years','value':'B17001_008E'},
            {'name':'16 and 17 years','value':'B17001_009E'},
            {'name':'18 to 24 years','value':'B17001_010E'},
            {'name':'25 to 34 years','value':'B17001_011E'},
            {'name':'35 to 44 years','value':'B17001_012E'},
            {'name':'45 to 54 years','value':'B17001_013E'},
            {'name':'55 to 64 years','value':'B17001_014E'},
            {'name':'65 to 74 years','value':'B17001_015E'},
            {'name':'75 years and over','value':'B17001_016E'},
            {'name':'Female','value':'B17001_017E'},
            {'name':'Under 5 years','value':'B17001_018E'},
            {'name':'5 years','value':'B17001_019E'},
            {'name':'6 to 11 years','value':'B17001_020E'},
            {'name':'12 to 14 years','value':'B17001_021E'},
            {'name':'15 years','value':'B17001_022E'},
            {'name':'16 and 17 years','value':'B17001_023E'},
            {'name':'18 to 24 years','value':'B17001_024E'},
            {'name':'25 to 34 years','value':'B17001_025E'},
            {'name':'35 to 44 years','value':'B17001_026E'},
            {'name':'45 to 54 years','value':'B17001_027E'},
            {'name':'55 to 64 years','value':'B17001_028E'},
            {'name':'65 to 74 years','value':'B17001_029E'},
            {'name':'75 years and over','value':'B17001_030E'},
            {'name':'Income in the past 12 months above poverty level','value':'B17001_031E'},
            {'name':'Male','value':'B17001_032E'},
            {'name':'Under 5 years','value':'B17001_033E'},
            {'name':'5 years','value':'B17001_034E'},
            {'name':'6 to 11 years','value':'B17001_035E'},
            {'name':'12 to 14 years','value':'B17001_036E'},
            {'name':'15 years','value':'B17001_037E'},
            {'name':'16 and 17 years','value':'B17001_038E'},
            {'name':'18 to 24 years','value':'B17001_039E'},
            {'name':'25 to 34 years','value':'B17001_040E'},
            {'name':'35 to 44 years','value':'B17001_041E'},
            {'name':'45 to 54 years','value':'B17001_042E'},
            {'name':'55 to 64 years','value':'B17001_043E'},
            {'name':'65 to 74 years','value':'B17001_044E'},
            {'name':'75 years and over','value':'B17001_045E'},
            {'name':'Female','value':'B17001_046E'},
            {'name':'Under 5 years','value':'B17001_047E'},
            {'name':'5 years','value':'B17001_048E'},
            {'name':'6 to 11 years','value':'B17001_049E'},
            {'name':'12 to 14 years','value':'B17001_050E'},
            {'name':'15 years','value':'B17001_051E'},
            {'name':'16 and 17 years','value':'B17001_052E'},
            {'name':'18 to 24 years','value':'B17001_053E'},
            {'name':'25 to 34 years','value':'B17001_054E'},
            {'name':'35 to 44 years','value':'B17001_055E'},
            {'name':'45 to 54 years','value':'B17001_056E'},
            {'name':'55 to 64 years','value':'B17001_057E'},
            {'name':'65 to 74 years','value':'B17001_058E'},
            {'name':'75 years and over','value':'B17001_059E'}
        ]
    },
    'B11001':{
        'name': 'Population by household type',
        'variables':[
            {'name':'Total','value':'B11001_001E'},
            {'name':'Family households','value':'B11001_002E'},
            {'name':'Married-couple family','value':'B11001_003E'},
            {'name':'Other family','value':'B11001_004E'},
            {'name':'Male householder, no wife present','value':'B11001_005E'},
            {'name':'Female householder, no husband present','value':'B11001_006E'},
            {'name':'Nonfamily households','value':'B11001_007E'},
            {'name':'Householder living alone','value':'B11001_008E'},
            {'name':'Householder not living alone','value':'B11001_009E'}
        ]
    },
    'B25002':{
        'name': 'Occupied vs. Vacant Housing Units',
        'variables':[
            {'name':'Total','value':'B25002_001E'},
            {'name':'Occupied','value':'B25002_002E'},
            {'name':'Vacant','value':'B25002_003E'}
        ]
    },
    'B21002':{
        'name': 'Veterans by wartime service',
        'variables':[
            {'name':'Total','value':'B21002_001E'},
            {'name':'Gulf War (9/2001 or later), no Gulf War (8/1990 to 8/2001), no Vietnam Era','value':'B21002_002E'},
            {'name':'Gulf War (9/2001 or later) and Gulf War (8/1990 to 8/2001), no Vietnam Era','value':'B21002_003E'},
            {'name':'Gulf War (9/2001 or later), and Gulf War (8/1990 to 8/2001), and Vietnam Era','value':'B21002_004E'},
            {'name':'Gulf War (8/1990 to 8/2001), no Vietnam Era','value':'B21002_005E'},
            {'name':'Gulf War (8/1990 to 8/2001) and Vietnam Era','value':'B21002_006E'},
            {'name':'Vietnam Era, no Korean War, no World War II','value':'B21002_007E'},
            {'name':'Vietnam Era and Korean War, no World War II','value':'B21002_008E'},
            {'name':'Vietnam Era and Korean War and World War II','value':'B21002_009E'},
            {'name':'Korean War, no Vietnam Era, no World War II','value':'B21002_010E'},
            {'name':'Korean War and World War II, no Vietnam Era','value':'B21002_011E'},
            {'name':'World War II, no Korean War, no Vietnam Era','value':'B21002_012E'},
            {'name':'Between Gulf War and Vietnam Era only','value':'B21002_013E'},
            {'name':'Between Vietnam Era and Korean War only','value':'B21002_014E'},
            {'name':'Between Korean War and World War II only','value':'B21002_015E'},
            {'name':'Pre-World War II only','value':'B21002_016E'}
        ]
    },
    'B05001':{
        'name': 'Citizenship status',
        'variables':[
            {'name':'Total','value':'B05001_001E'},
            {'name':'U.S. Citizen, Born in the United States','value':'B05001_002E'},
            {'name':'U.S. Citizen, Born in Puerto Rico or U.S. Island Areas','value':'B05001_003E'},
            {'name':'U.S. Citizen, Born Abroad of American Parent(S)','value':'B05001_004E'},
            {'name':'U.S. Citizen by Naturalization','value':'B05001_005E'},
            {'name':'Not a U.S. citizen','value':'B05001_006E'}
        ]
    },
    'B25002':{
        'name': 'Occupancy Status',
        'variables':[
            {'name':'Total','value':'B25002_001E'},
            {'name':'Occupied','value':'B25002_002E'},
            {'name':'Vacant','value':'B25002_003E'}
        ]
    }
    'B19057':{
        'name': 'Public Assistance Income for Households',
        'variables':[
            {'name':'Total','value':'B19057_001E'},
            {'name':'With public assistance income','value':'B19057_002E'},
            {'name':'No public assistance income','value':'B19057_003E'}
        ]
    },
    'B02001': {
        'name': 'Racial Population',
        'variables': [
            {'name':'Total','value':'B02001_001E'},
            {'name':'White alone','value':'B02001_002E'},
            {'name':'Black or African American alone','value':'B02001_003E'},
            {'name':'American Indian and Alaska Native alone','value':'B02001_004E'},
            {'name':'Asian alone','value':'B02001_005E'},
            {'name':'Native Hawaiian and Other Pacific Islander alone','value':'B02001_006E'},
            {'name':'Some other race alone','value':'B02001_007E'},
            {'name':'Two or more races','value':'B02001_008E'},
            {'name':'Two races including Some other race','value':'B02001_009E'},
            {'name':'Two races excluding Some other race, and three or more races','value':'B02001_010E'}
        ]
    },
    'B23025': {
        'name': 'Employment Status',
        'variables':[
            {'name':'Total','value':'B23025_001E'},
            {'name':'In labor force','value':'B23025_002E'},
            {'name':'Civilian labor force','value':'B23025_003E'},
            {'name':'Civilian labor force Employed','value':'B23025_004E'},
            {'name':'Civilian labor force Unemployed','value':'B23025_005E'},
            {'name':'Armed forces','value':'B23025_006E'},
            {'name':'Not in labor force','value':'B23025_007E'}
        ]
    },
    'B01003': {
        'name': 'Overall Population',
        'variables': [
            {'name':'Total','value':'B01003_001E'}
        ]
    }
}
'''