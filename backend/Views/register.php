<?php 
require '../Controllers/userController.php';
?>

<form method="POST">
    <input type="text" name="name" placeholder="Nombre" required>
    <input type="email" name="email" placeholder="Correo electronico" required>
    <input type="password" name="password" placeholder="Contraseña" required>
    <input type="text" name="member_num" placeholder="Tú número de miembro" required>
    <button type="submit">Registrarse</button>
</form>