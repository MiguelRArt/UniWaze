<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     crossorigin=""/>

     <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
     integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
     crossorigin=""></script>

</head>
<body>
    <div id="map"></div>
        <form id="form" method="post">
            <h1>Reportar Peligro </h1>
            <a href="indexMain.php">Regresar</a>
            <input type="text" name="Nombre" placeholder="Nombre Del Lugar" required>
            <select name="Descripcion" id="Descripcion" required default="Seleccione">
                <option value=".">Seleccione una opción</option>
                <option value="Me han robado hace poco en esta zona">Me han robado hace poco en esta zona</option>
                <option value="Falta de presencia policial en la zona">Falta de presencia policial en la zona</option>
                <option value="Accidentes constantes en esta zona">Accidentes constantes en esta zona</option>
                <option value="Mala señalización vial">Mala señalización vial</option>
            </select>
            <input id="cords" type="text" name="Coordenadas" placeholder="Coordenadas" required >
            <input type="submit" name="register">
            
        </form>
        
    <?php
        include("registrar.php");
        include("mostrar.php");
    ?>
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
    <script src="app2.js"></script>
</body>
</html>