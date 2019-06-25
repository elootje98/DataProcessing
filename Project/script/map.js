function makeMapdata(datas){

    var all_countries = {}

    for(var i = 0; i < 2328; i++){
    country = {}
      if(datas["fact"][i]["dims"]["SEX"] == "Both sexes" && datas["fact"][i]["dims"]["GHO"] == "Daily tobacco smoking, age-standardised"
         && datas["fact"][i]["Value"] != "Not available"){
        value = datas["fact"][i]["Value"];

        var fillKey;

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
        country["Tax"] = "UNKNOWN";
        country_name = datas["fact"][i]["dims"]["COUNTRY"];
        code = toCountryCode(country_name);

        all_countries[code] = country;
      }
    }

    // Also do this for females
    var all_countries_females = {}

    for(var i = 0; i < 2328; i++){
    country = {}
      if(datas["fact"][i]["dims"]["SEX"] == "Female" && datas["fact"][i]["dims"]["GHO"] == "Daily tobacco smoking, age-standardised"
         && datas["fact"][i]["Value"] != "Not available"){
        value = datas["fact"][i]["Value"];

        var fillKey;

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
        country["Tax"] = "UNKNOWN";
        country_name = datas["fact"][i]["dims"]["COUNTRY"];
        code = toCountryCode(country_name);

        all_countries_females[code] = country;
      }
    }

    // Also do this for males
    var all_countries_males = {}

    for(var i = 0; i < 2328; i++){
    country = {}
      if(datas["fact"][i]["dims"]["SEX"] == "Male" && datas["fact"][i]["dims"]["GHO"] == "Daily tobacco smoking, age-standardised"
         && datas["fact"][i]["Value"] != "Not available"){
        value = datas["fact"][i]["Value"];

        var fillKey;

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

        all_countries_males[code] = country;
      }
    }
  mapData = [all_countries, all_countries_males, all_countries_females];

  return mapData;
}
