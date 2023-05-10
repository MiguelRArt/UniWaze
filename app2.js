let cords= document.getElementById('cords');

var markerAdded = false;
map.getContainer().style.cursor = 'crosshair';

map.on('click', function(e) { 
  if(!markerAdded) { 
    var marker = L.marker(e.latlng).addTo(map);  
    markerAdded = true;
    cords.setAttribute("value", marker.getLatLng().lat + "," + marker.getLatLng().lng);
    map.getContainer().style.cursor = '';
  } 
});

let formulario = document.getElementById("form");

document.getElementById("anzother").addEventListener("click", ()=>{
  console.log("hola");
})

