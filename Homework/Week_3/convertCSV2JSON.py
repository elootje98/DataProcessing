import pandas
import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import json

# Ik weet dat ik eigenlijk de data met de pandas functie naar json zou moeten zetten.
# Deze feedback zag ik net bij mijn opdracht van vorige week.
# Echter heb ik er voor deze week geen tijd meer voor om dat te implementeren.
# Ik weet nu wel hoe het werkt en zal het voor volgende keer doen! 

def main():
    # Read the data from a csv file
    data = load_csv("KNMI.csv")

    # Make a dictionary of the data
    date = data["YYYYMMDD"]
    temp = data["TX"]

    # Make a dictionary
    dict_data = {}
    for i in range(31):
        the_date = int(date[i])
        the_temp = int(temp[i])

        dict_data[the_date] = {
                "Temperature": the_temp
        }

    # Write the data to a json file
    write_to_json("file.json", dict_data)

def write_to_json(outfile, data):
    """ Writes data to a json file"""

    with open(outfile, "w") as write_file:
        json.dump(data, write_file)

def load_csv(input):
    """Loads the data from csv file into a pandas dataframe
       Returns pandas dataframe"""

    data = pd.read_csv(input)
    return data

if __name__ == "__main__":
    main()
