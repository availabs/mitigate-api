import json
import Config
import requests
import remConfig
from flatten_json import flatten
from pandas.io.json import json_normalize
import pandas as pd
import numpy as np
import re
#url_blockgroup = '&for=block%20group:*&in=state:36&in=county:' need to add counties here
url_1 = 'https://api.census.gov/data/2016/acs/acs5?get=' #group(B01003)
url_county = '&for=county:*&in=state:36'
url_cousub = '&for=county%20subdivision:*&in=state:36'
url_tract = '&for=tract:*&in=state:36'
url_state = '&for=state:36'
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

#--------------------- for county,cousubs,tracts,state------------------------

for var_id,info in remConfig.census_config.items():
    url = url_1 + 'group(' + str(var_id) + ')' + url_cousub + url_key
    county_cousubs.append(url)
    for item in info['variables']:
        census_var.append(item['value'])
#print 'length of county urls',len(county_state)
#print 'number/length of counties',len(counties)


#---------------------for data gathering of counties ----------------------------------

'''
json_data = []
json_dict = {}


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
df_merged = reduce(lambda left, right: pd.merge(left, right, on=['state', 'county'], how='outer'), frames)
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
re16='(C)'
rg = re.compile(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)
#rg = re.compile(re16+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)
columns_needed = ['state','county']
columns_not_needed = []
for col in df_merged:
    m = rg.search(col)
    if m:
        columns_needed.append(col)
    else:
        if col not in columns_needed:
            columns_not_needed.append(col)
df_merged.drop(columns_not_needed,inplace=True, axis=1)
df_merged.to_csv('data.csv',index=False, na_rep='NaN')
result = pd.read_csv('data.csv')
data = {}
dict_flattened = []
for var in columns_needed[2:]:
    data[var] = []
for row in result.iterrows():
    county = str(int(row[1][-1]))
    if len(county) == 1:
        county = '00' + county
    elif len(county) == 2:
        county = '0' + county
    else:
        county = county
    geoid = int(str(int(row[1][-2])) + str(county))
    for key in data.keys():
        data[key] = [{'census_var':key,'geoid':geoid,'value':row[1][key],'year':2016}]
    for d in data.values():
        for i in d:
            print i
            dict_flattened.append(i)
df_insert = pd.DataFrame(json_normalize(dict_flattened))
df_insert.fillna(np.nan, inplace=True)
pd.DataFrame.to_csv(df_insert, 'data3.csv', header=None, index=False, na_rep='NaN')
'''

#---------------------for data gathering of cousubs ----------------------------------

json_data = []
json_dict = {}


for i in county_cousubs: #1 has already been inserted
    #if i == county_cousubs[23]:
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
df_merged = reduce(lambda left, right: pd.merge(left, right, on=['state', 'county'], how='outer'), frames)
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
re16='(C)'
rg = re.compile(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)
#rg = re.compile(re16+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)

columns_needed = ['state','county','county subdivision']
columns_not_needed = []
for col in df_merged:
    m = rg.search(col)
    if m:
        columns_needed.append(col)
    else:
        if col not in columns_needed:
            columns_not_needed.append(col)
df_merged.drop(columns_not_needed,inplace=True, axis=1)
df_merged.to_csv('data.csv',index=False, na_rep='NaN')
result = pd.read_csv('data.csv')
data = {}
dict_flattened = []
for var in columns_needed[3:]:
    data[var] = []
for row in result.iterrows():
    county = str(int(row[1][-2]))
    cousub = str(int(row[1][-1]))
    if len(county) == 1:
        county = '00' + county
    elif len(county) == 2:
        county = '0' + county
    else:
        county = county
    if len(cousub) == 4:
        cousub = '0' + cousub
    elif len(cousub) == 3:
        cousub = '00' + cousub
    if len(cousub) == 1:
        cousub = '0000' + cousub
    geoid = int(str(int(row[1][-3])) + str(county) + str(cousub))
    for key in data.keys():
        data[key] = [{'census_var':key,'geoid':geoid,'value':row[1][key],'year':2016}]
    for d in data.values():
        for i in d:
            print i
            dict_flattened.append(i)
df_insert = pd.DataFrame(json_normalize(dict_flattened))
df_insert.fillna(np.nan, inplace=True)
pd.DataFrame.to_csv(df_insert, 'data3.csv', header=None, index=False, na_rep='NaN')

#---------------------for data gathering of tracts ----------------------------------
'''

json_data = []
json_dict = {}


for i in county_tracts: #1 has already been inserted
    if i == county_tracts[23]:
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
df_merged = reduce(lambda left, right: pd.merge(left, right, on=['state', 'county'], how='outer'), frames)
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
re16='(C)'
#rg = re.compile(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)
rg = re.compile(re16+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)

columns_needed = ['state','county','tract']
columns_not_needed = []
for col in df_merged:
    m = rg.search(col)
    if m:
        columns_needed.append(col)
    else:
        if col not in columns_needed:
            columns_not_needed.append(col)
df_merged.drop(columns_not_needed,inplace=True, axis=1)
df_merged.to_csv('data.csv',index=False, na_rep='NaN')
result = pd.read_csv('data.csv')
data = {}
dict_flattened = []
for var in columns_needed[3:]:
    data[var] = []
for row in result.iterrows():
    county = str(int(row[1][-2]))
    tract = str(int(row[1][-1]))
    if len(county) == 1:
        county = '00' + county
    elif len(county) == 2:
        county = '0' + county
    else:
        county = county
    if len(tract) == 5:
        tract = '0' + tract
    elif len(tract) == 4:
        tract = '00' + tract
    elif len(tract) == 3:
        tract = '000' + tract
    geoid = int(str(int(row[1][-3])) + str(county) + str(tract))
    for key in data.keys():
        data[key] = [{'census_var':key,'geoid':geoid,'value':row[1][key],'year':2016}]
    for d in data.values():
        for i in d:
            print i
            dict_flattened.append(i)
df_insert = pd.DataFrame(json_normalize(dict_flattened))
df_insert.fillna(np.nan, inplace=True)
pd.DataFrame.to_csv(df_insert, 'data3.csv', header=None, index=False, na_rep='NaN')
'''

#---------------------for data gathering of state ----------------------------------

'''
json_data = []
json_dict = {}


for i in county_state: #1 has already been inserted
    if i == county_state[23]:
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
df_merged = reduce(lambda left, right: pd.merge(left, right, on=['state'], how='outer'), frames)
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
re16='(C)'
#rg = re.compile(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)
rg = re.compile(re16+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15,re.IGNORECASE|re.DOTALL)

columns_needed = ['state']
columns_not_needed = []
for col in df_merged:
    m = rg.search(col)
    if m:
        columns_needed.append(col)
    else:
        if col not in columns_needed:
            columns_not_needed.append(col)
df_merged.drop(columns_not_needed,inplace=True, axis=1)
df_merged.to_csv('data.csv',index=False, na_rep='NaN')
result = pd.read_csv('data.csv')
data = {}
dict_flattened = []
for var in columns_needed[3:]:
    data[var] = []
for row in result.iterrows():
    geoid = int(str(int(row[1][-1])))
    for key in data.keys():
        data[key] = [{'census_var':key,'geoid':geoid,'value':row[1][key],'year':2016}]
    for d in data.values():
        for i in d:
            print i
            dict_flattened.append(i)
df_insert = pd.DataFrame(json_normalize(dict_flattened))
df_insert.fillna(np.nan, inplace=True)
pd.DataFrame.to_csv(df_insert, 'data3.csv', header=None, index=False, na_rep='NaN')
'''
