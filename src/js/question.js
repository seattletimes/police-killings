var $ = require("jquery");

$(document.body).on("click", ".option", function() {
  $(this).siblings(".answer").slideDown();
});

$(document.body).on("click", ".toggle", function(e) {
  var toggle = e.target.getAttribute("data-filter");
  $(this).siblings(".grid").attr("data-filter", toggle);
  $(this).siblings(".toggle.selected").removeClass("selected");
  $(this).addClass("selected");
});

var buffer = document.createElement("div");

window.deadlyForceData.forEach(function(row) {
  var classes = ["square"];

  var age = row.age < 20 ? "age-0"  :
            row.age < 30 ? "age-20" :
            row.age < 40 ? "age-30" :
            row.age < 50 ? "age-40" :
            row.age < 60 ? "age-50" :
            row.age < 70 ? "age-60" :
                           "age-70" ;

  var gender = row.gender == "Male" ? "male" : "female";

  var race = row.race == "Asian/Pacific Islander" ? "asian"    :
             row.race == "Black"                  ? "black"    :
             row.race == "Hispanic"               ? "hispanic" :
             row.race == "Multiple"               ? "multiple" :
             row.race == "Native American"        ? "native"   :
                                                    "white"    ;

  var weapon = row.weapon == "Knife/blade" ? "knife"     :
               row.weapon == "Firearm"     ? "firearm"   :
               row.weapon == "No weapon"   ? "no-weapon" :
               row.weapon == "Vehicle"     ? "vehicle"   :
               row.weapon == "Fake gun"    ? "fake"      :
                                             "other"     ;
                                                    
  var parsedTime = row.time.match(/^(\d+):.*?([AP]M)$/);
  if (parsedTime) {
    var [, hour, amPm] = parsedTime;
  }
  if (amPm == "PM") hour += 12;
  var time = hour < 6 ? "time-0"   :
             hour < 12 ? "time-6"  :
             hour < 18 ? "time-12" :
                         "time-18" ;

  classes.push(age);
  classes.push(gender);
  classes.push(race);
  classes.push(time);

  var square = document.createElement("div");
  square.className = classes.join(" ");
  buffer.appendChild(square);
});

$(".grid").each(function() {
  this.innerHTML = buffer.innerHTML;
});
