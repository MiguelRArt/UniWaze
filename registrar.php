<?php
include("con_db.php");

if(isset($_POST['register'])){
    if(strlen($_POST['Nombre']) >= 1 && strlen($_POST['Descripcion']) >= 1) {
        $nombre = trim($_POST['Nombre']);
        $descripcion = trim($_POST['Descripcion']);
        $coordenadas = trim($_POST['Coordenadas']);
        $consulta = "INSERT INTO datos(nombre, descripcion, coordenadas) VALUES ('$nombre','$descripcion',' $coordenadas')";

        $resultado = mysqli_query($conex,$consulta);

        if ($resultado) {
            ?> 
            <h3 class="ok">¡Datos Guardados Correctamente!</h3>
            <?php
        } else {
            ?>  
            <h3 class="bad">¡Ups ha ocurrido un error!</h3>
            <?php
        }
    }else{
        ?> 
        <h3 class="bad">¡Por favor complete los campos!</h3>
        <?php
    }
}
?>

<script>
    console.log(<?php echo $nombre?>);
</script>