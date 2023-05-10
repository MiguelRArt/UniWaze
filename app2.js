
let cords= document.getElementById('cords');

var markerAdded = false;
map.getContainer().style.cursor = 'crosshair';

// map.on('click', function(e) { 
//   if(!markerAdded) { 
//     var marker = L.marker(e.latlng).addTo(map);  
//     markerAdded = true;
//     cords.setAttribute("value", marker.getLatLng().lat + "," + marker.getLatLng().lng);
//     map.getContainer().style.cursor = '';
//   } 
// });

let formulario = document.getElementById("form");

//CoordsButton
var destinyMarker = L.marker([0, 0]);

map.on('click',function (e) {
      destinyMarker.remove();
      destinyMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      cords.setAttribute("value", destinyMarker.getLatLng().lat + "," + destinyMarker.getLatLng().lng);
});