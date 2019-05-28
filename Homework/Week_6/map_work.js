d3v5.json("data.json").then(function(datas) {
  console.log(datas)
  // Make a list with objects
  all_countries = {}
  for(var i = 0; i < 2196; i++){
  country = {}
  if(datas["fact"][i]["dims"]["SEX"] == "Both sexes" && datas["fact"][i]["dims"]["YEAR"] == 2016){
    value = datas["fact"][i]["Value"];
    if(value < 10){
      fillKey = "<10";
    }
    else if (value > 10 && value < 20){
      fillKey = "10-20";
    }
    else if(value > 20 && value < 30){
      fillKey = "20-30";
    }
    else if(value > 30){
      fillKey = ">30";
    }

    country["Value"] = datas["fact"][i]["Value"];
    country["fillKey"] = fillKey;
    country_name = datas["fact"][i]["dims"]["COUNTRY"];
    code = toCountryCode(country_name);

    // Also add seperated for Male and Female

    for(var j = 0; j < 2196; j++){
      // console.log(datas["fact"][j]["dims"]["Sex"]);
      // console.log(datas["fact"][j]["dims"]["YEAR"]);
      // console.log(datas["fact"][j]["dims"]["COUNTRY"]);
      if(datas["fact"][j]["dims"]["SEX"] == "Male" && datas["fact"][j]["dims"]["YEAR"] == 2016 && datas["fact"][j]["dims"]["COUNTRY"] == country_name){
        country["Male"] = datas["fact"][j]["Value"];
      }
      if(datas["fact"][j]["dims"]["SEX"] == "Female" && datas["fact"][j]["dims"]["YEAR"] == 2016 && datas["fact"][j]["dims"]["COUNTRY"] == country_name){
        country["Female"] = datas["fact"][j]["Value"];
      }
    }
    all_countries[code] = country;
  }
  }

make_map()

function make_map(){

  var map = new Datamap({
    element: document.getElementById('container'),
    fills: {
        // LOWER10: '#cbc9e2',
        '<10': '#cbc9e2',
        '10-20': '#9e9ac8',
        '20-30': '#756bb1',
        '>30': '#bd0026',
        UNKNOWN: '#f2f0f7',
        defaultFill: '#f2f0f7'
    },
    data:
      all_countries,
    geographyConfig: {
      highlightBorderColor: '#bada55',
      popupTemplate: function(geography, data) {
        if(all_countries[(geography.id)] == undefined){
          return '<div class="hoverinfo">' + geography.properties.name + ":" + " " + "No value"
        }
        else{
        return '<div class="hoverinfo">' + geography.properties.name +
        ":" + " " + all_countries[(geography.id)]["Value"] + ' '}
      },
      highlightBorderWidth: 3
    },
    done: function(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
          if(all_countries[(geography.id)] == undefined){
            console.log('no data TO DO');
            d3v5.select("#pie")
              .style("visibility", "hidden");
          }
          else{
            d3v5.select("#pie")
              .style("visibility", "visible");
          redraw([{"label": "Male", "value":all_countries[(geography.id)]["Male"]}, {"label": "Female", "value":all_countries[(geography.id)]["Female"]}])};
      });
    },
  });

  // Draw a legend for this map
  map.legend({
      legendTitle: "Suicide rates per 100.000 people",
      });

  // Make the title
  d3v3.select("#container").select("svg")
    .append("text")
      .attr("x", 400)
      .attr("y", 20)
      .text("Suicide rates world 2016")
}
    // Make a pie chart
    var margin = {top: 100, bottom: 10, left: 10, right: 10},
    // width = window.innerWidth - margin.left - margin.right,
    width = 1200,
    // height = window.innerHeight - margin.top - margin.bottom,
    height = 400,
    radius = Math.min(width, height) / 4;
    var svg = d3v5.select("#pie").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "piechart")
    .append("g")
      .attr("transform", "translate(" + ((width / 2) + margin.left + 200) + "," + ((height / 2) - 100) + ")");

    // Make a title
    svg.append("text")
    .attr("x", -170)
    .attr("y", 130)
    .text("Males and Females Suicide per 100.000 people");

    var color = d3v5.scaleOrdinal(["#9ecae1", "#fa9fb5"])
    var pie = d3v5.pie()
      .sort(null)
      .value(function(d) { return d.value; });
    var arc = d3v5.arc()
      .outerRadius(radius)
      .innerRadius(0)
    redraw([{"label": "Male", "value":all_countries["BEN"]["Male"]}, {"label": "Female", "value":all_countries["BEN"]["Female"]}]);

    function redraw(data){

      // join
      var arcs = svg.selectAll(".arc")
          .data(pie(data), function(d){ return d.data.name; });

      // update
      arcs
        .transition()
          .duration(1500)
          .attrTween("d", arcTween);

      // enter
      arcs.enter().append("path")
        .attr("class", "update")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", arc)
        .each(function(d) { this._current = d; });

      arcs.enter().append("text")                                     //add a label to each slice
              .attr("transform", function(d) {                    //set the label's origin to the center of the arc
              //we have to make sure to set these before calling arc.centroid
              d.innerRadius = 0;
              d.outerRadius = radius;
              return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          //center the text on it's origin
            .text(function(d, i) { return data[i].label + ":" + " " + data[i].value; });        //get the label from our original data array

      // Remove if needed
      arcs.exit().remove();
  }

  // Store the displayed angles in _current.
  // Then, interpolate from _current to the new angles.
  // During the transition, _current is updated in-place by d3v3.interpolate.
  function arcTween(a) {
    console.log(this._current);
    var i = d3v5.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }
});
