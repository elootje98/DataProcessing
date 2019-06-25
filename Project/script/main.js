// Make a list of promsises
var loadData = [d3v5.json("smoking.json"), d3v5.json("tax.json"), d3v5.json("advertising.json")];

Promise.all(loadData).then(function(data1){

  // allTaxes is a list with all different kinds of tax.
  var allTaxes = makeTaxdata(data1[1]);

  // Load the ad data.
  var adData = makeAddata(data1[2]);

  // Load the mapdata in mapdata is list with data for males, females and both.
  var mapData = makeMapdata(data1[0]);
  var tempData = {}
  Object.assign(tempData, mapData[0]);
  var map = make_map(tempData, allTaxes, adData);

  // Make line chart.
  makeLine(allTaxes[0]["USA"]);

  // Make spider.
  makeSpider([adData["ALB"]]);

  // Make the two scatterplots.
  makeScatter(mapData[0], allTaxes[0]);
  makeScatter2(mapData[0], adData);

  d3v5.select("body").select(".submit")
    .on('click', function(){ searchUpdate(allTaxes, adData);
      });

  // Update map by onclick
  d3v5.select("body").select("#box-one").select(".both")
    .on('click', function(){ update_map(map, mapData[0]); });

  d3v5.select("body").select("#box-one").select(".men")
    .on('click', function(){ update_map(map, mapData[1]); });

  d3v5.select("body").select("#box-one").select(".women")
    .on('click', function(){ update_map(map, mapData[2]); });

  // Update the scatterplot for USA (if the user didnt click a country yet).
  d3v5.select("body").select("#box-two").select("#line").select(".Total")
    .on('click', function(){updateLine(allTaxes[0]["USA"])});

  d3v5.select("body").select("#box-two").select("#line").select(".Specific")
    .on('click', function(){updateLine(allTaxes[1]["USA"])});

  d3v5.select("body").select("#box-two").select("#line").select(".Ad")
    .on('click', function(){updateLine(allTaxes[2]["USA"])});

  d3v5.select("body").select("#box-two").select("#line").select(".Import")
    .on('click', function(){updateLine(allTaxes[3]["USA"])});

  d3v5.select("body").select("#box-two").select("#line").select(".Value")
    .on('click', function(){updateLine(allTaxes[4]["USA"])});

  d3v5.select("body").select("#box-two").select("#line").select(".Other")
    .on('click', function(){updateLine(allTaxes[5]["USA"])});

});
