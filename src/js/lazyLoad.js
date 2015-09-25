var lazy = document.querySelectorAll("[data-src]");
lazy = Array.prototype.slice.call(lazy);

var timeout = null;
var debounce = function(f, d) {
  if (timeout) return;
  setTimeout(f, d || 100);
};

window.addEventListener("scroll", function() {
  lazy = lazy.filter(function(element) {
    var bounds = element.getBoundingClientRect();
    if (bounds.top > 0 && bounds.top < window.innerHeight) {
      element.setAttribute("src", element.getAttribute("data-src"));
      return false;
    }
    return true;
  })
});