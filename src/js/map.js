var $ = require("jquery");

var map = $(".map-container");
var selectedLaw;
var tooltip = document.querySelector(".tooltip");

for (var id in lawsByState) {
  var state = lawsByState[id];
  var poly = document.querySelector(`#map #${id}`);
  [1, 2, 3, 4, 5].forEach(function(num) {
    var lawClass = `law${num}-hex`;
    var legality = state["law" + num];
    // return legality == "Y" ? palette[selectedLaw] : "#888";
    if (legality == "Y") {
      poly.classList.add(lawClass);
    }
  });
};

$(".button-container").on("click", ".law-container", function(e) {
  var law = this.getAttribute("data-law") * 1;
  map.attr("selected-law", `law${law}`);
  $(".law-container.selected").removeClass("selected");
  $(this).addClass("selected");
});

$(".law-container:first").click();

map.find("svg").on("mouseenter", "g", function() {
  var state = this.id;
  var obj = window.lawsByState[state];
  showTooltip(obj);
});

map.find("svg").on("mouseleave", "g", function() {
  hideTooltip(this);
});

var showTooltip = function(target) {
  tooltip.classList.add("show");
  var laws = {
    law1: "Malicious intent and bad faith required",
    law2: "Riot suppression allowed",
    law3: "Escapee shooting allowed",
    law4: "Prior warning required",
    law5: "No specific laws"
  };
  var hasLaw = false;
  var lawItems = "";
  for (var key in laws) {
    if (target[key] == "Y") {
      hasLaw = true;
      lawItems += `<li>${laws[key]}</li>`;
    }
  }
  if (!hasLaw) {
    lawItems = "None of listed laws apply."
  }
  tooltip.innerHTML = `
  <div class='tooltip-name'>${target.name}</div>
  <ul class="tooltip-ls">${lawItems}</ul>
  `;
};

var hideTooltip = function(target) {
  tooltip.classList.remove("show");
};

document.querySelector("svg").addEventListener("mousemove", function(e) {
  var bounds = this.getBoundingClientRect();
  var x = e.clientX - bounds.left;
  var y = e.clientY - bounds.top;
  tooltip.style.left = x + 20 + "px";
  tooltip.style.top = y + 20 + "px";

  tooltip.classList[x > bounds.width / 2 ? "add" : "remove"]("flip");
});

