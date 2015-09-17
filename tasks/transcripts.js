/*

Convert senate transcripts into usable JSON for the audio interactive.

*/

module.exports = function(grunt) {

  grunt.registerTask("transcript", function() {

    var transcript = grunt.file.read("data/senate-captions.sbv");
    var lines = transcript.split("\n");

    const TIMECODE = 1;
    const CONTENT = 2;
    const WAITING = 0;

    var records = [];
    var record;
    var floor;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.match(/^\d{1}:\d{2}:\d{2}/)) {
        //encountered new timecode, close old record
        if (record && record.content) {
          records.push(record);
        }
        record = {
          content: ""
        };
        var codes = line.split(",");
        ["start", "end"].forEach(function(prop, i) {
          var code = codes[i];
          var parsed = /(\d):(\d+):(\d+)(\.\d+)/.exec(code).map(Number);
          var hours = parsed[1];
          var minutes = parsed[2];
          var seconds = parsed[3];
          var ms = parsed[4];
          var time = (hours * 60 * 60) + (minutes * 60) + seconds + ms;
          record[prop] = time;
        });
      } else {
        if (!record || !line) continue;
        var nametag = /^([A-Z\W\s]+): /;
        var speaker = line.match(nametag);
        if (speaker) {
          floor = record.speaker = speaker[1];
        } else {
          record.speaker = floor;
        }
        record.content += line.replace(nametag, "") + " ";
      }
    }

    if (record && record.content) records.push(record);

    grunt.file.write("src/assets/transcript.json", JSON.stringify(records, null, 2));

  });

}