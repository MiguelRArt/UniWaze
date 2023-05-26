<?php
include("con_db.php");

if(isset($_POST['btnRegistrar'])){
    if(strlen($_POST['Usuario']) >= 1 && strlen($_POST['Password']) >= 1) {
        $usuario = trim($_POST['Usuario']);
        $pass = trim($_POST['Password']);        
        $consulta = "INSERT INTO usuarios(usuario, password) VALUES ('$usuario','$pass')";

        $resultado = mysqli_query($conex,$consulta);

        if ($resultado) {
            ?> 
            <script>
                alert('Registro Exitoso');
                location.href = 'indexMain.php'
            </script>"
            <?php
        } else {
            ?>  
            <script>
                alert('Ups. Ha ocurrido un error!');
                location.href = '../registro.php'
            </script>"
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