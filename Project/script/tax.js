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

function makeLine(dataset){

  // 2. Use the margin convention practice
  var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 300 // Use the window's width
  , height = 200; // Use the window's height

  // 5. X scale will use the index of our data
  var xScale = d3v5.scaleLinear()
    .domain([2008, 2014]) // input
    .range([0, width]); // output

  // 6. Y scale will use the randomly generate number
  var yScale = d3v5.scaleLinear()
    .domain([0, 100]) // input
    .range([height, 0]); // output

  // var tip = d3v5.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
  //         .html(function(d) {
  //           return  d.y;
  //         });
  // d3v5.select("body").select("#box-two").select("#line").select("svg").call(tip);

  // 7. d3's line generator
  var line = d3v5.line()
    .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3v5.curveMonotoneX) // apply smoothing to the line

  // 1. Add the SVG to the page and employ #2
  var svg = d3v5.select("body").select("#box-two").select("#line").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    tickValues = ["2008", "2010", "2012", "2014"];

  // 3. Call the x axis in a group tag
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3v5.axisBottom(xScale)
      .tickFormat(d3v3.format("d"))
      // .tickFormat(d3v5.timeFormat("%Y"))
      .tickValues(tickValues));
  // Create an axis component with d3.axisBottom

  // 4. Call the y axis in a group tag
  svg.append("g")
    .attr("class", "y axis")
    .call(d3v5.axisLeft(yScale)); // Create an axis component with d3.axisLeft

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

  // 9. Append the path, bind the data, and call the line generator
  svg.append("path")
    .datum(dataset) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("d", line)// 11. Calls the line generator

  // 12. Appends a circle for each datapoint
  svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide);
}

function updateLine(data){

  var width = 300 // Use the window's width
  var height = 200;

  // 5. X scale will use the index of our data
  var xScale = d3v5.scaleLinear()
    .domain([2008, 2014]) // input
    .range([0, width]); // output

  // 6. Y scale will use the randomly generate number
  var yScale = d3v5.scaleLinear()
    .domain([0, 100]) // input
    .range([height, 0]); // output

  var line = d3v5.line()
    .x(function(d) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3v5.curveMonotoneX) // apply smoothing to the line

  // join
  var dots = d3v5.select("body").select("#box-two").select("#line").select("svg").selectAll(".dot")
      .data(data);

  // enter
  dots.enter().append("circle")
    .attr("class", "dot") // Assign a class for styling
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
    .attr("class", "line"); // Assign a class for styling



  // lines.exit().remove();
  dots.exit().remove();
}
