const profileUser=`
    <header class="navBar container">
        <div class="navItems container">
            <ion-icon name="filter-outline"></ion-icon>
            <ion-icon name="person-circle-outline"></ion-icon>
        </div>
    </header>
`

const fontMap = `
    <div id="demo" style="width: 100%; height: 100vh"></div>
`

const place = `
    <div class="place container">
        <div class="destino container" >
            <h2 class="title">¿A donde iremos hoy?"</h2>
            <input id="inputPlace1" class="inputPlace1" placeholder="Origen" required>
            <input id="inputPlace2" class="inputPlace2" placeholder="Destino" required>
        </div>
        <div class="btnsPlace container">
            <button id="btn1" class="btn blue">Generar Recorrido</button>
        </div>

    </div>
`

// Renderizar Codigo

function render(documentHTML, innerHTML){
    documentHTML.innerHTML += innerHTML;
}

render(document.querySelector("body"),profileUser);
render(document.querySelector("body"),fontMap);
render(document.querySelector("body"),place);

// Leaflet codigo
var map = L.map('demo').setView([4.752231, -74.097953], 5);
		
var mapLink =
'<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; ' + mapLink,
maxZoom: 18,
}).addTo(map);

document.getElementById("btn1").addEventListener("click",()=> {
    var contenido1 = document.getElementById('inputPlace1').value;
    var contenido2 = document.getElementById('inputPlace2').value;
  
    var geocoder1 = L.Control.Geocoder.nominatim();
    var geocoder2 = L.Control.Geocoder.nominatim();

    geocoder1.geocode(contenido1, function(results1) {
        var latlng1 = results1[0].center;
    
        geocoder2.geocode(contenido2, function(results2) {
            var latlng2 = results2[0].center;
    
            var routing = L.Routing.control({
            waypoints: [
                L.latLng(latlng1), 
                L.latLng(latlng2)  
            ],
            })
            routing.addTo(map);           
        });
    });
    map.setView(latlng, 13);
});