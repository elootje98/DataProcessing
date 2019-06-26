# The effect of advertising bans and taxes on the percentage of smokers in a country.
This data visualization is made by Elodie Rijnja.

## Percentage of smokers in a country
First an overview is given on how many people are smoking in every country.
It's possible for the user to also see this for males and females seperately.
![](docs/map.png)

## Taxes on cigarettes
A country on the map can be clicked in order to see the corresponding average
% of taxes of cigarette price in that country. Different types of taxes can be
chosen.
![](docs/tax.png)

## Advertising bans
Furthermore, after clicking a country on the map, there will be shown how many
advertising bans a country has.
![](docs/add.png)

## Scatter plots
![](docs/scatter.png)
![](docs/scatter2.png)
Since it's hard to keep an overview over the countries taxes, advertising bans
and the percentage of smokers, two scatterplots have been made. One containig the
parameters taxes and percentage of smokers. The other one containing advertising
bans and percentage of smokers.

## Search option
![](docs/search.png)
To make it more convenient for the user, there is a search bar. In this search
bar the user can type a country. After pressing the button, the scatter- and
spiderplot are updated to that country.

## Sources
### For writing code:
http://jonsadka.com/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-pseudo-data
https://getbootstrap.com/docs/4.0/components/navbar/
https://blockbuilder.org/Ananda90/8269def4e60b17d57d358b2e8219f62d
https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
https://bl.ocks.org/mattdh666/b941fd20978cfad1398739c2563aee1f
https://www.w3schools.com/howto/howto_css_search_button.asp
d3-tip.js
https://raw.githubusercontent.com/markmarkoh/datamaps/master/dist/datamaps.world.min.js
-> used for datamaps.world.min.js.

### For the data:
smoking.json
http://apps.who.int/gho/data/node.main.1250?lang=en
tax.json
http://apps.who.int/gho/data/node.main.TOB1307?lang=en
advertising.json
http://apps.who.int/gho/data/node.main.1291?lang=en

### For storytelling and background:
![](docs/smoking.png)
https://cancerfocusni.org/cancer-prevention/smoking/

## Copyright
Copyright, 26-06-2019, Elodie Rijnja. All Rights Reserved.

## Licenses sources

#### d3-tip.js
Copyright (c) 2013 Justin Palmer
ES6 / d3v5 v4 Adaption Copyright (c) 2016 Constantin Gavrilete
Removal of ES6 for d3v5 v4 Adaption Copyright (c) 2016 David Gotz

#### Radar Chart source
source: https://blockbuilder.org/Ananda90/8269def4e60b17d57d358b2e8219f62d
A redesign of the radar chart function that was created by alangrafu,
used in my blog on Making the D3 Radar Chart look a bit better.

#### Line chart source
source: https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
Released under the The MIT License. Link here:
https://opensource.org/licenses/MIT

#### Boxplot source
https://bl.ocks.org/mattdh666/b941fd20978cfad1398739c2563aee1f
Didn't use this source to make a boxplot, just minor changes in other plots.
Released under the Apache License, Version 2.0. Link here:
https://opensource.org/licenses/Apache-2.0
