var $ = require("jquery");

$(".option").on("click", function() {
  $(this).siblings(".answer").slideDown("fast");
});
