var $ = require("jquery");

var tweets = $(".tweet");

tweets.on("click", function() {
  var text = this.getAttribute("data-tweet") || this.innerHTML;
  text = encodeURI(text);
  var location = encodeURI(window.location.href);
  var url = `https://twitter.com/intent/tweet?text=${text}&url=${location}&via=seattletimes`;
  window.open(url, "_blank", "width=640,height=480,menubar=0,toolbar=0,location=0");
});

tweets.each(function() {
  var text = this.getAttribute("data-tweet") || this.innerHTML;
  if (text.length > 100) console.warn("Tweet too long: ", text);
});