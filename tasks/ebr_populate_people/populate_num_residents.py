import pandas
import random
import numpy as np
import math
from collections import OrderedDict, defaultdict
import random

building_population_data = pandas.read_csv('output_population.csv')
single_family_residential_count = 0
two_family_residential_count = 0
single_family_residential_accessory_count = 0
three_family_residential_count = 0
mobile_home_count = 0

apartments_count = 0
converted_single_family_residential_count = 0
adaptable_building_count = 0
retail_apartment_count = 0
retail_apartment_detached_count = 0

orphanages_count = 0
colleges_count = 0
old_age_homes_count = 0

prop_class_lower = [210,215,220,230,270,633,483]
prop_class_middle = [411,480,481,482]
prop_class_upper = [613,631]

geoids= list(building_population_data.geoid.unique())
population_in_geoids= list(building_population_data.population.unique())
population_dict = {}
generated_population = {}
total_residents_previous = {}
total_residents = {}
difference = {}
to_be_assigned_upper_dict = {}
to_be_assigned_middle_dict = {}
to_be_assigned_lower_dict = {}
prop_class_upper_count_dict = {}
prop_class_middle_count_dict = {}
prop_class_lower_count_dict =  {}
excess = {}
for geoid,value in zip(geoids,population_in_geoids):
    population_dict.update({
        geoid : value
    })
print 'actual population of geoids',population_dict

for row in building_population_data.index:
    #------------------------------------Lower units ---------------------------------------

    if building_population_data.at[row,'prop_class'] == 210 and math.isnan(building_population_data.at[row,'nbr_bedrooms']): #one family residence
        building_population_data.at[row,'num_residents'] = 3
        single_family_residential_count +=1
    elif building_population_data.at[row,'prop_class'] == 215 and math.isnan(building_population_data.at[row,'nbr_bedrooms']):
        building_population_data.at[row,'num_residents'] = 5
        single_family_residential_accessory_count +=1
    elif building_population_data.at[row,'prop_class'] == 220 and math.isnan(building_population_data.at[row,'nbr_bedrooms']): # two family residence
        building_population_data.at[row,'num_residents'] = 6
        two_family_residential_count +=1
    elif building_population_data.at[row,'prop_class'] == 230 and math.isnan(building_population_data.at[row,'nbr_bedrooms']):
        building_population_data.at[row,'num_residents'] = 9
        three_family_residential_count +=1
    elif building_population_data.at[row,'prop_class'] == 270 and math.isnan(building_population_data.at[row,'nbr_bedrooms']): #mobile home
        building_population_data.at[row,'num_residents'] = 2
        mobile_home_count +=1

    #-------------------------------------Middle units------------------------------------------

    elif building_population_data.at[row,'prop_class'] == 411: #apartments
        apartments_count +=1
    elif building_population_data.at[row,'prop_class'] == 480: #building readily adaptable
        adaptable_building_count +=1
    elif building_population_data.at[row,'prop_class'] == 481: #retail services on first floor and apartments/offices on the upper floors(common wall)
        retail_apartment_count +=1
    elif building_population_data.at[row,'prop_class'] == 482: #retail services on first floor and apartments/offices on the upper floors(common wall) detached
        retail_apartment_detached_count +=1
    elif building_population_data.at[row,'prop_class'] == 483: # converted residence with home and commercial unit
        building_population_data.at[row,'num_residents'] = 4
        converted_single_family_residential_count  +=1

    #-------------------------------------- Larger units----------------------------------------------

    elif building_population_data.at[row,'prop_class'] == 613: #colleges
        colleges_count +=1
    elif building_population_data.at[row,'prop_class'] == 631: #orphanages
        orphanages_count +=1
    elif building_population_data.at[row,'prop_class'] == 633: #homes for the aged
        old_age_homes_count +=1

    #---------------------------------- according to nbr bedroom ------------------------------------------

    elif math.isnan(building_population_data.at[row,'nbr_bedrooms']) == False :
        building_population_data.at[row,'num_residents'] = building_population_data.at[row,'nbr_bedrooms']

for items in building_population_data.groupby('geoid')['num_residents'].sum().iteritems():
    total_residents_previous.update({
        items[0] : items[1]
    })
geoids = total_residents_previous.keys()
for geoid in geoids:
    prop_class_upper_count_dict.update({
             geoid : 0
    })
    prop_class_middle_count_dict.update({
        geoid : 0
    })
    prop_class_lower_count_dict.update({
        geoid : 0
    })
#--------------------------------- Categorizing according to prop_classes------------------------------------
for row in building_population_data.index:
    if building_population_data.at[row,'prop_class'] in prop_class_upper:
        if math.isnan(building_population_data.at[row,'nbr_bedrooms']):
            prop_class_upper_count_dict[building_population_data.at[row,'geoid']] +=1
    if building_population_data.at[row,'prop_class'] in prop_class_middle :
        if math.isnan(building_population_data.at[row,'nbr_bedrooms']):
            prop_class_middle_count_dict[building_population_data.at[row,'geoid']] +=1
    if building_population_data.at[row,'prop_class'] in prop_class_lower :
        if math.isnan(building_population_data.at[row,'nbr_bedrooms']):
            prop_class_lower_count_dict[building_population_data.at[row,'geoid']] +=1
for geoid in geoids:
    if prop_class_upper_count_dict[geoid] == 0:
        to_be_assigned_upper_dict.update({
                geoid : 0
            })
    else :
        to_be_assigned_upper_dict.update({
            geoid : 0.6 * (population_dict[geoid] - total_residents_previous[geoid]) / prop_class_upper_count_dict[geoid]
    })
    if prop_class_middle_count_dict[geoid] == 0:
        to_be_assigned_middle_dict.update({
            geoid : 0
        })
    else:
        to_be_assigned_middle_dict.update({
            geoid : 0.3 * (population_dict[geoid] - total_residents_previous[geoid])/prop_class_middle_count_dict[geoid]
        })
    if prop_class_lower_count_dict[geoid] == 0:
        to_be_assigned_lower_dict.update({
            geoid : 0
        })
    else:
        to_be_assigned_lower_dict.update({
            geoid : 0.1 * (population_dict[geoid] - total_residents_previous[geoid]) / prop_class_lower_count_dict[geoid]
        })
#-------------------------------------------assigning num_residents according to the percentage-----------------------------------------------------
for row in building_population_data.index :
    if building_population_data.at[row,'prop_class'] in prop_class_upper:
        if math.isnan(building_population_data.at[row,'nbr_bedrooms']):
           building_population_data.at[row,'num_residents'] = math.floor(to_be_assigned_upper_dict[building_population_data.at[row,'geoid']])
    if building_population_data.at[row,'prop_class'] in prop_class_middle :
        if math.isnan(building_population_data.at[row,'nbr_bedrooms']):
           building_population_data.at[row,'num_residents'] = math.floor(to_be_assigned_middle_dict[building_population_data.at[row,'geoid']])
    if building_population_data.at[row,'prop_class'] in prop_class_lower :
        if math.isnan(building_population_data.at[row,'nbr_bedrooms']):
           building_population_data.at[row,'num_residents'] = math.floor(to_be_assigned_lower_dict[building_population_data.at[row,'geoid']])

for items in building_population_data.groupby('geoid')['num_residents'].sum().iteritems():
    total_residents.update({
        items[0] : items[1]
    })
print 'total_residents after assigning certain values',total_residents
random_numbers_list = []
for geoid in geoids:
    if total_residents[geoid] < population_dict[geoid]:
        difference[geoid] = population_dict[geoid] - total_residents[geoid]
    if total_residents[geoid] > population_dict[geoid]:
        excess[geoid] = total_residents[geoid] - population_dict[geoid]

#--------------------- difference--------------------------------------------------------
for geoid,value in difference.iteritems():
    for row in building_population_data.index:
        if value == difference[geoid]:
            if building_population_data.at[row,'geoid'] == geoid:
                if math.isnan(building_population_data.at[row,'num_residents']) is False:
                    while value > 0 :
                        random_number = row
                        inc = building_population_data.loc[[random_number]]['num_residents'] + 1
                        final_inc = inc
                        building_population_data.at[random_number,'num_residents'] = final_inc
                        value = value - 1

#------------------------- excess----------------------------------------------------------
for geoid,value in excess.iteritems():
    for row in building_population_data.index:
        if value == excess[geoid]:
            if building_population_data.at[row,'geoid'] == geoid:
                if math.isnan(building_population_data.at[row,'num_residents']) is False:
                    while value > 0 :
                        random_number = row
                        inc = building_population_data.loc[[random_number]]['num_residents'] - 1
                        final_inc = inc
                        building_population_data.at[random_number,'num_residents'] = final_inc
                        value = value - 1
for items in building_population_data.groupby('geoid')['num_residents'].sum().iteritems():
    generated_population.update({
        items[0] : items[1]
    })
print 'generated_population',generated_population
building_population_data['num_residents'] = building_population_data['num_residents'].fillna(-1)
building_population_data['num_residents'] = building_population_data['num_residents'].astype(int)
building_population_data['num_residents'] = building_population_data['num_residents'].astype(str)
building_population_data['num_residents'] = building_population_data['num_residents'].replace('-1', np.nan)
building_population_data.to_csv('new_output.csv',index=False,na_rep=0)
