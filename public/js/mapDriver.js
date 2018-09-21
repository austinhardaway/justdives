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
  infoWindow = new google.maps.InfoWindow();
  let pos;
  navigator.geolocation.getCurrentPosition(
    position => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 17
      });

      getBar(pos.lat, pos.lng)
        .then(bar => {
          console.log(bar);
          infoWindow.setPosition({ lat: bar.lat, lng: bar.lng });
          infoWindow.setContent(`${bar.bar}`);
          infoWindow.open(map);
        })
        .catch(err => console.log("Shit Happened"));
    },
    err => {
      console.log("Errors happen");
    }
  );
}
