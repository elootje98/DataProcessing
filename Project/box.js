function makeBox(dataArray){
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var barWidth = 30;

  // Generate five 100 count, normal distributions with random means
  var groupCounts = {};
  var globalCounts = [];

  // Loop over dataArray and put all values in the right groups.
  var group = 0;
  for(var j = 0; j < 7; j++){
    for(var i = 0; i < 119; i++){
      if(dataArray[i][2] == group){
        globalCounts.push(dataArray[i][1]);
      }
    }
    groupCounts[group] = globalCounts;
    group = group + 1;
    globalCounts = [];
  }
  console.log(groupCounts);

  // Setup a color scale for filling each box
  var colorScale = d3v5.scaleOrdinal(d3v5.schemeCategory10)
    .domain(Object.keys(groupCounts));

  // Prepare the data for the box plots
  var boxPlotData = [];
  for (var [key, groupCount] of Object.entries(groupCounts)) {
    var localMin = d3v5.min(groupCount);
    var localMax = d3v5.max(groupCount);

    var obj = {};
    obj["key"] = key;
    obj["counts"] = groupCount;
    obj["quartile"] = boxQuartiles(groupCount);
    obj["whiskers"] = [localMin, localMax];
    obj["color"] = colorScale(key);
    boxPlotData.push(obj);
  }

  // Compute an ordinal xScale for the keys in boxPlotData
  var xScale = d3v5.scalePoint()
    .domain(Object.keys(groupCounts))
    .rangeRound([0, width])
    .padding([0.5]);

  // Compute a global y scale based on the global counts
  var min = 0;
  var max = 50;
  console.log(min);
  console.log(max);
  var yScale = d3v5.scaleLinear()
    .domain([0, 50])
    .range([height, 0]);

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'

  // moves the 'group' element to the top left margin
  var svg = d3v5.select("body").select("#box-two").select("#boxplot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // append a group for the box plot elements
  var g = svg.append("g");

  // Draw the box plot vertical lines
  var verticalLines = g.selectAll(".verticalLines")
    .data(boxPlotData)
    .enter()
    .append("line")
    .attr("x1", function(datum) { return xScale(datum.key); })
    .attr("y1", function(datum) { console.log(yScale(datum.whiskers[0]));return yScale(datum.whiskers[0]); })
    .attr("x2", function(datum) { return xScale(datum.key); })
    .attr("y2", function(datum) { return yScale(datum.whiskers[1]); })
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("fill", "none");

  // Draw the boxes of the box plot, filled and on top of vertical lines
  var rects = g.selectAll("rect")
    .data(boxPlotData)
    .enter()
    .append("rect")
    .attr("width", barWidth)
    .attr("height", function(datum) {
      console.log("hoi");
      var quartiles = datum.quartile;
      var height =  yScale(quartiles[0]) - yScale(quartiles[2]);
      return height;
    })
    .attr("x", function(datum) { return xScale(datum.key) - (barWidth/2); })
    .attr("y", function(datum) { return yScale(datum.quartile[2]); })
    .attr("fill", function(datum) { return datum.color; })
    .attr("stroke", "#000")
    .attr("stroke-width", 1);

  // Now render all the horizontal lines at once - the whiskers and the median
  var horizontalLineConfigs = [
    // Top whisker
    {
      x1: function(datum) { return xScale(datum.key) - barWidth/2 },
      y1: function(datum) { return yScale(datum.whiskers[0]) },
      x2: function(datum) { return xScale(datum.key) + barWidth/2 },
      y2: function(datum) { return yScale(datum.whiskers[0]) }
    },
    // Median line
    {
      x1: function(datum) { return xScale(datum.key) - barWidth/2 },
      y1: function(datum) { return yScale(datum.quartile[1]) },
      x2: function(datum) { return xScale(datum.key) + barWidth/2 },
      y2: function(datum) { return yScale(datum.quartile[1]) }
    },
    // Bottom whisker
    {
      x1: function(datum) { return xScale(datum.key) - barWidth/2 },
      y1: function(datum) { return yScale(datum.whiskers[1]) },
      x2: function(datum) { return xScale(datum.key) + barWidth/2 },
      y2: function(datum) { return yScale(datum.whiskers[1]) }
    }
  ];

  for(var i=0; i < horizontalLineConfigs.length; i++) {
    var lineConfig = horizontalLineConfigs[i];

    // Draw the whiskers at the min for this series
    var horizontalLine = g.selectAll(".whiskers")
      .data(boxPlotData)
      .enter()
      .append("line")
      .attr("x1", lineConfig.x1)
      .attr("y1", lineConfig.y1)
      .attr("x2", lineConfig.x2)
      .attr("y2", lineConfig.y2)
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("fill", "none");
  }

  // Move the left axis over 25 pixels, and the top axis over 35 pixels
  //var axisY = svg.append("g").attr("transform", "translate(25,0)");
  //var axisX = svg.append("g").attr("transform", "translate(35,0)");

  //x-axis
  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3v5.axisBottom(xScale));

  // Add the Y Axis
  svg.append("g")
     .call(d3v5.axisLeft(yScale));

  function boxQuartiles(d) {
    return [
      d3v5.quantile(d, .25),
      d3v5.quantile(d, .5),
      d3v5.quantile(d, .75)
    ];
  }

  // Perform a numeric sort on an array
  function sortNumber(a,b) {
    return a - b;
  }
}
