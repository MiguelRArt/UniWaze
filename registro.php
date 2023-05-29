<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LOGIN</title>
    <link rel="stylesheet" href="loginRegistroStyle.css">   
</head>

<?php
    include("login_registrar.php");
?>

<body class="container">    
    <form class="container" method="post">
        <h2>INICIAR SESIÓN</h2>           
        <input type="text" placeholder="Usuario" name="Usuario" required>
        <input type="password" placeholder="Contraseña" name="Password" required>
        <input type="submit" value="Iniciar Sesion" name="btnRegistrar">
        <a href="uniWaze.html">Regresar</a>
        <p>Si no tiene una cuenta, esta se creará automáticamente</p>
    </form>     
    
</body>
</html>