import json
import pandas as pd
import parcel_meta
from pandas.io.json import json_normalize

#parcel_meta = (pd.DataFrame(parcel_meta))
data = []
for meta,info in parcel_meta.meta_data.items():
    for value,desc in info.items() :
        data.append({'field':meta,'value':value,'name':desc['desc']})
#print('data',data)

df = pd.DataFrame(json_normalize(data),columns = ['field','value','name'])
pd.DataFrame.to_csv(df,'parcel_meta_data.csv',header=None,index=False)