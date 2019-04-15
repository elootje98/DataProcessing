import pandas
import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import json

# Country,Region,Population,Area (sq. mi.),Pop. Density (per sq. mi.),Coastline (coast/area ratio),Net migration,Infant mortality (per 1000 births),"GDP ($ per capita) dollars",Literacy (%),Phones (per 1000),Arable (%),Crops (%),Other (%),Climate,Birthrate,Deathrate,Agriculture,Industry,Service

# Load the data into a pandas dataframe
data_countries = pd.read_csv("input.csv")

# Deleting the collums that are not needed.
data_countries = data_countries.drop(columns=["Population", "Area (sq. mi.)", "Coastline (coast/area ratio)", "Net migration", "Literacy (%)",
                                               "Literacy (%)", "Phones (per 1000)", "Arable (%)", "Crops (%)", "Other (%)", "Climate", "Birthrate", "Deathrate", "Agriculture", "Industry", "Service"])

# Delete the rows that dont contain a value for a certain column.
data_countries = data_countries.dropna()
data_countries = data_countries[data_countries['GDP ($ per capita) dollars'] != "unknown"]

# Remove dollars
gdp = data_countries['GDP ($ per capita) dollars'].str.lstrip('d').str.rstrip('dollars')

# Calculate the mean
gdp_int = gdp.astype("int64")
gdp_int_mean = gdp_int.mean()
gdp_int_median = gdp_int.median()
gdp_int_mode = gdp_int.mode()
deviation = gdp_int.std()

# Make a histogram of the GDP
countries = data_countries["Country"]
x = gdp_int
plt.title("GDP for countries")
plt.xlabel("GDP")
plt.ylabel("Countries")
plt.hist(x, bins=50)
# plt.show()

# Calculate minimum, first quartile, median, third quartile and maximum from infant mortality
# I THINK THE MAX AND MIN VALUE ARE NOT CORRECT
# CANT CALCULATE STRING TO FLOAT PROBLEM.
infant_mortality = data_countries["Infant mortality (per 1000 births)"]
# infant_mortality = infant_mortality.astype("float64")
minimum = infant_mortality.min()
maximum = infant_mortality.max()
# median = infant_mortality.median()
# quantile = infant_mortality.quantile()
print("MIN", minimum)
print("MAX", maximum)
# print("MEDIAN", median)
# print("QUAN", quantile)

# Write to the json file
regions = data_countries["Region"]

print(gdp[1])
# Make dict of the data from the countries
# WHY INDEX OUT OF RANGE FOR GDP????????????????
dict_data = {}
for i in range(226):
    country = countries[i]
    region = regions[i]
    infant = infant_mortality[i]
    gdp_int = gdp_int[i]

    # Make a python dictionary
    dict_data[country] = {
        "Region": region,
        "Infant": infant,
        "GDP": gdp
        }

# Write the dict_data ot a json file
with open("data_file.json", "w") as write_file:
    json.dump(dict_data, write_file)

# Delete collums for the pandas dataframe
# IN BOTH I ONLY GET 3 COLUMS?????
# data_countries.drop(data_countries.columns.difference(['Country', 'Region', 'Pop. Density (per sq. mi.)',
# 'Infant mortality (per 1000 births', 'GDP ($ per capita) dollars)']), 1, inplace=True)
# print(data_countries)
# df = data_countries.filter(['Country', 'Region', 'Pop. Density (per sq. mi.)', 'Infant mortality (per 1000 births', 'GDP ($ per capita) dollars)'])
# 'Infant mortality (per 1000 births', 'GDP ($ per capita) dollars)']]
