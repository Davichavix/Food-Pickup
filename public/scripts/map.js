$(document).ready(() => {
 // Initialize and add the map
 initMap()

});

function initMap() {
  // The location of Uluru
  const uluru = { lat: 49.281290, lng: -123.114670 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
