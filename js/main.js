(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){

  }

  var datasetButtons= ['#fire-station','#police-station','#wifi', '#parks','#community'];

  datasetButtons.forEach(function(dataset){
    $(dataset).click(function(){
      //add toggle for showing icons on map
      toggleIcon($(this).attr('id'));
    });
  });

  var map = L.map('map').setView([36.165818, -86.784245], 13);
  //varables for the map. points are latitude and longitude points
  //markers are leaflet markers
  var firePoints=[], parksPoints=[], policePoints=[], wifiPoints=[], communityPoints=[],
    fireMarkers=[], policeMarkers=[], wifiMarkers=[], parksMarkers=[], communityMarkers=[]
  //set up the icons for the markers
  var fireIcon = new L.Icon({iconUrl:'../images/firestation-color.png',
                            iconSize:[45,45]}),
      policeIcon = new L.Icon({iconUrl:'../images/policestation-color.png',
                              iconSize:[45,45]}),
      wifiIcon = new L.Icon({iconUrl:'../images/wifi-color.png',iconSize:[45,45]}),
      parksIcon = new L.Icon({iconUrl:'../images/park-color.png',iconSize:[45,45]}),
      communityIcon = new L.Icon({iconUrl:'../images/home-color.png',iconSize:[45,45]});

  //create the layer for the map from MapQuest
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo( map );

//Convert our JSON files into latitude longitude points in the "Points"
//variables
$.get('/datasets/community-centers-cleaned.json',function(data){
  data.forEach(function(loc){
    communityPoints.push([+loc.location[1],+loc.location[0]]);
  });
});
$.get('/datasets/firestation-cleaned.json',function(data){
  data.forEach(function(loc){
    firePoints.push([+loc.location[1],+loc.location[0]]);
  });
});
$.get('/datasets/police-cleaned.json',function(data){
  data.forEach(function(loc){
    policePoints.push([+loc.location[1],+loc.location[0]]);
  });
});
$.get('/datasets/hotspot-cleaned.json', function(data){
  data.forEach(function(loc){
    wifiPoints.push([+loc.location[1],+loc.location[0]]);
  });
});
$.get('/datasets/parks-cleaned.json',function(data){
  data.forEach(function(loc){
    parksPoints.push([+loc.location[0],+loc.location[1],loc.name]);
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
    case 'community':
      setMarkersFor(communityPoints,communityMarkers,communityIcon);
  }
  function setMarkersFor(points, markers, icon){
    //set markers makes the array of leaflet markers if
    //they do not exist
    if(!markers[0]){
      points.forEach(function(el){
        //for each point, make a new marker and push it into
        //the markers array
        var mark = L.marker(el.slice(0,2),{icon:icon});
        if(el[2]) {mark.bindPopup('<p>' + el[2] + '</p>');}
        markers.push(mark.addTo(map));
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
          el.closePopup();
      });
    }
  }
}

})();

$(window).resize(function() {$("#map").width($(".app-description").width()-250);});
