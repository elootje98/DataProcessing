// Load in the taxes data.
function makeTaxdata(datas){
  allTaxes = [];
  var types = ["Average - taxes as a % of cigarette price - specific excise",
                "Average - taxes as a % of cigarette price - ad valorem excise",
                "Average - taxes as a % of cigarette price - import duties",
                "Average - taxes as a % of cigarette price - value added tax",
                "Average - taxes as a % of cigarette price - other taxes",
                "Average - taxes as a % of cigarette price - total tax"];

  // Make for every type an object
  for(var i = 0; i < types.length; i++){
    var type = types[i];
    var object = typeTaxes(type, datas);
    allTaxes.push(object);
  }
  return allTaxes;
}

// For every type of tax, load the data.
function typeTaxes(type, datas){

  taxes = {}
  country = []
  item = {}
  notEmpty = false;

  // Loop over the values of the taxes and add the values to the all_countreis
  for(var i = 0; i < 4656; i++){
    if(datas["fact"][i]["dims"]["GHO"] == type){
      var year = datas["fact"][i]["dims"]["YEAR"];
      var value = datas["fact"][i]["Value"];
      if(value != "Not applicable" && value != "Not available"){
        notEmpty = true;
        item["y"] = value;
        item["x"] = year;
        // console.log(value);
        country.push(item);
        item = {}
      }

      // If the list is not empty and all years are inside the list, add it to
      // the taxes object.
      if(year == 2008 && notEmpty){
        country_name = datas["fact"][i]["dims"]["COUNTRY"];
        code = toCountryCode(country_name);
        taxes[code] = country;
        country = [];
        notEmpty = false;
      }
    }
  }
  return taxes;
}

// Make the line chart.
function makeLine(dataset){

  var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 300
  , height = 200;

  // Make scale for X values.
  var xScale = d3v5.scaleLinear()
    .domain([2008, 2014])
    .range([0, width]);

  // Make scale for Y values.
  var yScale = d3v5.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

  // D3's line generator.
  var line = d3v5.line()
    .x(function(d, i) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3v5.curveMonotoneX)

  // Add svg.
  var svg = d3v5.select("body").select("#box-two").select("#line").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    tickValues = ["2008", "2010", "2012", "2014"];

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3v5.axisBottom(xScale)
      .tickFormat(d3v3.format("d"))
      .tickValues(tickValues));

  svg.append("g")
    .attr("class", "y axis")
    .call(d3v5.axisLeft(yScale));

  // Give labels to the axis
  svg.append("text")
    .text("Years")
    .attr("x", 100)
    .attr("y", 240)
    .style("fill", "#a00026");

  // Give labels to the axis
  svg.append("text")
    .text("%")
    .attr("x", -100)
    .attr("y", -30)
    .attr("transform", "rotate(-90)")
    .style("fill", "#a00026");

  svg.append("text")
    .attr("class", "title")
    .text("United states of America")
    .attr("x", 40)
    .attr("y", 0)
    .style("fill", "#a00026");

  // Title
  svg.append("text")
    .attr("class", "title")
    .text("Average taxes as a % of cigarette price")
    .attr("x", 0)
    .attr("y", -20)
    .style("fill", "#a00026");

  // In case of no data, show this text
  svg.append("text")
    .attr("class", "no-data")
    .text("No data for this country")
    .attr("x", 20)
    .attr("y", 100)
    .style("visibility", "hidden");

  // Append the path, bind the data, and call the line generator
  svg.append("path")
    .datum(dataset)
    .attr("class", "line")
    .attr("d", line)

  // Appends a circle for each datapoint
  svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", function(d) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
}

// Update the line chart.
function updateLine(data){

  var width = 300
  var height = 200;

  var xScale = d3v5.scaleLinear()
    .domain([2008, 2014])
    .range([0, width]);

  var yScale = d3v5.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

  var line = d3v5.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3v5.curveMonotoneX)

  // Join.
  var dots = d3v5.select("body").select("#box-two").select("#line").select("svg").selectAll(".dot")
      .data(data);

  dots.enter().append("circle")
    .attr("class", "dot")
    .attr("cx", function(d) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5);

  dots.transition()
    .duration(200)
    .attr("cx", function(d) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })

  var lines = d3v5.select("body").select("#box-two").select("#line").select("svg").select(".line")
    .transition()
    .duration(500)
    .attr("id","line1")
    .attr("d", line(data))
    .attr("class", "line");

  dots.exit().remove();
}
