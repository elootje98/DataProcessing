import pandas
import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import json

def main():

    # Load the data
    data_countries = load_csv("input.csv")

    # Deleting the collums that are not needed.
    data_countries = data_countries.drop(columns=["Population", "Area (sq. mi.)", "Coastline (coast/area ratio)", "Net migration", "Literacy (%)",
                                                   "Literacy (%)", "Phones (per 1000)", "Arable (%)", "Crops (%)", "Other (%)", "Climate", "Birthrate", "Deathrate", "Agriculture", "Industry", "Service"])

    # Delete the rows that dont contain a value for a certain column.
    data_countries = data_countries.dropna()

    # Delete the rows that contain "unknown" as value
    data_countries = data_countries[data_countries['GDP ($ per capita) dollars'] != "unknown"]
    data_countries = data_countries[data_countries['Infant mortality (per 1000 births)'] != "unknown"]
    data_countries = data_countries[data_countries['Pop. Density (per sq. mi.)'] != "unknown"]

    # Replace the , by a . and convert to float or int. Also remove "dollars" for gdp.
    data_countries["Region"] = data_countries["Region"].str.replace(" ", "")
    data_countries["Pop. Density (per sq. mi.)"] = data_countries["Pop. Density (per sq. mi.)"].str.replace(",", ".").astype("float64")
    data_countries["Infant mortality (per 1000 births)"] = data_countries["Infant mortality (per 1000 births)"].str.replace(",", ".").astype("float64")
    data_countries['GDP ($ per capita) dollars'] = data_countries['GDP ($ per capita) dollars'].str.lstrip('d').str.rstrip('dollars').astype("int64")

    # Remove extreme high value in the gdp, therefor its likely to be an incorrect value.
    # Checked the gdp for this country (Suriname) and its 8043.46 (in 2017).
    data_countries = data_countries[data_countries['GDP ($ per capita) dollars'] != 400000]

    # Reset the index of the table
    data_countries = data_countries.reset_index()

    # Calculate the mean, median and mode
    gdp_int = data_countries["GDP ($ per capita) dollars"]
    calculate_tendency(gdp_int)

    # Make a histogram of the GDP
    countries = data_countries["Country"]
    x = gdp_int
    plt.title("GDP for countries")
    plt.xlabel("GDP")
    plt.ylabel("Countries")
    plt.hist(x, bins=50)
    plt.grid(color='r', linestyle='-', linewidth=0.5)
    plt.show()

    # Calculate minimum, first quartile, median, third quartile and maximum from infant mortality
    infant_mortality = data_countries["Infant mortality (per 1000 births)"]
    calculate_five_number(infant_mortality)

    # Make boxplot
    plt.title("Infant mortality")
    plt.ylabel("Infant mortality (per 1000 births)")
    plt.xlabel("")
    plt.boxplot(infant_mortality)
    plt.grid(color='b', linestyle='-', linewidth=0.3)
    plt.show()

    # Write to the json file
    regions = data_countries["Region"]
    pop_dens = data_countries['Pop. Density (per sq. mi.)']

    # Make dict of the data from the countries
    dict_data = {}
    for i in range(214):
        country = countries[i]
        region = regions[i]
        infant = infant_mortality[i]

        # You have to transfer it to a real int, since first it was a np int and you cant
        # write those into the json file.
        gdp_dict = int(gdp_int[i])
        pop_den = pop_dens[i]

        # Make a python dictionary
        dict_data[country] = {
            "Region": region,
            "Pop. Density": pop_den,
            "Infant mortality (per 1000 births)": infant,
            "GDP ($ per capita) dollars": gdp_dict
            }

    # Write the dict_data to a json file
    write_to_json("data_file.json", dict_data)

def load_csv(input):
    """Loads the data from csv file into a pandas dataframe
       Returns pandas dataframe"""

    data_countries = pd.read_csv(input)
    return data_countries

def write_to_json(outfile, data):
    """ Writes data to a json file"""

    with open(outfile, "w") as write_file:
        json.dump(data, write_file)

def calculate_tendency(column):
    """Calculates the mean, median and mode. Prints them too"""

    int_mean = column.mean()
    int_median = column.median()
    deviation = column.std()
    print("Mean: ", int_mean)
    print("Median: ", int_median)
    print("Mode: ", column.mode()[0])
    print("------------------------------")

def calculate_five_number(column):
    """Calculates the minimu, first quartile, median, third quartile and maximum.
       Prints them too"""

    minimum = column.min()
    maximum = column.max()
    median = column.median()
    print("Minimum: ", minimum)
    print("First Quartile: ", column.quantile(0.25))
    print("Median: ", median)
    print("Third Quartile: ", column.quantile(0.75))
    print("Maximum: ", maximum)
    print("------------------------------")

if __name__ == "__main__":
    main()
