'use strict'

const datasets = [
  {
    icon: 'community',
    markers: [],
    name: 'Community',
    url: '/datasets/community-centers-cleaned.json',
    // You're different ✨
    superSpecial: true
  },
  {
    icon: 'fire-station',
    markers: [],
    index: 13,
    name: 'Fire Station',
    url: 'https://data.nashville.gov/api/views/frq9-a5iv/rows.json'
  },
  {
    icon: 'police-station',
    markers: [],
    index: 17,
    name: 'Police Station',
    url: 'https://data.nashville.gov/api/views/y5ik-ut5s/rows.json'
  },
  {
    icon: 'wifi',
    markers: [],
    index: 11,
    name: 'WiFi',
    url: 'https://data.nashville.gov/api/views/4ugp-s85t/rows.json'
  },
  {
    icon: 'parks',
    markers: [],
    index: 42,
    name: 'Parks',
    url: 'https://data.nashville.gov/api/views/74d7-b74t/rows.json'
  }
]

function processJSON(data, locationKey) {
  return data.data.map(function(el) {
    var lat = el[locationKey][1]
    var long = el[locationKey][2]
    var location = ['', '']
    if (lat !== null && long !== null) {
      return [long, lat]
    }
    return location
  })
}

function setMarkersFor(map, points, markers, icon) {
  // set markers makes the array of leaflet markers if
  // they do not exist
  if (!markers[0]) {
    points.forEach(function(el) {
      // for each point, make a new marker and push it into
      // the markers array
      var mark = L.marker(el.slice(0, 2), { icon: icon })
      if (el[2]) {
        mark.bindPopup('<p>' + el[2] + '</p>')
      }
      markers.push(mark.addTo(map))
    })
  } else {
    // if they already exist, then toggle the opacity to show or
    // hide the markers
    markers.forEach(el => {
      if (el.options.opacity === 0) {
        el.setOpacity(1)
      }
      else {
        el.setOpacity(0)
      }
      el.closePopup()
    })
  }
}

$(document).ready(function() {
  /*
    The boundaries for Nashville are
    upper-left: [35.9758, -86.9815]
    lower-right: [36.3350, -86.4542]
    This center and zoom doesn't capture the entire box, but includes
    all of the points in our datasets without a lot of blank space.
  */
  const map = L.map('map').setView(
    // center and zoom
    [36.165818, -86.784245],
    12
  )

  //create the layer for the map from MapQuest
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo( map )

  const toggleList = document.getElementById('data-toggles')
  datasets.forEach(dataset => {
    let li = document.createElement('li')
    // e.g. "Fire Station" to "fire-station"
    let id = dataset.name.toLowerCase().split(' ').join('-')
    li.innerHTML = `
      <input type="checkbox" disabled id=${id} name="${id}" class="switch"/>
      <label for="${id}">${dataset.name}</label>
    `
    toggleList.appendChild(li)
    // Retreive data
    let icon = new L.Icon({
      iconUrl: `../images/icons/${dataset.icon}.png`,
      iconSize: [45, 45]
    })

    $.get(dataset.url, data => {
      if (dataset.superSpecial) {
        data = data.map(item => [item.location[0], item.location[1]])
      } else {
        data = processJSON(data, dataset.index)
      }
      let points = data.map(item => [item[1], item[0]])
      let input = $(li.children[0])
      input.click(() => setMarkersFor(map, points, dataset.markers, icon))
      input.prop('disabled', false)
    })
  })

  $(window).resize(function() {
    $('#map').width($('.app-description').width() - 250)
  })
})
