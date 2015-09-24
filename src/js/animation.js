//NPM
var $ = require("jquery");

//utility
var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
var reflow = () => document.body.offsetWidth;
var wait = (d, f) => setTimeout(f, d);

//CSS
var delay = (d) => (Math.random() * d).toFixed(2) + "s";

var header = document.querySelector("header.splash");
var squares = qsa("header.splash .dot:not(.conviction)");

header.classList.add("animation-ready");

squares.forEach(function(square) {
  var $square = $(square);
  $square.css({
    transitionDelay: delay(3)
  });
});

reflow();

header.classList.add("animation-start");

var step = (d, n) => setTimeout(() => header.classList.add(`animation-step-${n}`), d);

$(function() {
  step(50, 1);
  step(1000, 2);
  step(5500, 3);
  step(7000, 4);
  step(9000, 5);
  step(12000, 6);
});