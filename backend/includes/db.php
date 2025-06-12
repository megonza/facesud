<?php 
#Coneion a la db
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'face_sud';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e){
    die("Error de conexión: " . $e->getMessage());
}

?>