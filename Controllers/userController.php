<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
#Importo DB
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../Models/user.php';
require_once __DIR__ . '/../vendor/autoload.php'; 
require 'helpers.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$secretKey = "contraseña"; 
$expirationTime = time() + 3600; // 1 hora

#userController.php version API REST papaaa
$method = $_SERVER['REQUEST_METHOD'];
//Crea el objeto User
$userModel = new User($conn);

if ($method =="POST"){

    //decodifico el json que veiene del react
    $data = json_decode(file_get_contents('php://input'), true);



    //si la clave 'action' del cuerpo del json tiene algo entonces: 
    if (isset($data['action'])) {

        //Segun el action: Trae de user.php
        switch($data['action']){
            case 'register':

                //verifico que los datos no esten vacios
                $required_fields = ['name', 'email', 'password', 'member_num'];
                if(!required_fields($data, $required_fields)){
                    http_response_code(400);
                    $result = ["error" => "Datos incompletos"];
                    break;
                }

                //Verifico que las contraseñas coincidan
                if(!validate_password($data['password'], $data['confirmPassword'])){
                    http_response_code(400);
                    $result = ['error' => 'Las contraseñas no coinciden.'];
                    break;
                }

                $result = $userModel->register(
                    $data['name'],
                   $data['email'],
                $data['password'],
              $data['member_num']);
                http_response_code(isset($result['success']) ? 201 : 400); // 201 = creado
                #echo json_encode($result);
                break;

            //Caso login
            case 'login':

                //Verificar que los campos esten completos
                $required_fields = ['email', 'password'];
                if(!required_fields($data, $required_fields)){
                    http_response_code(400);
                    $result = ["error" => "Datos incompletos"];
                    break;
                }
    
                $user = $userModel->login($data['email'], $data['password']);
                
                if($user){
                    $payload =[
                        'iat' => time(),
                        'exp' => $expirationTime,
                        'data' => [
                            'id' => $user['user']['user_id'],
                            'email' => $user['user']['email'],
                            'name' => $user['user']['name']
                        ]

                    ];
                    $jwt = JWT::encode($payload, $secretKey, 'HS256');
                    http_response_code(200);
                    echo json_encode([
                        'message' => 'Login exitoso',
                        'token' => $jwt,
                        'user' => $user
                    ]);
                    exit;
                }else {
                    $result = ["message" => "Credenciales incorrectas"];
                    http_response_code(401);
                    //exit;
                }
            break;
            default:
                http_response_code(400);
                $result = ["error" => "Acción no válida"];
                break;
    }
    if (isset($result)) {
        echo json_encode($result);
    }
}else {
        http_response_code(400);
        echo json_encode(["error" => "No se especificó una acción"]);
        exit;
    }
}
?> 
