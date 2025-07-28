<?php 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

#Importo DB
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../Models/user.php';
require_once __DIR__ . '/../vendor/autoload.php'; 
require 'helpers.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;


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
                $required_fields = ['name', 'email', 'password',"confirmPassword", 'member_num'];
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
                //Verifico la contraseña segura
                $safe_pass = safe_password($data['password']);
                if ($safe_pass !== true){
                    http_response_code(400);
                    $result = ['error' => "La contraseña no es segura: $safe_pass"];
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
                
                if(!isset($user['error'])){
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
                        'user' => $user['user']
                    ]);
                    exit;
                }else {
                    $result = ["message" => "Credenciales incorrectas"];
                    http_response_code(401);
                    //exit;
                }
                break;
                
            case 'profile':
                $jwt = getTokensHeader();
                if(!$jwt){
                    http_response_code(400);
                    $result = ["success" => false, "message" => "Token no proporcionado"];
                    break;
                }
                try{
                    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
                    $id = $decoded->data->id;

                    $result = $userModel->getUserByID($id, $conn);

                    http_response_code($result['success'] ? 200 : 404);
                } catch (Exception $e){
                        http_response_code(401);
                        $result = ["success" => false, "message" => "Token inválido o expirado". $e->getMessage()];
                }
                break;

            case 'get_user_profile':
                if(!isset($data['target_user_id'])){
                    http_response_code(400);
                    $result = ['success' => false, 'message' => 'Falta el ID del usuario a buscar'];
                    break;
                }

                $result = $userModel->getUserByID($data['target_user_id'], $conn);
                http_response_code($result['success'] ? 200 : 404);
                break;

            case 'edit_profile':
                $jwt = getTokensHeader();
                if(!$jwt){
                    http_response_code(401);
                    $result =["error" => "No se proporcionó el token"];
                    break;
                }

                try{
                    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
                    $user_id = $decoded->data->id;
                }catch(Exception $e){
                    http_response_code(401);
                    $result = ["error" => "Token inválido"];
                    break;
                }

                //validacion de datos
                if(empty($data['name']) || !isset($data['hierarchy'])){
                    http_response_code(400);
                    $result = ["error" => "Nombre y jerarquía son requeridos"];
                    break;
                }

                $name = trim($data['name']);
                $hierarchy = trim($data['hierarchy']);

                $result = User::editProfile($user_id, $name, $hierarchy, $conn);
                http_response_code($result['success'] ? 200:400);
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
