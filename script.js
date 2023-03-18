/**
@description Variable que contiene una cadena de texto que representa el código HTML del encabezado del perfil de un usuario
@type {string}
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
@description Variable que contiene una cadena de texto que representa el código HTML de un elemento para ocultar la barra de navegación
@type {string}
*/
const hideNav = `
    <div id="settings" class="settings">           
    </div>
`


/**
@description Variable que contiene una cadena de texto que representa el código HTML de un elemento para mostrar un mapa de Leaflet.
@type {string}
*/
const fontMap = `
    <div id="demo" style="width: 100%; height: 100vh"></div>
`


/**
@description Variable que contiene una cadena de texto que representa el código HTML de un formulario y botones de ubicacion para ingresar un lugar de origen y destino y generar una ruta en el mapa trazado anteriormente.
@type {string}
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


/**
@description Función que recibe una referencia al objeto del documento HTML y una cadena de texto con código HTML para agregarlo al final del cuerpo del documento
@param {HTMLElement} documentHTML - Referencia al objeto del documento HTML
@param {string} innerHTML - Cadena de texto con código HTML a agregar
@returns {void}
*/
function render(documentHTML, innerHTML){
    documentHTML.innerHTML += innerHTML;
}
// Ejemplos de uso de la función render para agregar diferentes elementos HTML al final del cuerpo del documento
render(document.querySelector("body"),profileUser);
render(document.querySelector("body"),hideNav);
render(document.querySelector("body"),fontMap);
render(document.querySelector("body"),place);


/**   
@description Llamado a la función getPos().
*/
getPos();


/**
@description Variable que crea un objeto de mapa Leaflet con un identificador "demo" y una vista inicial centrada en Las coordenadas especificadas.
@type {L.Map}
*/
var map = L.map('demo').setView([4.752231, -74.097953], 5);


/**
@description Variable que crea un objeto de capa Leaflet para el mapa base de OpenStreetMap y lo agrega al mapa anterior.
@type {L.TileLayer}
*/
var mapLink =
'<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; ' + mapLink,
maxZoom: 18,
}).addTo(map);


/**
@description Agrega un evento de click al botón "Generar Recorrido" que realiza una búsqueda de rutas de Leaflet Routing Machine según las entradas de origen y destino proporcionadas por el usuario. Si el campo de entrada de origen está vacío, se utiliza la ubicación actual del usuario como origen.
@param {function} callback - La función que se ejecutará cuando se produzca el evento click
*/
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


/**
@description Variables Globales, trazado de rutas con puntos de via y posicion actual.
@type {Object}
*/
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

/**
@description Agrega un evento de click al botón de origen para activar el estado de origen.
@event
@param {Function} originActive - Función que activa el estado de origen.
@returns {void}
*/
originBtn.addEventListener('click', originActive);

/**
@description Agrega un evento de click al botón de destino para activar el estado de destino.
@event
@param {Function} DestinyActive - Función que activa el estado de destino.
@returns {void}
*/
destinyBtn.addEventListener('click', DestinyActive);

/**
@description Agrega un evento de click al botón para limpiar el mapa.
@event
@param {Function} clearMap - Función que limpia el mapa.
@returns {void}
*/
finalizeBtn.addEventListener('click', clearMap);

/**
@description Agrega un evento de click al botón de posición actual para activar el estado de la posición actual.
@event
@param {Function} currentPosActive - Función que activa el estado de la posición actual.
@returns {void}
*/
currentPosBtn.addEventListener('click', currentPosActive);



/**
@description Marcador en el mapa para el punto de origen.
@type {Object}
*/
var originMarker = L.marker([0, 0]);//4.650, -74.172

/**
@description Marcador en el mapa para el punto de destino.
@type {Object}
*/
var destinyMarker = L.marker([0, 0]);

/**
@description Variable para el objeto de geocodificación del punto de origen.
@type {Object}
*/
var geocoder1

/**
@description Variable para el objeto de geocodificación del punto de destino.
@type {Object}
*/
var geocoder2


/**
@description Escucha el evento 'click' del mapa y actualiza el marcador correspondiente (de origen o de destino) en consecuencia. Si no se ha seleccionado un tipo de punto (origen o destino) se muestra una alerta.
@param {Object} e - Evento click del mapa
@returns {void}
*/
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


/**
@description Establece el estado de la posición actual como activo y actualiza otros indicadores de estado en consecuencia.
Si la latitud del usuario es nula o no definida, llama a la función getPos() para obtener la posición actual.
También actualiza el marcador de origen en el mapa.
@function
@name currentPosActive
@returns {void}
*/
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


/**
@description Establece el estado de origen como activo y actualiza otros indicadores de estado en consecuencia.
@function
@name originActive
@returns {void}
*/
function originActive() {
    isOrigin = true;
    isCurrentPos = false;
    isDestiny = false;
}     


/**
@description Establece el estado de destino como activo y actualiza otros indicadores de estado en consecuencia.
@function
@name DestinyActive
@returns {void}
*/
function DestinyActive() {
    isDestiny = true;
    isCurrentPos = false;
    isOrigin = false;
}


/**
@description Restaura la vista del mapa centrada en la ubicación del usuario si esta información está disponible, o en una ubicación predeterminada en caso contrario.
@function
@name restoreView
@returns {void}
*/
function restoreView() {
    if (userLat == null || userLat == undefined) {
        map.setView([4.650, -74.172], 16);
        return;
    }
    map.setView([userLat, userLng], 16);
}


/**
@description Elimina todos los elementos agregados al mapa, restaura la vista y limpia los campos de entrada de origen y destino.
@function
@name clearMap
@returns {void}
*/
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


/**
@description Función que obtiene la posición actual del usuario utilizando la API geolocation del navegador
@function
@name getPos
@returns {void}
*/
function getPos() {
    navigator.geolocation.getCurrentPosition((position) => {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
        restoreView();
    });
}
