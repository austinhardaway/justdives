let map;

function initMap() {
  const coordinates = document.getElementById("coor").innerHTML.split(";");
  const bar = new google.maps.LatLng(coordinates[0], coordinates[1]);
  // { lat: 33.9578826, lng: -83.3746134 }
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.9578826, lng: -83.3746134 },
    zoom: 17
  });
  const marker = new google.maps.Marker({ posiiton: bar, map: map });
}
