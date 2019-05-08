import pandas
import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import json

def main():

    data = load_csv("data.csv")

    # Only keep the year 2017
    data = data[data['Year'] == 2017]

    # Remove the row with World
    data = data[data['Region'] != "World"]

    # Drop the other columns
    data = data.drop(columns=["0-27 days", "1-59 months", "Year"])

    data = data.reset_index()

    data_json = data.to_json(orient='records')

    write_to_json("file.json", data_json)

def load_csv(input):
    """Loads the data from csv file into a pandas dataframe
       Returns pandas dataframe"""

    data = pd.read_csv(input)
    return data

def write_to_json(outfile, data):
    """ Writes data to a json file"""

    file = open("file.json", "w")
    file.write(data)
    file.close()

    # with open(outfile, "w") as write_file:
    #     json.dump(data, write_file)

if __name__ == "__main__":
    main()
