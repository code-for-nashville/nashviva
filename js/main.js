(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){

  }

  var datasetButtons= ['#fire-station','#police-station','#wifi', '#parks'];

  datasetButtons.forEach(function(dataset){
    $(dataset).click(function(){
      console.log(this);
      //add toggle for showing icons on map
      toggleHeat($(this).attr('id'));
    });
  });

  var map = L.map('map').setView([36.165818, -86.784245], 13);
  var firePoints=[],
    parksPoints=[],
    policePoints=[],
    wifiPoints=[];
  var heat = L.heatLayer([],{max:0.3,radius:110}).addTo(map);

  L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
    subdomains: ['otile1','otile2','otile3','otile4']
}).addTo( map );

//getting stuff from metro API **placeholder will replace with real data
$.get('https://data.nashville.gov/api/views/frq9-a5iv/rows.json',function(data){
  data.data.forEach(function(location){
    firePoints.push([+location[13][1],+location[13][2]]);
  });
});
$.get('https://data.nashville.gov/api/views/y5ik-ut5s/rows.json',function(data){
  data.data.forEach(function(location){
    policePoints.push([+location[16][1],+location[16][2]]);
  });
});
$.get('https://data.nashville.gov/api/views/4ugp-s85t/rows.json',function(data){
  data.data.forEach(function(location){
    wifiPoints.push([+location[11][1],+location[11][2]]);
  });
});
$.get('https://data.nashville.gov/api/views/74d7-b74t/rows.json',function(data){
  data.data.forEach(function(location){
    if(location[41][1])
      parksPoints.push([+location[41][1],+location[41][2]]);
  });
});

function toggleHeat(type){
  switch(type){
    case 'fire-station':
      heat.setLatLngs(firePoints);
      heat.redraw();
      break;
    case 'police-station':
      heat.setLatLngs(policePoints);
      heat.redraw();
      break;
    case 'wifi':
      heat.setLatLngs(wifiPoints);
      heat.redraw();
      break;
    case 'parks':
      heat.setLatLngs(parksPoints);
      heat.redraw();
      break;

  }
}

})();
