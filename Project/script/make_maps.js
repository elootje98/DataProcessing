// Makes the world maps and returns it.
function make_map(datas, allTaxes, adData){
  var map = new Datamap({element: document.getElementById('container'),
    fills: {
      "<10": '#fecc5c',
      "10-20": '#fd8d3c',
      "20-30": '#f03b20',
      ">30": '#bd0026',
      "UNKNOWN": '#bdbdbd',
      defaultFill: '#bdbdbd',
  },
  data:
    datas,
  geographyConfig: {
      highlightBorderColor: '#bada55',
      popupTemplate: function(geography, data) {
        if(datas[(geography.id)] == undefined){
          return '<div class="hoverinfo">' + geography.properties.name + ":" + " " + "No value"
        }
        else{
        return '<div class="hoverinfo">' + geography.properties.name +
        ":" + " " + datas[(geography.id)]["Value"] + ' '}
      },
      highlightBorderWidth: 3
    },
    done: function(datamap) {
    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
        if(allTaxes[0][(geography.id)] == undefined){

          // Don't show the line chart when there is no value
          d3v5.select("body").select("#box-two").select("#line")
            .style("opacity", .3);
          d3v5.select("body").select("#box-two").select("#line").select(".no-data")
            .style("visibility", "visible");
        }
        else{

          // Show the line chart
          d3v5.select("body").select("#box-two").select("#line").select(".no-data")
            .style("visibility", "hidden");
          d3v5.select("body").select("#box-two").select("#line")
            .style("opacity", 1);

          // Update the line and spider graph
          updateLine(allTaxes[0][geography.id]);
          updateSpider([adData[geography.id]]);

          d3v5.select("body").select("#box-two").select("#line").select(".title")
            .text(geography.properties.name);

          d3v5.select("body").select("#box-two").select("#spider").select(".title")
            .text(geography.properties.name);

          // Make the buttons updated to that country
          var countryTax = geography.id;
          d3v5.select("body").select("#box-two").select("#line").select(".Total")
            .on('click', function(){updateLine(allTaxes[0][countryTax])});

          d3v5.select("body").select("#box-two").select("#line").select(".Specific")
            .on('click', function(){updateLine(allTaxes[1][countryTax])});

          d3v5.select("body").select("#box-two").select("#line").select(".Ad")
            .on('click', function(){updateLine(allTaxes[2][countryTax])});

          d3v5.select("body").select("#box-two").select("#line").select(".Import")
            .on('click', function(){updateLine(allTaxes[3][countryTax])});

          d3v5.select("body").select("#box-two").select("#line").select(".Value")
            .on('click', function(){updateLine(allTaxes[4][countryTax])});

          d3v5.select("body").select("#box-two").select("#line").select(".Other")
            .on('click', function(){updateLine(allTaxes[5][countryTax])});
        }

        if(adData[(geography.id)] == undefined){
          d3v5.select("body").select("#box-two").select("#spider")
            .style("opacity", .3);
        }
        else{
          updateSpider([adData[geography.id]]);
          d3v5.select("body").select("#box-two").select("#spider")
            .style("opacity", 1);
        }
      })
    },
  });
  map.legend({
      legendTitle: "% of population that smokes tobacco daily in 2013",
      });

  return map;
}

// Update the colors of the map with the new values.
function update_map(map, datasx){
  map.updateChoropleth(datasx);
}
