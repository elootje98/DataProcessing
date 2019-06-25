// Transform the data for the adds.
function makeAddata(datas) {
  var all_countries_ads = {}
  types = []

  // Loop over the values of the taxes and add the values to the all_countreis
  for(var i = 0; i < 5432; i++){
    ban = {}

    if(datas["fact"][i]["dims"]["YEAR"] == 2012){
      var value = datas["fact"][i]["Value"];

      if(value == "No"){
        value = 0;
      }
      else {
        value = 50;
      }
      var type = datas["fact"][i]["dims"]["GHO"];
      var typeWithout = type.replace("Ban on advertising: ", "");
      ban["area"] = typeWithout;
      ban["value"] = value;
      types.push(ban);

      // If its the last one to add
      if(type == "Ban on advertising: Internet"){
      code = toCountryCode(datas["fact"][i]["dims"]["COUNTRY"]);
      all_countries_ads[code] = types;
      types = [];
      }
    }
  }
  return all_countries_ads;
};

// Make the spiderchart.
function makeSpider(data){
  var width = 300,
      height = 300;

  // Config for the Radar chart
  var config = {
      w: width,
      h: height,
      maxValue: 100,
      levels: 5,
      ExtraWidthX: 300
  }

  RadarChart.draw("#spider", data, config);
};

// Update the spiderchart.
function updateSpider(d){

  var cfg = {
   radius: 5,
   w: 600,
   h: 600,
   factor: 1,
   factorLegend: .85,
   levels: 3,
   maxValue: 100,
   radians: 2 * Math.PI,
   opacityArea: 1,
   ToRight: 5,
   TranslateX: 80,
   TranslateY: 30,
   ExtraWidthX: 100,
   ExtraWidthY: 100,
   color: d3v5.scaleOrdinal().range(["#6F257F", "#CA0D59"])
  };

  var svg = d3v5.select("body").select("#box-two").select("#spider")
  var g = svg.select("g");
  var allAxis = (d[0].map(function(i, j){return i.area}));
  var total = allAxis.length;

  var dots = svg.select("g").selectAll("circle")

  // Enter
  d.forEach(function(y, x){
    dataValues = [];
    dots.data(y)
      .enter()
      .append("svg:circle")
      .attr("class", "radar-chart-serie"+series)
      .attr('r', cfg.radius)
      .attr("alt", function(j){return Math.max(j.value, 0)})
      .attr("cx", function(j, i){
        dataValues.push([
        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
      ]);
      return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
      })
      .attr("cy", function(j, i){
        return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
      })
      .attr("data-id", function(j){return j.area})
      .style("fill", "#fff")
      .style("stroke-width", "2px")
      .style("stroke", "#a00026")
      .on('mouseover', function (d){
            newX =  parseFloat(d3v3.select(this).attr('cx')) - 10;
            newY =  parseFloat(d3v3.select(this).attr('cy')) - 5;

            tooltip
              .attr('x', newX)
              .attr('y', newY)
              .text(Format(d.value))
              .transition(200)
              .style('opacity', 1);

            z = "polygon."+d3v3.select(this).attr("class");
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", 0.1);
            g.selectAll(z)
              .transition(200)
              .style("fill-opacity", .7);
            })
      .on('mouseout', function(){
            tooltip
              .transition(200)
              .style('opacity', 0);
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", cfg.opacityArea);
            })
      .append("svg:title")
      .text(function(j){return Math.max(j.value, 0)});
    });

    d.forEach(function(y, x){
      dots.data(y)
        .attr("class", "radar-chart-serie"+series)
        .attr('r', cfg.radius)
        .attr("alt", function(j){return Math.max(j.value, 0)})
        .attr("cx", function(j, i){
          dataValues.push([
          cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
          cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
        ]);
        return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)) - 150;
        })
        .attr("cy", function(j, i){
          return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total)) - 150;
        })
        .attr("data-id", function(j){return j.area})
        .style("fill", "#fff")
        .style("stroke-width", "2px")
        .style("stroke", "#a00026")
        .on('mouseover', function (d){
              newX =  parseFloat(d3v3.select(this).attr('cx')) - 10;
              newY =  parseFloat(d3v3.select(this).attr('cy')) - 5;

              tooltip
                .attr('x', newX)
                .attr('y', newY)
                .text(Format(d.value))
                .transition(200)
                .style('opacity', 1);

              z = "polygon."+d3v3.select(this).attr("class");
              g.selectAll("polygon")
                .transition(200)
                .style("fill-opacity", 0.1);
              g.selectAll(z)
                .transition(200)
                .style("fill-opacity", .7);
              })
        .on('mouseout', function(){
              tooltip
                .transition(200)
                .style('opacity', 0);
              g.selectAll("polygon")
                .transition(200)
                .style("fill-opacity", cfg.opacityArea);
              })
        .append("svg:title")
        .text(function(j){return Math.max(j.value, 0)});
      });


        var newArea = svg.select("g").selectAll(".area")
            .data(d)

        svg.select("g").select("polygon").remove();

        d.forEach(function(y, x){
          dataValues = [];
          g.selectAll(".nodes")
          newArea.data(y, function(j, i){
            dataValues.push([
            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)) - 150,
            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total)) - 150
            ]);
          });
          dataValues.push(dataValues[0]);
          g.selectAll(".area")
                 .data([dataValues])
                 .enter()
                 .append("polygon")
                 .attr("class", "radar-chart-serie"+series)
                 .style("stroke-width", "2px")
                 .style("stroke", cfg.color(series))
                 .attr("points",function(d) {
                   var str="";
                   for(var pti=0;pti<d.length;pti++){
                     str=str+d[pti][0]+","+d[pti][1]+" ";
                   }
                   return str;
                  })
                 .style("fill", "#a00026")
                 .style("fill-opacity", cfg.opacityArea)
                 .on('mouseover', function (d){
                          z = "polygon."+d3v3.select(this).attr("class");
                          g.selectAll("polygon")
                           .transition(200)
                           .style("fill-opacity", 0.1);
                          g.selectAll(z)
                           .transition(200)
                           .style("fill-opacity", .7);
                          })
                 .on('mouseout', function(){
                          g.selectAll("polygon")
                           .transition(200)
                           .style("fill-opacity", cfg.opacityArea);
                 });
          series++;
        });
        series=0;
}
