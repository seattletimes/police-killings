var $ = require("jquery");
var dot = require("./lib/dot");
var card = dot.compile(require("./_card.html"));

var lookup = {};

deadlyForceData.forEach(function(row, index) {
  [row.last, row.first] = row.name.split(", ");

  if (row.race == "Multiple") row.race = "Multiracial";

  row.weaponLabel = row.weapon;

  if (row.weapon == "Weapon - other") {
    row.weaponLabel = row.weaponDetail.replace(/^([a-z])|\s+([a-z])/, function(letter) {
      return letter.toUpperCase();
    });
    row.image = row.weaponDetail.toLowerCase().replace(/[\/\s]/g, "").split(",");
  } else if (row.weapon !== "No weapon") {
    row.image = row.weapon.toLowerCase().replace(/[\/\s]/g, "").split(",");
  } else {
    row.weaponLabel = "None";
  }

  var parsedTime = row.time.match(/^(\d+):.*?([AP]M)$/);
  if (parsedTime) {
    var [, hour, amPm] = parsedTime;
    hour = Number(hour);
  } else {
    hour = -1;
  }
  if (amPm == "AM" && hour == 12) hour = 0;
  if (amPm == "PM" && hour < 12) hour += 12;

  row.hour = hour;
  row.id = index;
  lookup[index] = row;
});

var makeSquares = function(grid, sort) {
  switch (sort) {

    case "age":
      deadlyForceData.sort(function(a,b) {
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
      });
    case "hour":
      deadlyForceData.sort(function(a,b) {
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
      });

    break;

    default:
      deadlyForceData.sort(function(a,b) {
        if (a[sort] < b[sort]) return 1;
        if (a[sort] > b[sort]) return -1;
        return 0;
      });
  }

  deadlyForceData.forEach(function(row) {

    var classes = ["square"];

    var age = row.age < 20 ? "age-0"  :
              row.age < 30 ? "age-20" :
              row.age < 40 ? "age-30" :
              row.age < 50 ? "age-40" :
              row.age < 60 ? "age-50" :
              row.age < 70 ? "age-60" :
                             "age-70" ;

    // var gender = row.gender == "Male" ? "male" : "female";

    var race = row.race == "Asian/Pacific Islander" ? "asian"    :
               row.race == "Black"                  ? "black"    :
               row.race == "Hispanic"               ? "hispanic" :
               row.race == "Multiracial"            ? "multiple" :
               row.race == "Native American"        ? "native"   :
                                                      "white"    ;

    var weapon = row.weapon == "Knife/blade" ? "knife"     :
                 row.weapon == "Firearm"     ? "firearm"   :
                 row.weapon == "No weapon"   ? "no-weapon" :
                 row.weapon == "Vehicle"     ? "vehicle"   :
                 row.weapon == "Fake gun"    ? "fake"      :
                                               "other"     ;
                                                      
    var time = row.hour == -1  ? "time-null" :
               row.hour <   6  ? "time-0"    :
               row.hour <   12 ? "time-6"    :
               row.hour <   18 ? "time-12"   :
               row.hour <   24 ? "time-18"   :
               "" ;

    classes.push(age);
    // classes.push(gender);
    classes.push(race);
    classes.push(time);
    classes.push(weapon);

    var square = document.createElement("div");
    square.className = classes.join(" ");
    square.setAttribute("data-index", row.id);
    grid.appendChild(square);
  });
};

$(".grid").each(function() {
  makeSquares(this, this.getAttribute("data-sort"));
});

var clearQuestion = function(action) {
  $(".options").addClass("pending");
  $(".correct").removeClass("green");
  $(".chosen").removeClass("chosen");
  $(".hide-question.visible").removeClass("visible");
  if (action == "slide") {
    $(".answer").slideUp();
  } else {
    $(".answer").hide();
  }
}

$(document.body).on("click", ".option", function(e) {
  var options = $(this).closest(".options");
  if (!options.hasClass("pending")) return;

  clearQuestion("hide");
  var _ = document.body.offsetWidth;
  options.closest(".question-box")[0].scrollIntoView();

  options.removeClass("pending");
  options.siblings(".hide-question").addClass("visible");
  var answer = options.siblings(".answer");
  answer.slideDown();

  options.children(".correct").addClass("green");
  e.target.classList.add("chosen");
});

$(document.body).on("click", ".hide-question", function(e) {
    clearQuestion("slide");
});

$(document.body).on("click", ".toggle", function(e) {
  var toggle = this.getAttribute("data-filter");
  var $this = $(this);
  $this.closest(".answer").attr("data-filter", toggle);
  $this.siblings(".toggle.selected").removeClass("selected");
  $this.addClass("selected");
});

$(document.body).on("click", ".square", function(e) {
  var id = e.target.getAttribute("data-index");
  var individual = lookup[id];
  $(this).closest(".grid").next(".individual").html(card(individual));
  $(this).siblings(".square.selected").removeClass("selected");
  $(this).addClass("selected");
});
