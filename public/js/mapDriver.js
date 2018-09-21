let map, infoWindow;

function getBar(lat, lng) {
  return axios
    .post("/api", {
      lat: lat,
      lng: lng
    })
    .then(res => {
      return res.data;
    });
}

function initMap() {
  const coordinates = document.getElementById("coor").innerHTML.split(";");
  const bar = new google.maps.LatLng(coordinates[0], coordinates[1]);
  // { lat: 33.9578826, lng: -83.3746134 }
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.9578826, lng: -83.3746134 },
    zoom: 17
  });

  infoWindow = new google.maps.InfoWindow();
  let pos;
  navigator.geolocation.getCurrentPosition(
    function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      getBar(pos.lat, pos.lng)
        .then(bar => {
          infoWindow.setPosition(bar);
          infoWindow.setContent(
            `${document.getElementById("bar").innerHTML}\n${
              document.getElementById("address").innerHTML
            }`
          );
          infoWindow.open(map);
          map.setCenter(pos);
        })
        .catch(err => console.log("Shit Happened"));
    },
    err => {
      console.log("Errors happen");
    }
  );
}
