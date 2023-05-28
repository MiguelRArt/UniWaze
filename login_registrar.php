<?php
include("con_db.php");
if(isset($_POST['btnRegistrar'])){
    if(strlen($_POST['Usuario']) >= 1 && strlen($_POST['Password']) >= 1) {
        $usuario = trim($_POST['Usuario']);
        $pass = trim($_POST['Password']);        
        $consulta = "SELECT * FROM usuarios WHERE (usuario = '$usuario' AND password = '$pass');";
        
        
        $resultado = mysqli_query($conex,$consulta);
        $num_filas = mysqli_num_rows($resultado);
        
        
        
        if ($num_filas > 0) {
            SESSION_START();
            $fila = mysqli_fetch_assoc($resultado);
            $_SESSION['fila'] = $fila;
            //location.href = 'indexMain.php'
            header('location: indexMain.php');
            exit;
        }else {
            $consulta = "INSERT INTO usuarios(usuario, password) VALUES ('$usuario','$pass');";
            $resultado = mysqli_query($conex,$consulta);
            ?>
             <script>
             alert('Por favor confirma tus credenciales! :D');
             location.href = '../registro.php'
            </script>"
            <?php
        }
    }
}
?>

<script>
    console.log(<?php echo $nombre?>);
</script>