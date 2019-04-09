#!/usr/bin/env python
# Name: Elodie Rijnja
# Student number: 10984682
"""
This script visualizes data obtained from a .csv file
"""

import csv
import matplotlib.pyplot as plt

# Global constants for the input file, first and last year
INPUT_CSV = "movies.csv"
START_YEAR = 2008
END_YEAR = 2018

# Open the csv file and extract needed data
# make global dictionary from the data
ratings_in_year = []
data_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}
with open('movies.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        year = (row['Year'])
        rating = (row['Rating'])
        ratings_in_year = data_dict[year]
        ratings_in_year.append(rating)
        data_dict[year] = ratings_in_year

# Get the average of the ratings and add it to the dict
for year in data_dict:
    average_total = 0
    ratings_in_year = data_dict[year]
    for rating in ratings_in_year:
        average_total = float(rating) + average_total
        average = round(average_total / len(ratings_in_year), 1)
    data_dict[year] = str(average)

def plot_data(data_dict):
    """
    Plot the data
    """
    # lists = data_dict.items()
    # x, y = zip(*lists)
    plt.ylabel("Rating", fontsize=14, color='red')
    plt.xlabel("Years", fontsize=14, color='red')
    x = []
    y = []
    for key in data_dict:
        x.append(key)
        rating = data_dict[key]
        y.append((float(rating)))
    plt.plot(x, y)
    plt.show()

if __name__ == "__main__":
    print(data_dict)
    plot_data(data_dict)
