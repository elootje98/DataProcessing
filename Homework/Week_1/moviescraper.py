#!/usr/bin/env python
# Name: Elodie Rijnja
# Student number: 10984682
"""
This script scrapes IMDB and outputs a CSV file with highest rated movies.
"""

import re
import csv
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "https://www.imdb.com/search/title?title_type=feature&release_date=2008-01-01,2018-01-01&num_votes=5000,&sort=user_rating,desc"
BACKUP_HTML = 'movies.html'
OUTPUT_CSV = 'movies.csv'

number_of_movies = 50
number_of_data = 5
last_movie = "Toy Story 3"

def extract_movies(dom):
    """
    Extract a list of highest rated movies from DOM (of IMDB page).
    Each movie entry should contain the following fields:
    - Title
    - Rating
    - Year of release (only a number!)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    """

    # Get the titles form the page and put them in list 'titles'
    titles = []
    for heds in dom.find_all('h3'):
        title = heds.a.text
        titles.append(title)
        if title == last_movie:
            break

    # Get the ratings from the page and put them in list 'ratings'
    ratings = []
    for rating in dom.find_all("div", class_="inline-block ratings-imdb-rating"):
        rating = rating.text
        rating = rating.replace("\n", "")
        ratings.append(rating)

    # Get years from the page and put them in list 'years'
    years = []
    for year in dom.find_all("span", class_="lister-item-year text-muted unbold"):
        year = year.text
        year = year.replace("(", "").replace(")", "").replace("I", "").replace("II", "").replace(" ", "")
        years.append(year)

    # Get actors from the page and put them in list 'actors'
    actors = []
    for actor in dom.find_all("a", class_=""):
        actor_href = actor.get("href")
        # To only get the actors, and not the directors
        if "adv_li_st" in actor_href:
            actors.append(actor.text)

    # Get runtimes form the page and put them in list 'runtimes'
    runtimes = []
    for runtime in dom.find_all("span", class_="runtime"):
        runtimes.append(runtime.text)

    # Get all the lists into a new list called movies.
    movies = []
    movies.append(titles)
    movies.append(ratings)
    movies.append(years)
    movies.append(actors)
    movies.append(runtimes)

    return movies

def save_csv(outfile, movies):
    """
    Output a CSV file containing highest rated movies.
    """
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Year', 'Actors', 'Runtime'])

    # Write the data into the csv file
    # Loop over the movies
    for movie in range(number_of_movies):
        datas_movie = []
        
        # Loop over the data from the movie (title, rating, year, actors and runtime)
        for data in range(number_of_data):
            group = movies[data]
            data_movie = group[movie]

            # Put all data from that movie in "all_data_movie"
            datas_movie.append(data_movie)

        # Write the data from the movie to the csv file
        writer.writerow(datas_movie)

def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get(TARGET_URL)

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = BeautifulSoup(html, 'html.parser')

    # extract the movies (using the function you implemented)
    movies = extract_movies(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, movies)
