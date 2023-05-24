let cords= document.getElementById('cords');

var markerAdded = false;
map.getContainer().style.cursor = 'crosshair';

let formulario = document.getElementById("form");

//CoordsButton
var destinyMarker = L.marker([0, 0]);

map.on('click',function (e) {
      destinyMarker.remove();
      destinyMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      cords.setAttribute("value", destinyMarker.getLatLng().lat + "," + destinyMarker.getLatLng().lng);
});

