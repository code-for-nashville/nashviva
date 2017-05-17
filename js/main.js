(function() {
  "use strict";
  $(document).ready(initialize);

  function initialize() {}

  var datasetButtons = [
    "#fire-station",
    "#police-station",
    "#wifi",
    "#parks",
    "#community"
  ];

  datasetButtons.forEach(function(dataset) {
    $(dataset).click(function() {
      //add toggle for showing icons on map
      toggleIcon($(this).attr("id"));
    });
  });

  /*
  The boundaries for Nashville are
  upper-left: [35.9758, -86.9815]
  lower-right: [36.3350, -86.4542]

  This center and zoom doesn't capture the entire box, but includes
  all of the points in our datasets without a lot of blank space.
*/
  var map = L.map("map").setView(
    // center and zoom
    [36.165818, -86.784245],
    12
  );

  //varables for the map. points are latitude and longitude points
  //markers are leaflet markers
  var firePoints = [],
    parksPoints = [],
    policePoints = [],
    wifiPoints = [],
    communityPoints = [],
    fireMarkers = [],
    policeMarkers = [],
    wifiMarkers = [],
    parksMarkers = [],
    communityMarkers = [];
  //set up the icons for the markers
  var fireIcon = new L.Icon({
    iconUrl: "../images/firestation-color.png",
    iconSize: [45, 45]
  }),
    policeIcon = new L.Icon({
      iconUrl: "../images/policestation-color.png",
      iconSize: [45, 45]
    }),
    wifiIcon = new L.Icon({
      iconUrl: "../images/wifi-color.png",
      iconSize: [45, 45]
    }),
    parksIcon = new L.Icon({
      iconUrl: "../images/park-color.png",
      iconSize: [45, 45]
    }),
    communityIcon = new L.Icon({
      iconUrl: "../images/home-color.png",
      iconSize: [45, 45]
    });

  //create the layer for the map from MapQuest
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  function processJSON(data, locationKey) {
    return data.data.map(function(el) {
      var lat = el[locationKey][1];
      var long = el[locationKey][2];
      var location = ["", ""];
      if (lat !== null && long !== null) {
        return [long, lat];
      }
      return location;
    });
  }

  //Convert our JSON files into latitude longitude points in the "Points"
  //variables
  //   fire: getJson.bind(null, 'https://data.nashville.gov/api/views/frq9-a5iv/rows.json'),
  //   parks: getJson.bind(null, 'https://data.nashville.gov/api/views/74d7-b74t/rows.json'),
  //   hotspots: getJson.bind(null, 'https://data.nashville.gov/api/views/4ugp-s85t/rows.json'),
  //   community : getJson.bind(null, 'datasets/community-centers-cleaned.json'),
  //   police: getJson.bind(null, 'https://data.nashville.gov/api/views/y5ik-ut5s/rows.json')
  // case "fire":
  //                               markPoints = processJSON(data, 13, 9);
  //                               break;
  //                           case "police":
  //                               markPoints = processJSON(data, 16, 8);
  //                               break;
  //                           case "parks":
  //                               markPoints = processJSON(data, 41, 8);
  //                               break;
  //                           case "hotspots":
  //                               markPoints = processJSON(data, 11, 8);
  //                               break;
  var markPoints;
  $.get("/datasets/community-centers-cleaned.json", function(data) {
    data.forEach(function(loc) {
      communityPoints.push([loc.location[1], loc.location[0]]);
    });
  });
  $.get("https://data.nashville.gov/api/views/frq9-a5iv/rows.json", function(
    data
  ) {
    markPoints = processJSON(data, 13);
    markPoints.forEach(function(loc) {
      firePoints.push([loc[1], loc[0]]);
    });
  });
  $.get("https://data.nashville.gov/api/views/y5ik-ut5s/rows.json", function(
    data
  ) {
    markPoints = processJSON(data, 17);
    markPoints.forEach(function(loc) {
      policePoints.push([loc[1], loc[0]]);
    });
  });
  $.get("https://data.nashville.gov/api/views/4ugp-s85t/rows.json", function(
    data
  ) {
    markPoints = processJSON(data, 11);
    markPoints.forEach(function(loc) {
      wifiPoints.push([loc[1], loc[0]]);
    });
  });
  $.get("https://data.nashville.gov/api/views/74d7-b74t/rows.json", function(
    data
  ) {
    console.log({ data });
    markPoints = processJSON(data, 42);
    console.log(markPoints);
    markPoints.forEach(function(loc) {
      parksPoints.push([loc[1], loc[0]]);
    });
    console.log({ parksPoints });
  });

  function toggleIcon(type) {
    //toggleIcon takes the type of markers we want to toggle
    //and creates the markers if they don't exist and toggles
    //whether they are showing or not
    switch (type) {
      case "fire-station":
        setMarkersFor(firePoints, fireMarkers, fireIcon);
        break;
      case "police-station":
        setMarkersFor(policePoints, policeMarkers, policeIcon);
        break;
      case "wifi":
        setMarkersFor(wifiPoints, wifiMarkers, wifiIcon);
        break;
      case "parks":
        setMarkersFor(parksPoints, parksMarkers, parksIcon);
        break;
      case "community":
        console.log({ communityPoints });
        setMarkersFor(communityPoints, communityMarkers, communityIcon);
    }
    function setMarkersFor(points, markers, icon) {
      //set markers makes the array of leaflet markers if
      //they do not exist
      if (!markers[0]) {
        points.forEach(function(el) {
          //for each point, make a new marker and push it into
          //the markers array
          var mark = L.marker(el.slice(0, 2), { icon: icon });
          if (el[2]) {
            mark.bindPopup("<p>" + el[2] + "</p>");
          }
          markers.push(mark.addTo(map));
        });
      } else {
        //if they already exist, then toggle the opacity to show or
        //hide the markers
        markers.forEach(function(el) {
          if (el.options.opacity === 0) el.setOpacity(1);
          else el.setOpacity(0);
          el.closePopup();
        });
      }
    }
  }
})();

$(window).resize(function() {
  $("#map").width($(".app-description").width() - 250);
});
