## This is a markdown test file

<aside class="audio sidebar">
  <%= t.include("_audio.html") %>
</aside>

<!-- Age -->
<aside class="question-box">
  <div class="question">Of the 212 people killed by police, how many were teenagers?</div>
  <div class="option">3%</div>
  <div class="option">9%</div>
  <div class="option">15%</div>
  <div class="option">30%</div> 
  <div class="answer">
    <div class="explainer">
      Just seven of the deaths were teenagers. The youngest person was 16, the oldest 77. Nearly 40 percent were 40 or older. Only three of the 212 people killed by police were women.
    </div>
    <div class="toggle-label">Age:</div>
    <div class="toggle selected" data-filter="age-0">0-19</div>
    <div class="toggle" data-filter="age-20">20-29</div>
    <div class="toggle" data-filter="age-30">30-39</div>
    <div class="toggle" data-filter="age-40">40-49</div>
    <div class="toggle" data-filter="age-50">50-59</div>
    <div class="toggle" data-filter="age-60">60-69</div>
    <div class="toggle" data-filter="age-70">70+</div>
    <section class="grid" data-filter="age-0"></section>
  </div>
</aside>

<!-- Race -->
<aside class="question-box">
  <div class="question">Race question</div>
  <div class="option">A</div>
  <div class="option">B</div>
  <div class="option">C</div>
  <div class="option">D</div>
  <div class="answer">
    <section class="grid" data-filter=""></section>
  </div>
</aside>

<!-- Time of day -->
<aside class="question-box">
  <div class="question">Which hours of the day had the highest number of deaths?</div>
  <div class="option">Midnight to 6 a.m.</div>
  <div class="option">6 a.m. to noon</div>
  <div class="option">Noon to 6 p.m.</div>
  <div class="option">6 p.m. to midnight</div>
  <div class="answer">
    <div class="explainer">
      While evening hours saw the highest number of fatal police encounters, 41 percent occurred during the day (6 a.m. to 6 p.m.).
    </div>
    <div class="toggle-label">Time of day:</div>
    <div class="toggle" data-filter="time-0">Midnight-6 a.m.</div>
    <div class="toggle" data-filter="time-6">6 a.m.-noon</div>
    <div class="toggle" data-filter="time-12">Noon-6 p.m.</div>
    <div class="toggle selected" data-filter="time-18">6 p.m.-midnight</div>
    <section class="grid" data-filter="time-18"></section>
  </div>
</aside>