// Make a list of promsises
var loadData = [d3v5.json("smoking.json"), d3v5.json("tax.json"), d3v5.json("advertising.json")];

Promise.all(loadData).then(function(data1){

  // allTaxes is a list with all different kinds of tax
  var allTaxes = makeTaxdata(data1[1]);

  // Load the ad data
  var adData = makeAddata(data1[2]);

  // Load the mapdata in mapdata is list with all_countries, all_countries_males,
  // all_countries_fem
  var mapData = makeMapdata(data1[0]);
  var tempData = {}
  Object.assign(tempData, mapData[0]);
  var map = make_map(tempData, allTaxes, adData);

  console.log(allTaxes[0]);
  makeLine(allTaxes[0]["USA"]);

  // make spider
  makeSpider([adData["ALB"]]);

  // make makeScatter
  makeScatter(mapData[0], allTaxes[0]);
  var dataArray = makeScatter2(mapData[0], adData);

  // Update map by onclick
  d3v5.select("body").select("#box-one").select(".both")
    .on('click', function(){ update_map(map, mapData[0]); });

  d3v5.select("body").select("#box-one").select(".men")
    .on('click', function(){ update_map(map, mapData[1]); });

  d3v5.select("body").select("#box-one").select(".women")
    .on('click', function(){ update_map(map, mapData[2]); });

});
