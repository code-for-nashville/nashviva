(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){

  }

  var datasetButtons= ['#fire-station','#police-station','#wifi', '#parks']

  datasetButtons.forEach(function(dataset){
    $(dataset).click(function(){
      console.log(this);
      //add toggle for showing icons on map
    })
  });

  var map = L.map('map').setView([36.165818, -86.784245], 13);

  L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
    subdomains: ['otile1','otile2','otile3','otile4']
}).addTo( map );

})();
