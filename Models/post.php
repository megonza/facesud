<?php 
class Post {
    //Crear posts
    public static function createPost($user_id, $text, $conn) {
        try {
            if (trim($text) === '') {
                return [
                    "success" => false,
                    "message" => "El contenido del post no puede estar vacío"
                ];
            }

            $stmt = $conn->prepare("INSERT INTO posts (user_id, text) VALUES (?, ?)");
            $stmt->execute([$user_id, $text]);

            return [
                "success" => true,
                "message" => "Post creado con éxito",
                "post_id" => $conn->lastInsertId()
            ];
        } catch (PDOException $e) {
            return [
                "success" => false,
                "message" => "Error al crear el post: " . $e->getMessage()
            ];
        }
    }
    //obtener un post de un usuario
    public static function get_post($post_id, $conn){
        try{
            $stmt = $conn->prepare("SELECT p.post_id, p.text, p.date_posted, u.name AS author 
                                    FROM posts p 
                                    JOIN users u ON p.user_id = u.user_id 
                                    WHERE p.post_id = ?");
            $stmt->execute([$post_id]);
            $post = $stmt->fetch(PDO::FETCH_ASSOC);

            if($post){
                return[
                    "success" => true,
                    "data" => $post
                ];
            }else {
            return [
                "success" => false,
                "message" => "Post no encontrado"
            ];
        }
        }catch(PDOException $e){
            return [
            "success" => false,
            "message" => "Error al obtener el post: " . $e->getMessage()
        ];
        }
    }
    //obtener todos los post de un usuario
    public static function getUserPost($user_id, $conn){
        try{
            $stmt = $conn->prepare("SELECT p.post_id, p.text, p.date_posted, u.user_id AS Author
                                    FROM posts p
                                    JOIN users u ON p.user_id=u.user_id
                                    WHERE p.user_id = ?
                                    ORDER BY p.date_posted DESC");
            $stmt->execute([$user_id]);
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return [
            "success" => true,
            "data" => $posts
        ];
        }catch(PDOException $e){
            return [
                "success" => false,
                "message" => "Error al obtener los posts del usuario: " . $e->getMessage()
            ];
        }
    }
    //mostrar todos los posts de todos los usuarios
    public static function getAllPost($conn){
        try{
            $stmt = $conn->prepare("SELECT p.post_id, p.text, p.date_posted, u.user_id, u.name AS Author_name
                                    FROM posts p
                                    JOIN users u ON p.user_id = u.user_id
                                    ORDER BY p.date_posted DESC");

            $stmt->execute();
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return [
            "success" => true,
            "data" => $posts
        ];
        }catch(PDOException $e){
            return [
            "success" => false,
            "message" => "Error al obtener los posts: " . $e->getMessage()
            ];
        }
    }
}
?>
