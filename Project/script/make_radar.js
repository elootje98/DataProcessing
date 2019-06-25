var RadarChart = {
  draw: function(id, d, options){
    var cfg = {
     radius: 5,
     w: 800,
     h: 600,
     factor: 1,
     factorLegend: .85,
     levels: 3,
     maxValue: 0,
     radians: 2 * Math.PI,
     opacityArea: 1,
     ToRight: 5,
     TranslateX: 200,
     TranslateY: 30,
     ExtraWidthX: 100,
     ExtraWidthY: 100,
     color: d3v5.scaleOrdinal().range(["#6F257F", "#CA0D59"])
    };

    if('undefined' !== typeof options){
      for(var i in options){
      if('undefined' !== typeof options[i]){
        cfg[i] = options[i];
      }
      }
    }

    cfg.maxValue = 50;

    var allAxis = (d[0].map(function(i, j){return i.area}));
    var total = allAxis.length;
    var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
    var Format = d3v3.format('%');
    d3v3.select(id).select("svg").remove();

    var g = d3v3.select(id)
        .append("svg")
        .attr("width", cfg.w+cfg.ExtraWidthX)
        .attr("height", cfg.h+cfg.ExtraWidthY)
        .append("g")
        .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

		var tooltip;

    //Text indicating at what % each level is
    for(var j=0; j<cfg.levels; j++){
      var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
      g.selectAll(".levels")
       .data([1]) //dummy data
       .enter()
       .append("svg:text")
       .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
       .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
       .attr("class", "legend")
       .style("font-family", "sans-serif")
       .style("font-size", "10px")
       .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
       .attr("fill", "#a00026")
    }

    series = 0;

    var axis = g.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
      .attr("x1", cfg.w/2)
      .attr("y1", cfg.h/2)
      .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
      .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
      .attr("class", "line")
      .style("stroke", "black")
      .style("stroke-width", "1px");

    var svg = d3v5.select("body").select("#box-two").select("#spider").select("svg");

    svg.append("text")
      .attr("class", "legend")
      .text("National tv and Radio")
      .attr("dy", "1.5em")
      .attr("x", 300)
      .attr("y", 5)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("Internet")
      .attr("dy", "1.5em")
      .attr("x", 180)
      .attr("y", 60)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("International tv")
      .attr("dy", "1.5em")
      .attr("x", 480)
      .attr("y", 60)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("and radio")
      .attr("dy", "1.5em")
      .attr("x", 480)
      .attr("y", 75)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("Point of sale")
      .attr("dy", "1.5em")
      .attr("x", 500)
      .attr("y", 200)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("Billboards and outdoor advertising")
      .attr("dy", "1.5em")
      .attr("x", 370)
      .attr("y", 315)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("International magazines")
      .attr("dy", "1.5em")
      .attr("x", 200)
      .attr("y", 315)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("and newspapers")
      .attr("dy", "1.5em")
      .attr("x", 200)
      .attr("y", 335)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("Local magazines")
      .attr("dy", "1.5em")
      .attr("x", 100)
      .attr("y", 180)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "legend")
      .text("and newspapers")
      .attr("dy", "1.5em")
      .attr("x", 100)
      .attr("y", 200)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "title")
      .text("United States of America")
      .attr("x", 50)
      .attr("y", 60)
      .style("fill", "#a00026");

    svg.append("text")
      .attr("class", "title")
      .text("Ban on Advertising:")
      .attr("x", 50)
      .attr("y", 30)
      .style("fill", "#a00026");

    d.forEach(function(y, x){
      dataValues = [];
      g.selectAll(".nodes")
      .data(y, function(j, i){
        dataValues.push([
        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
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


    d.forEach(function(y, x){
      g.selectAll(".nodes")
      .data(y).enter()
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
            })
      .append("svg:title")
      .text(function(j){return Math.max(j.value, 0)});

      series++;
    });
    }
};
