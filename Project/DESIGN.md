# Design

## List of sources
http://apps.who.int/gho/data/node.main.1250?lang=en
This is the data for the world map, to visualize how many people smoke in every
country. I will use the data for the year 2013 (also the only year in this data-set).
Furthermore I will use the data "Daily tobacco smoking, age-standardised" for both
sexes.
Optional: also using the "Male" and "Female" categories to make the user able
to select those and they will be then visualized on the map.
The data is in json format, so I will load it in with d3. Like this (code!):
d3v5.json("smoking.json").then(function(datas){}

http://apps.who.int/gho/data/node.main.1291?lang=en
This is the data for the spiderchart, it contains information about bans that countries
have on tabacco advertising. It contains the years 2007, 2010, 2012, 2014.
I will use the year 2012, since the ban in
2012 could possibly influenced how many people smoke in 2013. This is
relevant to answer my question “Are there less smokers in countries where the
government takes steps against smoking?”
The following categories will be used for my spiderplot, Ban on advertising:
'National tv and radio', 'point of sale', 'billboards and outdoor advertising',
'international magazines and newspaper', and 'local magazines and newspaper'.
When clicking on a country on the map, the spiderchart for that country will
be shown.
The data is in json format, I will load it in the same way as I loaded in the
data for the world map.

http://apps.who.int/gho/data/node.main.TOB1307?lang=en
This data I will use for the linechart. This dataset contains information about
different kind of taxes on cigarettes, for the years 2008, 2010, 2012 and 2014.
I will make a line chart of the taxes over the different years. I will use the data from
'Average - taxes as a % of cigarette price - total tax'. The data is in
json format and i will load it in the same way as I loaded in the data for the
world map and spiderchart.
As an optional thing I could add lines to the line chart, with the other kinds
of taxes on cigarettes, so not the total taxes only. Also as an optional:
to make a scatterplot that shows the relation between taxes and smokers in a
country.

## Technical components
First I will load in the data about how many people smoke, I will make for each
country an object with the corresponding value. All the countries will be
put together in one object. After that, the data for
taxes and bans will be added to the country objects.
Pseudocode:

d3.json("smoking.json").then(function(datas)){

  // Make object for each country with value for smokers. Put all country
  objects in one object.

  d3.json("taxes.json").then(function(datas)){

    // Add the value for taxes to the objects of the countries.
  })

  d3.json("advertising.json").then(function(datas)){

    // Add the values for the bans to the country object.
}

When clicking on the world map, the scatterplot and spiderchart will be updated.
This will be done wit the following function:
datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {

  // Some function to update linechart.
  // Some function to update spiderchart.
})

![](IMG_5537.png)

## Plan of the html page
The first page the user will visit, is an introductionary page. It tells the
question I will try to answer. On this page, the user can click to the datasources
and click to an other webpage with my visualizations.
On my visualization page I want a background with a picture of a sigarette.
Furthermore, there will be two divs, that are coloured boxes. On these boxes, my
visuzalisations will be (just since my visualizations wont be very visible when
being put over the picture). In the first box, the world map will come.
In the second box, there will be two other divs, one for the linechart and
one for the spiderchart.

## D3 plugins
I will use d3datamaps and d3tip.
