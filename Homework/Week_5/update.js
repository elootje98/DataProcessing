function transform(){
  d3.select("svg").selectAll("cirle")
    .transition()
}

function upDate(value){
  var teensInViolentArea = "https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB11/all?startTime=2010&endTime=2017"
  var teenPregnancies = "https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB46/all?startTime=1960&endTime=2017"
  var gdp = "https://stats.oecd.org/SDMX-JSON/data/SNA_TABLE1/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+EU28+EU15+OECDE+OECD+OTF+NMEC+ARG+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+ROU+RUS+SAU+ZAF+FRME+DEW.B1_GE.HCPC/all?startTime=2012&endTime=2018&dimensionAtObservation=allDimensions"

  var requests = [d3.json(teensInViolentArea), d3.json(teenPregnancies), d3.json(gdp)];

  Promise.all(requests).then(function(response) {
      d3.json(teenPregnancies).then(function(datas) {
        var teenObject = transformResponse1(datas);
        keysPreg = Object.keys(teenObject);

        d3.json(teensInViolentArea).then(function(datas){
          var areaObject = transformResponse1(datas);
          keysArea = Object.keys(areaObject);

          d3.json(gdp).then(function(datas){
            var gdpObject = transformResponse2(datas);
            keysgdp = Object.keys(gdpObject);

            // Check which countries are in both datasets.
            var same = []
            keysPreg.forEach(function(element){
              if(keysArea.includes(element) && keysgdp.includes(element)){
                same.push(element);
              }
            })

            // Delete from the both dataset the countries that are not in both
            keysPreg.forEach(function(element){
              if(! same.includes(element)){
                delete teenObject[element];
              }
            })
            keysArea.forEach(function(element){
              if(! same.includes(element)){
                delete areaObject[element];
              }
            })
            keysArea.forEach(function(element){
              if(! same.includes(element)){
                delete gdpObject[element];
              }
            })
            countries = Object.keys(teenObject);
            numCountries = countries.length;

            // Combine the two datasets into one array with datapoints.
            dataArray = [];

              country = value;
              countryObject = areaObject[country];
              teencountryObject = teenObject[country];
              gdpcountryObject = gdpObject[country];
              var arrayteencountries = Object.keys(teencountryObject);
              var numteencountries = arrayteencountries.length - 5;
              var numcountryObject = (Object.keys(countryObject)).length - 1;

              // Loop through the values of the country for area
              for(key in countryObject){
                j = parseInt(key) + 2;
                if(j > numcountryObject){
                  { break; }
                }
                countryArray = []
                countryArray.push(country);
                dataArea = countryObject[j]["Datapoint"];
                countryArray.push(dataArea);

                // Take for the same year and country the pregnancy
                dataTeen = teencountryObject[numteencountries]["Datapoint"];
                numteencountries = numteencountries + 1;
                countryArray.push(dataTeen);

                // Take the values for gdp
                dataGDP = gdpcountryObject[j - 2]["Datapoint"];
                countryArray.push(dataGDP);
                dataArray.push(countryArray);
              }

          //  transform();

            // Remove the old SVG eleemnts
            d3.selectAll("svg > *").remove();
            // transform()

            //Create SVG element
            var svgH = 1000;
            var svgW = 1200;
            var svg = d3.select("body")
                        .select("svg")
                        .attr("width", svgW)
                        .attr("height", svgH);

            // Get the maximal values from the data x and y
            var widthMarg = 500;
            var hightMarg = 500;
            h = svgH - hightMarg;
            w = svgW - widthMarg;
            areaArray = [];
            teenArray = [];
            gdpArray = [];

            dataLen = dataArray.length
            for(var k = 0; k < dataLen; k++){
              var dataPoint = dataArray[k];
              areaArray.push(dataPoint[1]);
              teenArray.push(dataPoint[2]);
              gdpArray.push(dataPoint[3]);
            }

            // Add padding
            var padding = 20;
            var leftPadding = 40;

            // Make functions to scale the axes and radius.
            var xScale = d3.scaleLinear()
                     .domain([0, d3.max(areaArray)])
                     .range([padding, w - padding * 4]);
            var yScale = d3.scaleLinear()
                     .domain([0, d3.max(teenArray)])
                     .range([h - padding, padding]);

            // Add color
            var color = d3.scaleOrdinal(d3.schemeCategory10);

            var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
            .html(function(d) {
              return d[1] + ";" + d[2];
            });
            d3.select("body").select("svg").call(tip);

            // Make a circle for each datapoint
            svg.selectAll("circle")
               .data(dataArray)
               .enter()
               .append("circle")
               .attr("cx", function(d) {
                    return xScale(d[1]);
               })
               .attr("cy", function(d) {
                    return yScale(d[2]) + (2 * padding);
               })
               .style("fill", function(d) {
                    return color(Math.round((d[3] / 10000))); })
               .attr("r", 5)
               .on('mouseover', tip.show)
               .on('mouseenter', function(){
                d3.select(this)
                    .style("fill", "black");
                })
               .on('mouseout', tip.hide)
               .on('mouseleave', function(){
                d3.select(this)
                .style("fill", function(d) {
                     return color(Math.round((d[3] / 10000))); })
                });

          var legend = svg.selectAll(".legend")
               .data(color.domain())
             .enter().append("g")
               .attr("class", "legend")
               .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

               legend.append("rect")
                      .attr("x", w + 30)
                      .attr("y", 100)
                      .attr("width", 18)
                      .attr("height", 18)
                      .style("fill", color);

                   legend.append("text")
                    .attr("x", w + 24)
                    .attr("y", 110)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function(d) { return d; });

               svg.append("text")
                 .text("GDP (times 100.000)")
                 .attr("x", w)
                 .attr("y", 90);

            // Create the axes
            d3.select("body").select("svg")
                .append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + (leftPadding) + "," + (h + padding) + ")")
                .call(d3.axisBottom(xScale));

              //Create Y axis
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + (leftPadding * 1.5) + "," + (2 * padding)+ ")")
                .call(d3.axisLeft(yScale));

            // Create labels to the Y axis
            svg.append("text")
              .text("Adolescent fertility rate")
              .attr("x", -350)
              .attr("y", 25)
              .attr("transform", "rotate(-90)");

            // Create title
            svg.append("text")
              .text("Teenagers in voilent areas")
              .attr("x", w/2 - leftPadding)
              .attr("y", padding)

            // Create labels for the X axis
            svg.append("text")
              .text("Children (0-17) living in areas with problems with crime or violence (%)")
              .attr("x", w/7 - padding)
              .attr("y", h + (3 * padding))
              });
              });


    }).catch(function(e){
        throw(e);
      });

    });
}
