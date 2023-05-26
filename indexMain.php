<!DOCTYPE html>
<html>
<head>
<title>Simple Leaflet Map</title>
<meta charset="utf-8" />

<!-- Leaflet CSS/js -->
<link rel="stylesheet" type="text/css" href="lib/leaflet/leaflet.css">
<link rel="stylesheet" type="text/css" href="leaflet-routing-machine.css">
<link rel="stylesheet" href="user.css">
<link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
<!-- Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
</head>
	
<body>
	
	<!-- Leaflet Resources -->
	<script type="text/javascript" src="lib/leaflet/leaflet.js"></script>
	<script type="text/javascript" src="leaflet-routing-machine.js"></script>

	<!-- ionicons JS -->
	<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
	<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

	<!-- Searcher -->
	<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>

	<?php
        include("registrar.php");
    ?>

	
	<!-- JS Vanille -->
	<script src="script.js"></script>
	

	<?php
        $inc = include("con_db.php");
    ?>


<?php
if($inc){
    $consulta = "SELECT DISTINCT nombre, descripcion, coordenadas FROM datos";
    $resultado = mysqli_query($conex,$consulta);

    if($resultado){
        while($row = $resultado->fetch_array()){
            //$id = $row['id'];
            $nombre = $row['nombre'];
            $descripcion = $row['descripcion'];
            $coordenadas = $row['coordenadas'];                         
            ?>  

            <script>                   
                var circle = L.circle([<?php echo $coordenadas ?>], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.2,
                    radius: 500
                }).addTo(map);  
                circle.bindPopup("<label>Nombre: <?php echo $nombre ?></label><br><label>Descripcion: <?php echo $descripcion ?></label><br><label>Coordenadas: <?php echo $coordenadas ?></label> ");
            </script>
            
                
            <?php
        }
    }
}

?>


</body>