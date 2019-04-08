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

    # THIS IS THE RIGHT WAY TO GET THE TITLES
    # LIST IS GOOD NOW
    # titles = []
    # for heds in dom.find_all('h3'):
    #     title = heds.a.text
    #     print(title)
    #     titles.append(title)
    #     if title == "Toy Story 3":
    #         break
    # print("TITLE", titles)

    # LIKE THIS YOU CAN FIND THE YEAR
    # LIST IS GOOD NOW
    # years = []
    # for year in dom.find_all("span", class_="lister-item-year text-muted unbold"):
    #     year = year.text
    #     if len(year) is 11:
    #         year = year[6:-1]
    #     elif len(year) is 10:
    #         year = year[5:-1]
    #     else:
    #         year = year[1:-1]
    #     years.append(year)
    # print(years)

    # LIKE THIS YOU CAN FIND THE Runtime
    # LIST IS GOOD NOW
    # runtimes = []
    # for runtime in dom.find_all("span", class_="runtime"):
    #     runtimes.append(runtime.text)
    # print(runtimes)

    # LIKE THIS YOU CAN FIND THE RATING
    # THE LIST IS GOOD NOW
    # ratings = []
    # for rating in dom.find_all("div", class_="inline-block ratings-imdb-rating"):
    #     rating = rating.text
    #     rating = rating.replace("\n", "")
    #     ratings.append(rating)
    # print(ratings)

    # LIKE THIS YOU CAN FIND THE ACTORS
    # actors = []
    # for actor in dom.find_all("a", class_=""):
    #     actor_href = actor.get("href")
    #     if "adv_li_st" in actor_href:
    #         actors.append(actor.text)
    # print(actors)

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RATED MOVIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.

    return []   # REPLACE THIS LINE AS WELL IF APPROPRIATE


def save_csv(outfile, movies):
    """
    Output a CSV file containing highest rated movies.
    """
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Year', 'Actors', 'Runtime'])

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE MOVIES TO DISK


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
