var container = document.querySelector(".debate-player");
var audio = container.querySelector("audio");

var $ = require("jquery");
var track = require("./lib/tracking");

window.$ = $;

$.ajax("./assets/transcript.json").then(function(transcript) {

  var tContainer = container.querySelector(".transcript");
  var stage = container.querySelector(".stage");

  var currentSpeaker = "";
  transcript.forEach(function(line, index) {
    var li = document.createElement("li");
    var speakerTag = "";
    if (currentSpeaker != line.speaker) {
      speakerTag = line.speaker + ": ";
    }
    currentSpeaker = line.speaker;
    li.innerHTML = speakerTag + line.content;
    li.setAttribute("data-index", index);
    tContainer.appendChild(li);
    line.element = li;
  });

  var active = null;

  var update = function() {
    var time = audio.currentTime;
    for (var i = 0; i < transcript.length; i++) {
      var line = transcript[i];
      if (line.start <= time && line.end > time && active != line.element) {     
        if (active) {
          active.classList.remove("active");
        }
        active = line.element;
        active.classList.add("active");
        var bounds = active.getBoundingClientRect();
        var cBounds = tContainer.getBoundingClientRect();
        if (bounds.top < cBounds.top || bounds.bottom > cBounds.bottom) {
          $(tContainer).animate({ scrollTop: active.offsetTop - 20 });
        }
        stage.setAttribute("data-speaker", line.speaker.toLowerCase());
        break;
      }
    }
  }

  audio.addEventListener("timeupdate", update);

  audio.addEventListener("playing", () => track("investigation-police", "played-audio"));

  tContainer.addEventListener("click", function(e) {
    var index = e.target.getAttribute("data-index");
    if (index !== null) {
      var line = transcript[index];
      audio.currentTime = line.start;
      audio.play();
      update();
    }
  });

  container.querySelector(".show-transcript").addEventListener("click", function() {
    tContainer.classList.toggle("toggle");
    active = null;
    update();
  });

});