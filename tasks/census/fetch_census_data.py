import json
import Config
import requests
from flatten_json import flatten
from pandas.io.json import json_normalize
import pandas as pd
import numpy as np
import itertools
url_1 = 'https://api.census.gov/data/2015/acs/acs5?get='   #'B01003_001E'
url_2 = '&for=block%20group:*&in=state:36&in=county:'
url_3 = '&in=tract:*'
counties = []
urls_initial = []
urls_middle = []
urls_final = []
for i in range(124):
    if i %2 != 0:
        if len(str(i)) == 1:
            counties.append('00'+str(i))
        elif len(str(i)) == 2:
            counties.append('0'+str(i))
        else:
            counties.append(str(i))


for var_id , info in Config.census_config.items():
    for item in info['variables']:
        census_var = item['value']
        first = url_1 + str(census_var)
        urls_initial.append(first)
for i in range(len(counties)):
    second = url_2 + str(counties[i])
    for j in range(len(urls_initial)):
        third = str(urls_initial[j]) + second
        urls_middle.append(third)
for i in range(len(urls_middle)):
    fourth = urls_middle[i] + url_3
    urls_final.append(fourth)
# ----- Creating final CSV to be inserted------

print len(urls_final)
#print urls_final[4011]
json_dict = {}
json_data = []
dict_flattened = []
chunk_urls =[]
outfile = open('data_2017.json', 'w')
# ----- Writing in file------

for i in range(len(urls_final))[0:5]: # change here fo every 100, start from the specified one here...
    print i
    req = requests.get(urls_final[i])
    json_data.append(req.json())
#----- Flattening the data -------

for data in json_data:
    json_dict["year"] = 2015
    json_dict["census_var"] = data[0][0]
    json_dict["data"] = [{
       "value" : data[1][0],
       "geoid" : data[1][1] + data[1][2] + data[1][3] + data[1][4]
    }]
    json.dump(json_dict, outfile)
    outfile.write(',')
    outfile.write('\n')
    dict_flattened.append(flatten(json_dict))
print dict_flattened

#------- Creating CSV ------------

json_dataframe = (pd.DataFrame(json_normalize(dict_flattened)))
json_dataframe.fillna(np.nan, inplace=True)
pd.DataFrame.to_csv(json_dataframe, 'data2.csv', header=None, index=False, na_rep='NaN')  #csv_columns = ['censvar','geoid','value','year']
outfile.close()












