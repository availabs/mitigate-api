import json
import Config
import requests
from flatten_json import flatten
from pandas.io.json import json_normalize
import pandas as pd
import numpy as np
import re
import math
#url_blockgroup = '&for=block%20group:*&in=state:36&in=county:' need to add counties here
url_1 = 'https://api.census.gov/data/2017/acs/acs5?get=' #group(B01003)
url_county = '&for=county:*&in=state:36'
url_cousub = '&for=county%20subdivision:*&in=state:36'
url_tract = '&for=tract:*&in=state:36'
url_state = '&for=state:36'
url_blockgroup = '&for=block%20group:*&in=state:36'
url_bg_county = '&in=county:'
url_bg_tract = '&in=tract:*'
counties = []
county_urls = []
county_cousubs = []
county_tracts = []
census_var = []
county_blockgroups = []
bgs_urls = []
for i in range(124):
    if i %2 != 0:
        if len(str(i)) == 1:
            counties.append('00'+str(i))
        elif len(str(i)) == 2:
            counties.append('0'+str(i))
        else:
            counties.append(str(i))

#------------------for Blockgroups-----------------------------
url_initial = []
url_final = []
for var_id,info in Config.census_config.items():
    url = url_1 + 'group(' + str(var_id) + ')' + url_blockgroup
    county_blockgroups.append(url)

for i in range(len(counties)):
    first = url_bg_county + str(counties[i])
    url_initial.append(first)
for j in range(len(county_blockgroups)):
    for k in range(len(url_initial)):
        second = county_blockgroups[j] + url_initial[k]
        url_final.append(second)

for l in range(len(url_final)):
    third = str(url_final[l]) + str(url_bg_tract)
    bgs_urls.append(third)

#---------------------for data gathering----------------------------------

json_data = []
json_dict = {}
columns_needed = []
columns_not_needed = []
print len(bgs_urls)

for i in bgs_urls[0:8]: #start from here
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
df_merged = reduce(lambda left, right: pd.merge(left, right, on=['GEO_ID','NAME','state','county','tract','block group'], how='outer'), frames)
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
re15='(E_x)$'	# Any Single Character 2

re16='(E_y)$'
fixed_columns = ['GEO_ID','NAME','state','county','tract','block group']
rg1 = re.compile(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)
rg2=  re.compile(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re16,re.IGNORECASE|re.DOTALL)
for col in df_merged:
    m = rg1.search(col)
    n = rg2.search(col)
    if m or n:
        columns_needed.append(col)
    else:
        if col not in fixed_columns:
            columns_not_needed.append(col)
df_merged.drop(columns_not_needed,inplace=True, axis=1)
df_merged.to_csv('data.csv',index=False, na_rep='NaN')
result = pd.read_csv('data.csv')
final_result = pd.DataFrame()
final_result = result.drop(['NAME','state','county','tract','block group'],axis=1)

data = {}
dict_flattened = []
for var in columns_needed:
    data[var] = []

for row in final_result.iterrows():
    print row
    for key in data.keys():
        '''
        To check till the length og bg_urls and iterarte over the string(.1)....
        because the vars are created as many as the length of bg_urls and works fine for even number 
        
        '''
        if math.isnan(row[1][key]) == False:
            data[key] = [{'census_var':key[:-2],'geoid':row[1][0][9:],'value':row[1][key],'year':2017}]
        elif math.isnan(row[1][key + str('.1')]) == False:
            data[key] = [{'census_var':key[:-2],'geoid':row[1][0][9:],'value':row[1][key+str('.1')],'year':2017}]
    for d in data.values():
        for i in d:
            print i
            dict_flattened.append(i)
df_insert = pd.DataFrame(json_normalize(dict_flattened))
df_insert.fillna(np.nan, inplace=True)
pd.DataFrame.to_csv(df_insert, 'data3.csv', header=None, index=False, na_rep='NaN')




