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
      toggleIcon($(this).attr('id'));
    });
  });

  var map = L.map('map').setView([36.165818, -86.784245], 13);
  //varables for the map. points are latitude and longitude points
  //markers are leaflet markers
  var firePoints=[], parksPoints=[], policePoints=[], wifiPoints=[],
    fireMarkers=[], policeMarkers=[], wifiMarkers=[], parksMarkers=[];
  //set up the icons for the markers
  var fireIcon = new L.Icon({iconUrl:'../images/firestation.png',iconSize:[45,45]}),
      policeIcon = new L.Icon({iconUrl:'../images/policestation.png',
                              iconSize:[45,45]}),
      wifiIcon = new L.Icon({iconUrl:'../images/wifi.png',iconSize:[45,45]}),
      parksIcon = new L.Icon({iconUrl:'../images/park.png',iconSize:[45,45]});

  //create the layer for the map from MapQuest
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

function toggleIcon(type){
  //toggleIcon takes the type of markers we want to toggle
  //and creates the markers if they don't exist and toggles
  //whether they are showing or not
  switch(type){
    case 'fire-station':
      setMarkersFor(firePoints,fireMarkers,fireIcon);
      break;
    case 'police-station':
      setMarkersFor(policePoints,policeMarkers,policeIcon);
      break;
    case 'wifi':
      setMarkersFor(wifiPoints,wifiMarkers,wifiIcon);
      break;
    case 'parks':
      setMarkersFor(parksPoints,parksMarkers,parksIcon);
      break;
  }
  function setMarkersFor(points, markers, icon){
    //set markers makes the array of leaflet markers if
    //they do not exist
    if(!markers[0]){
      points.forEach(function(el){
        //for each point, make a new marker and push it into
        //the markers array
        markers.push(L.marker(el,{icon:icon}).addTo(map));
      });
    }
    //if they already exist, then toggle the opacity to show or
    //hide the markers
    else{
      markers.forEach(function(el){
        if(el.options.opacity === 0)
          el.setOpacity(1);
        else
          el.setOpacity(0);
      });
    }
  }
}

})();
