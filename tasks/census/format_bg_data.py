import os

infile = open('bg_data.txt','r')
data = []
to_use =[]
for line in infile:
    data.append(line.split(':')[1].rstrip('\n'))


for item in data:
    to_use.append(item.lstrip().lstrip('"').rstrip('"'))
print to_use