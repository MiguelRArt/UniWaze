<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
            <input type="text" name="Nombre" placeholder="Nombre Del Lugar" required>            
            <select name="Descripcion">
                <option value="Me han robado hace poco en esta zona" selected>Me han robado hace poco en esta zona</option>
                <option value="Tramo de alta accidentalidad">Tramo de alta accidentalidad</option>
                <option value="Mala señalizacion vial">Mala señalizacion vial</option>
                <option value="Falta de presencial policial">Falta de presencial policial</option>
            </select>
            <input id="cords" type="text" name="Coordenadas" placeholder="Coordenadas" required >
            <input type="submit" name="register">           
        </form>     

        <a class="inicio" href="indexMain.php"><ion-icon name="person-circle-outline"></ion-icon></a>
    <?php
        include("registrar.php");
        include("mostrar.php");
    ?>

    
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
    <script src="app2.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>