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

map.find("svg").on("mouseenter", "text, polygon", function() {
  var state = this.tagName.toLowerCase() == "text" ? this.innerHTML.trim() : this.id;

  var obj = window.lawsByState[state];
  showTooltip(obj);
});

map.find("svg").on("mouseleave", "text, polygon", function() {
  hideTooltip(this);
});

var showTooltip = function(target) {
  tooltip.classList.add("show");
  tooltip.innerHTML = `<div class='tooltip-name'>${target.name}</div>`;
  if (target.law1 == "Y") {
    tooltip.innerHTML += `<div class="tooltip-ls"><li>Malicious intent and bad faith required</div>`;
  }
  if (target.law2 == "Y") {
    tooltip.innerHTML += `<div class="tooltip-ls"><li>Riot suppression allowed</div>`;
  }
  if (target.law3 == "Y") {
    tooltip.innerHTML += `<div class="tooltip-ls"><li>Escapee shooting permitted</div>`;
  }
  if (target.law4 == "Y") {
    tooltip.innerHTML += `<div class="tooltip-ls"><li>Warning required prior</div>`;
  }
  if (target.law5 == "Y") {
    tooltip.innerHTML += `<div class="tooltip-ls"><li>No laws</div>`;
  }
  if (target.law1 == "N" & target.law2 == "N" & target.law3 == "N" & target.law4 == "N" & target.law5 == "N") {
    tooltip.innerHTML += "None of listed laws apply."
  }
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

