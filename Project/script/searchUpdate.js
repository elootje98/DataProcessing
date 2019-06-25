// Updates the graphs after the user puts something in the search bar.
function searchUpdate(allTaxes, adData){
  var input = document.getElementById("myText").value;
  var code = toCountryCode(input);

  if(code == undefined){
    console.log("not in");
    alert("Wrong input, you must enter a country");
  }

  if(allTaxes[0][(code)] == undefined || code == undefined){

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
    updateLine(allTaxes[0][code]);
    updateSpider([adData[code]]);

    d3v5.select("body").select("#box-two").select("#line").select(".title")
      .text(toCountry(code));

    d3v5.select("body").select("#box-two").select("#spider").select(".title")
      .text(toCountry(code));

    // Make the buttons updated to that country
    var countryTax = code;
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
}
