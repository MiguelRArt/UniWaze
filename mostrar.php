<?php
$inc = include("con_db.php");
?>

<script>
    var map = L.map('map').setView([4.69841878937995,-74.09008026123048], 12);

    // var oms = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // })
    // oms.addTo(map);

    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    googleStreets.addTo(map);

    
</script>

<?php
if($inc){
    $consulta = "SELECT * FROM datos";
    $resultado = mysqli_query($conex,$consulta);

    if($resultado){
        while($row = $resultado->fetch_array()){
            $id = $row['id'];
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
            
                <div class="tableContent">                                         
                    <table class="default">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Coordenadas</th>
                    </tr>
                    <tr>
                        <td><?php echo $nombre?></td>
                        <td><?php echo $descripcion?></td>
                        <td><?php echo $coordenadas?></td>                        
                    </tr>
                    </table>                        
                
                </div>
            <?php
        }
    }
}

?>