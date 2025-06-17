<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../Models/post.php';
require_once 'helpers.php';
require_once __DIR__ . '/../vendor/autoload.php';




use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $headers = getallheaders();
    $result = [];


    if (!isset($data['action'])) {
        http_response_code(400);
        echo json_encode(["error" => "No se especificó una acción"]);
        exit;
    }

    $jwt = getTokensHeader();
    if(!$jwt){
        http_response_code(401);
        echo json_encode(["error"=>"No hay Token"]);
        exit;
    }

    try{
        $decoded = JWT::decode($jwt, new Key($secretKey, "HS256"));
        $user_id = $decoded->data->id;
    }catch(Exception $e){
        http_response_code(401);
        echo json_encode(value: ["error" => "Token invalido"]);
        exit;
    }

    switch($data['action']){
        case "create_post":
            if(empty($data['text'])){
                http_response_code(400);
                $result = ["error" => "Texto de la publicación requerido"];
                break;
            }

            $result = POST::createPost($user_id,$data["text"],$conn);
            http_response_code($result['success'] ? 201 : 500);
            break;

        case "get_post":
            if (empty($data['post_id'])) {
            http_response_code(400);
            $result = ["error" => "Se requiere el ID del post"];
            break;
            }
            $result = Post::get_post($data['post_id'], $conn);
            http_response_code($result['success'] ? 200 : 404);
            break;

        case "getUserPost":
            //Indica que en la variable se va a guardar el id de usuario que se pidió o sino el del usuario logueado
            $user_profile_id = $data["user_id"] ?? $user_id;

            $result = Post::getUserPost($user_profile_id, $conn);
            http_response_code($result['success'] ? 200 : 404);
            break;

        case "getAllPost":
            $result = Post::getAllPost($conn);
            http_response_code($result['success'] ? 200 : 500);
            break;

        default:
            http_response_code(400);
            $result = ["error" => "Accion invalida"];
            break;
    }

    echo json_encode($result);

}

?>