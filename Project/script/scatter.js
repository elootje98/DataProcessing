// Makes the first scatterplot.
function makeScatter(map, taxes){

    //Create SVG element
    var svgH = 500;
    var svgW = 500;
    var svg = d3v5.select("body").select("#scatter")
                .append("svg")
                .attr("width", svgW)
                .attr("height", svgH);

    // Get the maximal values from the data x and y
    var widthMarg = 100;
    var hightMarg = 100;
    h = svgH - hightMarg;
    w = svgW - widthMarg;

    // Add padding
    var padding = 20;
    var leftPadding = 40;

    // Check which countries are in both datasets.
    var sameCountries = [];
    var countries = Object.keys(map);
    var countriesTax = Object.keys(taxes);
    for(var j = 0; j < 106; j++){
      if(countries.includes(countriesTax[j])){
        sameCountries.push(countriesTax[j]);
      }
    }

    // Put the combined data in an array.
    dataArray = [];
    for(var i = 0; i < 91; i++){
      var countryArray = [];
      var country = sameCountries[i];
      countryArray.push(country);
      countryArray.push(map[country]["Value"]);
      if(taxes[country][1] != undefined){
        countryArray.push(taxes[country][0]["y"]);
        dataArray.push(countryArray);
      }
    }

    // Make functions to scale the axes and radius.
    var xScale = d3v5.scaleLinear()
             .domain([0, 100])
             .range([padding, w - padding]);

    var yScale = d3v5.scaleLinear()
             .domain([0, 100])
             .range([h - padding, padding]);

    // Add a tooltip.
    var tip = d3v5.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
            .html(function(d) {
              var country = toCountry(d[0]);
              return country + ": " + d[2] + ";" + d[1];
            });
    d3v5.select("body").select("#box-two").select("#scatter").select("svg").call(tip);

    // Make a circle for each datapoint
    svg.selectAll("circle")
       .data(dataArray)
       .enter()
       .append("circle")
       .attr("cx", function(d) {
            return xScale(d[2]) + leftPadding;
       })
       .attr("cy", function(d) {
            return yScale(d[1]) + (2 * padding);
       })
       .style("fill", "#a00026")
       .attr("r", 5)
       .on('mouseover', tip.show)
       .on('mouseenter', function(){
        d3v5.select(this)
            .style("fill", "black");
        })
       .on('mouseout', tip.hide)
       .on('mouseleave', function(){
        d3v5.select(this)
        .style("fill", "#a00026")
        });

    // Create the axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + (leftPadding) + "," + (h + padding) + ")")
        .call(d3v5.axisBottom(xScale))

    //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (leftPadding * 1.5) + "," + (2 * padding)+ ")")
        .call(d3v5.axisLeft(yScale));

    // Create labels to the Y axis
    svg.append("text")
      .text("% of population that smokes tabacco daily")
      .attr("x", -420)
      .attr("y", 25)
      .attr("transform", "rotate(-90)")
      .style("fill", "#a00026");

    // Create title
    svg.append("text")
      .text("Effect of taxes on smokers %")
      .attr("class", "title")
      .attr("x", w/2 - leftPadding - 60)
      .attr("y", padding)
      .style("fill", "#a00026");

    // Create labels for the X axis
    svg.append("text")
      .text("Average taxes as a % of cigarette price")
      .attr("x", w/7 - padding + 30)
      .attr("y", h + (3 * padding))
      .style("fill", "#a00026");
}
