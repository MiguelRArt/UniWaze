/**
 * Representa una sección de encabezado que incluye un botón y un icono de usuario.
 *
 */
const profileUser = `
    <header class="navBar container">
        <div class="navItems container">
            <button id="navBarButton" class="navBarButton container"><ion-icon name="filter-outline"></ion-icon></button>
            <ion-icon name="person-circle-outline"></ion-icon>
        </div>
    </header>
`

/**
 * Representa un elemento HTML que se utiliza para la navegación del usuario.
 *
 */
const hideNav = `
    <div id="settings" class="settings"> 
        
    </div>
`

/**
 * Representa un elemento HTML que se utiliza para contener el futuro mapa de LeafLet.
 *
 */

const fontMap = `
    <div id="demo" style="width: 100%; height: 100vh"></div>
`

/**
 * Representa un elemento HTML que se utiliza para mostrar un formulario para planificar un recorrido que el usuario quiera realizar.
 *
 */

const place = `
    <div class="place container">
        <div class="destino container" >
            <h2 class="title">¿A donde iremos hoy?</h2>
            <div class="OriginPlace">   
                <div class="originButtons">
                    <input id="inputPlace1" class="inputPlace1" placeholder="Origen" required>
                    <button id="current-pos" class="waypointBtn"><i class="fa-solid fa-location-crosshairs"></i></button>
                    <button id="origin" class="waypointBtn"><i class="fa-solid fa-location-arrow"></i></button>
                </div>
	        </div>

            <div class="DestinyPlace">
                <div class="destinyButtons">
                    <input id="inputPlace2" class="inputPlace2" placeholder="Destino" required>
                    <button id="destiny" class="waypointBtn1"><i class="fa-solid fa-location-arrow"></i></button>
                </div>
	        </div>

        </div>

        <div class="btnsPlace container">
            <button id="btn1" class="btn blue">Generar Recorrido</button>
            <button id="finalize-route" class="btn red">Finalize route</button>
        </div>

    </div>
`



// Renderizar Codigo

function render(documentHTML, innerHTML){
    documentHTML.innerHTML += innerHTML;
}
render(document.querySelector("body"),profileUser);
render(document.querySelector("body"),hideNav);
render(document.querySelector("body"),fontMap);
render(document.querySelector("body"),place);

getPos();

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
    if ($('#inputPlace1').val().length == 0) {
        actualRoute = L.Routing.control({
            waypoints: [
                L.latLng(originMarker.getLatLng()),
                L.latLng(destinyMarker.getLatLng())
            ]
        }).addTo(map);
      } else {
        geocoder1 = L.Control.Geocoder.nominatim();
        geocoder2 = L.Control.Geocoder.nominatim();
    
        geocoder1.geocode(contenido1, function(results1) {
            latlng1 = L.marker(results1[0].center).addTo(map);
        
            geocoder2.geocode(contenido2, function(results2) {
                latlng2 = L.marker(results2[0].center).addTo(map);
        
                actualRoute = L.Routing.control({
                    waypoints: [
                        L.latLng(latlng1.getLatLng()),
                        L.latLng(latlng2.getLatLng())
                    ]
                }).addTo(map);         
            });
        });
        map.setView(latlng, 13);
      }
});


// Route tracing with waypoints and actual position
// Global variables
var finalizeBtn = document.getElementById('finalize-route');
var currentPosBtn = document.getElementById('current-pos');
var destinyBtn = document.getElementById('destiny');
var originBtn = document.getElementById('origin');
var isCurrentPos = false;
var isOrigin = false;
var isDestiny = false;
var latlng1= L.marker([0, 0]);
var latlng2 = L.marker([0, 0]);
var userLat;
var userLng;
var map;

// Events
originBtn.addEventListener('click', originActive);
destinyBtn.addEventListener('click', DestinyActive);
finalizeBtn.addEventListener('click', clearMap);
currentPosBtn.addEventListener('click', currentPosActive);

// Add main marker - optional, is just a reference
var originMarker = L.marker([0, 0]);//4.650, -74.172
var destinyMarker = L.marker([0, 0]);
var geocoder1
var geocoder2

// Technical functions
map.on('click',function (e) {
    if (isOrigin) {
        originMarker.remove();
        originMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    }else if (isDestiny) {
        destinyMarker.remove();
        destinyMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    }else {
        alert('Por favor seleccione qué tipo de punto está escogiendo (Origen o destino)');
    }
});

function currentPosActive() {
    if (userLat == null || userLat == undefined) {
        getPos();
    }
    isCurrentPos = true;
    isOrigin = false;
    isDestiny = false;
    originMarker.remove();
    originMarker = L.marker([userLat, userLng]).addTo(map);
} 
function originActive() {
    isOrigin = true;
    isCurrentPos = false;
    isDestiny = false;
  }     
  function DestinyActive() {
    isDestiny = true;
    isCurrentPos = false;
    isOrigin = false;
  }

function restoreView() {
    if (userLat == null || userLat == undefined) {
        map.setView([4.650, -74.172], 16);
        return;
    }
    map.setView([userLat, userLng], 16);
}
function clearMap() {
    latlng1.remove();
    latlng2.remove();
    originMarker.remove();
    destinyMarker.remove();
    restoreView();
    actualRoute.remove();
    document.getElementById("inputPlace1").value="";
    document.getElementById("inputPlace2").value="";
}

function getPos() {
    navigator.geolocation.getCurrentPosition((position) => {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
        restoreView();
    });
}
