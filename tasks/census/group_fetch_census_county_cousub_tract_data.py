import json
import Config
import remConfig
import requests
from flatten_json import flatten
from pandas.io.json import json_normalize
import pandas as pd
import numpy as np
import re
#url_blockgroup = '&for=block%20group:*&in=state:36&in=county:' need to add counties here
url_1 = 'https://api.census.gov/data/2017/acs/acs5?get=' #group(B01003)
url_county = '&for=county:*&in=state:36'
url_cousub = '&for=county%20subdivision:*&in=state:36'
url_tract = '&for=tract:*&in=state:36'
url_key = '&key=963ed427a382c553e7068b1d2da58023f2330c29'
counties = []
county_urls = []
county_cousubs = []
county_tracts = []
county_state = []
census_var = []
for i in range(124):
    if i %2 != 0:
        if len(str(i)) == 1:
            counties.append('00'+str(i))
        elif len(str(i)) == 2:
            counties.append('0'+str(i))
        else:
            counties.append(str(i))

#--------------------- for county,cousubs and tracts------------------------

for var_id,info in remConfig.census_config.items():
    url = url_1 + 'group(' + str(var_id) + ')' + url_cousub + url_key
    county_cousubs.append(url)
    for item in info['variables']:
        census_var.append(item['value'])
#print 'length of county urls',len(county_tracts)
print 'number/length of counties',len(counties)


#---------------------for data gathering----------------------------------

json_data = []
json_dict = {}
columns_needed = []
columns_not_needed = []
fixed_columns = ['GEO_ID','NAME','state','county']

for i in county_cousubs:
    #if i == county_urls:
    print i
    req = requests.get(i)
    json_data.append(req.json())

result = pd.DataFrame()
frames = []

for sublist in json_data:
    df_list = []
    for i, subsublist in enumerate(sublist):
        if i is not 0:
            df_list.append(subsublist)
    df = pd.DataFrame(columns=sublist[0],data=df_list)
    frames.append(df)

df_merged = reduce(lambda left, right: pd.merge(left, right, on=['GEO_ID', 'NAME', 'state', 'county'], how='outer'), frames)
re1='(B)'	# Any Single Word Character (Not Whitespace) 1
re2='.*?'	# Non-greedy match on filler
re3='.'	# Uninteresting: c
re4='.*?'	# Non-greedy match on filler
re5='.'	# Uninteresting: c
re6='.*?'	# Non-greedy match on filler
re7='.'	# Uninteresting: c
re8='.*?'	# Non-greedy match on filler
re9='.'	# Uninteresting: c
re10='.*?'	# Non-greedy match on filler
re11='.'	# Uninteresting: c
re12='.*?'	# Non-greedy match on filler
re13='(.)'	# Any Single Character 1
re14='.*?'	# Non-greedy match on filler
re15='(E)$'	# Any Single Character 2
re16 ='(C)'

rg = re.compile(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)
#rg = re.compile(re16+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)

for col in df_merged:
    m = rg.search(col)
    if m:
        columns_needed.append(col)
    else:
        if col not in fixed_columns:
            columns_not_needed.append(col)
print columns_needed
df_merged.drop(columns_not_needed,inplace=True, axis=1)

df_merged.to_csv('data.csv',index=False, na_rep='NaN')

result = pd.read_csv('data.csv')
final_result = pd.DataFrame()
final_result = result.drop(['NAME','state','county'],axis=1)
data = {}
dict_flattened = []
for var in columns_needed:
    data[var] = []
for row in final_result.iterrows():
    for key in data.keys():
        data[key] = [{'census_var':key,'geoid':row[1][0][9:],'value':row[1][key],'year':2017}]
    for d in data.values():
        for i in d:
            print i
            dict_flattened.append(i)
df_insert = pd.DataFrame(json_normalize(dict_flattened))
df_insert.fillna(np.nan, inplace=True)
pd.DataFrame.to_csv(df_insert, 'data3.csv', header=None, index=False, na_rep='NaN')



