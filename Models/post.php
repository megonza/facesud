<?php 
class Post {
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

    public static function get_post($post_id, $conn){
        try{
            $stmt = $conn->prepare("SELECT p.post_id, p.text, p.date_posted, u.name AS author FROM posts p JOIN users u ON p.user_id = u.user_id WHERE p.post_id = ?");
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
}
?>
