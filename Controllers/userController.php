<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
#Importo DB
require_once __DIR__ . '../includes/db.php';
require_once '../Models/user.php';



#userController.php version API REST papaaa
$method = $_SERVER['REQUEST_METHOD'];
//Crea el objeto User
$userModel = new User($conn);

if ($method =="POST"){

    //decodifico el json que veiene del react
    $data = json_decode(file_get_contents('php://input'), true);

    //verifico que los datos no esten vacios
    if (!$data || !isset($data['name'],$data['email'],$data['password'],$data['member_num'])){

            //En caso de estar vacio responde:
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]) ;
            exit;
    }

    //si la clave 'action' del cuerpo del json tiene algo entonces: 
    elseif (isset($data['action'])) {
        //Aca dependiendo del action del cuerpo va a traer las distintas funciones de user.php
        switch($data['action']){
            case 'register':
                $result = $userModel->register(
                    $data['name'],
                   $data['email'],
                $data['password'],
              $data['member_num']);
                break;

            default:
                http_response_code(400);
                $result = ["error" => "Acción no válida"];
                break;
        }
        //Devuelvo el resultado en formato json
        echo json_encode($result);
    }else {
        http_response_code(400);
        echo json_encode(["error" => "No se especificó una acción"]);
    }
}
?> 
