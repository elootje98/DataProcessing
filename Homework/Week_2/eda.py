import pandas
import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

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
gdp = gdp.astype("int64")
gdp_mean = gdp.mean()
gdp_median = gdp.median()
gdp_mode = gdp.mode()
deviation = gdp.std()

# Make a histogram of the GDP
countries = data_countries["Country"]
x = gdp
plt.title("GDP for countries")
plt.xlabel("GDP")
plt.ylabel("Countries")
plt.hist(x, bins=50)
# plt.show()

# Calculate minimum, first quartile, median, third quartile and maximum from infant mortality
# I THINK THE MAX AND MIN VALUE ARE NOT CORRECT
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



# Delete collums for the pandas dataframe
# IN BOTH I ONLY GET 3 COLUMS?????
# data_countries.drop(data_countries.columns.difference(['Country', 'Region', 'Pop. Density (per sq. mi.)',
# 'Infant mortality (per 1000 births', 'GDP ($ per capita) dollars)']), 1, inplace=True)
# print(data_countries)
# df = data_countries.filter(['Country', 'Region', 'Pop. Density (per sq. mi.)', 'Infant mortality (per 1000 births', 'GDP ($ per capita) dollars)'])
# 'Infant mortality (per 1000 births', 'GDP ($ per capita) dollars)']])

# Delete rows that have a missing value
